// ---------------------------------------------------------------------------
// This shop has no backend database, so accounts, orders and the cart are
// kept in the browser's localStorage. That's enough for a small storefront
// to run end to end (including real order history per account), but it is
// per-browser: an order placed on a phone won't show up on a laptop, and
// clearing browser data clears the shop. Swap these functions for real API
// calls whenever you add a backend — every other file only talks to this one.
// ---------------------------------------------------------------------------

const KEYS = {
  users: "amorworkshop_users",
  session: "amorworkshop_session",
  orders: "amorworkshop_orders",
  cart: "amorworkshop_cart",
  products: "amorworkshop_products",
};

function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can fail in private browsing or when full — the shop keeps
    // working in-memory for the rest of the session either way.
  }
}

// --- Users -----------------------------------------------------------------

export function getUsers() {
  return read(KEYS.users, []);
}

export function saveUsers(users) {
  write(KEYS.users, users);
}

// --- Session -----------------------------------------------------------------

export function getSessionUserId() {
  return read(KEYS.session, null);
}

export function setSessionUserId(id) {
  write(KEYS.session, id);
}

export function clearSession() {
  window.localStorage.removeItem(KEYS.session);
}

// --- Orders ------------------------------------------------------------------

export function getOrders() {
  return read(KEYS.orders, []);
}

export function saveOrder(order) {
  const orders = getOrders();
  orders.unshift(order);
  write(KEYS.orders, orders);
  return order;
}

export function getOrdersForUser(userId) {
  return getOrders().filter((order) => order.userId === userId);
}

export function getOrderById(orderId) {
  return getOrders().find((order) => order.id === orderId) || null;
}

// --- Cart ----------------------------------------------------------------

export function getCart() {
  return read(KEYS.cart, []);
}

export function saveCart(cart) {
  write(KEYS.cart, cart);
}

// --- Products ---------------------------------------------------------------

export function getSavedProducts() {
  return read(KEYS.products, null);
}

export function saveProducts(products) {
  write(KEYS.products, products);
}

export function clearSavedProducts() {
  window.localStorage.removeItem(KEYS.products);
}

export function makeId(prefix) {
  const random = Math.random().toString(36).slice(2, 8);
  return `${prefix}_${Date.now().toString(36)}${random}`;
}