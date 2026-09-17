// ---------------------------------------------------------------------------
// Shop configuration. This is the one file you need to edit to make the
// store your own — brand name, currency, who gets notified about orders,
// and the courier options shown at checkout.
// ---------------------------------------------------------------------------

export const SHOP_NAME = "Amor Workshop";
export const SHOP_TAGLINE = "Scandinavian moss frames, made by hand and made with love.";
export const CURRENCY = "€";

// The mailbox that should be notified whenever a new order comes in.
export const ADMIN_EMAIL = "amor_workshop@gmail.com";

// Whoever logs in with this address can see every order at /admin.
// Change it to your own email once you've registered an account with it.
export const ADMIN_LOGIN_EMAIL = "amor_workshop@gmail.com";

// --- Order email delivery (EmailJS) ---------------------------------------
// This site has no backend server, so it uses EmailJS (emailjs.com) to send
// the admin notification straight from the browser. Leave the three values
// below blank and the shop still works perfectly well: every order is saved
// and visible in Order History and the Admin page, only the live email is
// skipped (a note is printed to the browser console instead).
// See README.md for the two-minute setup.
export const EMAILJS_SERVICE_ID = "";
export const EMAILJS_TEMPLATE_ID = "";
export const EMAILJS_PUBLIC_KEY = "";

// Courier options offered on the order form.
export const TRANSPORT_COMPANIES = ["Econt", "Speedy",];
