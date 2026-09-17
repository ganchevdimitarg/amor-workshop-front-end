# Amor Workshop

A small React storefront for selling handmade paintings: browse a gallery,
add pieces to a cart or order one instantly, create an account to keep an
order history, and notify the shop owner by email whenever an order comes in.

## What's included

- **Gallery** of paintings with a details page for each piece
- **Cart** and full **checkout**
- **Quick order** — buy a single piece with no account, just shipping details
- **Login / register**, with **order history** for logged-in customers
- **Admin page** (`/admin`) listing every order, for the store owner's account
- Order form requires: first name, last name, phone number, address, and
  transport company — exactly as specified
- **Email notification** to the shop owner on every order (via EmailJS)
- **English / Bulgarian** language switcher (EN / BG buttons in the nav bar),
  including the product catalog and every page of copy

## Running it

```bash
npm install
npm run dev
```

Then open the printed local URL. To build for deployment:

```bash
npm run build
```

This produces a static `dist/` folder you can host anywhere (Netlify,
Vercel, GitHub Pages, your own server, etc.) — there's no backend to deploy.

## Make it yours: `src/config.js`

One file controls the shop's identity:

```js
export const SHOP_NAME = "Amor Workshop";
export const CURRENCY = "$";
export const ADMIN_EMAIL = "admin@yourshop.com";      // who gets order emails
export const ADMIN_LOGIN_EMAIL = "admin@yourshop.com"; // who can see /admin
export const TRANSPORT_COMPANIES = ["Econt", "Speedy"];
```

Register an account using the address in `ADMIN_LOGIN_EMAIL` and that
account will see the "Admin" link in the nav bar.

## Setting up real order emails (EmailJS)

This is a frontend-only site — there's no server to send email from — so it
uses [EmailJS](https://www.emailjs.com), which lets a website send email
directly from the browser through your own mailbox. The free plan is enough
for a small shop. Setup takes about two minutes:

1. Create a free account at emailjs.com.
2. Add an **Email Service** (e.g. connect your Gmail/Outlook) — this gives
   you a **Service ID**.
3. Create an **Email Template** with a subject and body using these
   variables (EmailJS inserts them automatically):
   `{{order_id}}`, `{{order_date}}`, `{{customer_name}}`, `{{customer_phone}}`,
   `{{customer_email}}`, `{{customer_address}}`, `{{transport_company}}`,
   `{{items_summary}}`, `{{order_total}}`. Set the template's "To email" to
   `{{to_email}}`. This gives you a **Template ID**.
4. Copy your **Public Key** from Account → General.
5. Paste all three into `src/config.js`:

   ```js
   export const EMAILJS_SERVICE_ID = "service_xxxxxxx";
   export const EMAILJS_TEMPLATE_ID = "template_xxxxxxx";
   export const EMAILJS_PUBLIC_KEY = "xxxxxxxxxxxxxxxx";
   ```

Until you do this, the shop still works fully — orders are saved and show
up in Order History and Admin — the app just logs a note to the browser
console instead of sending a real email, so nothing breaks while you finish
setup.

## Language (English / Bulgarian)

The EN / BG buttons in the nav bar switch the whole site — nav, buttons,
form labels, validation messages, and the product catalog itself. A new
visitor sees Bulgarian automatically if their browser is set to `bg-*`;
otherwise they see English. Whichever they pick is remembered for next time.

- All UI copy lives in `src/i18n/translations.js`, as two parallel objects
  (`en` and `bg`) with the same keys. Edit the text there — no component
  files need to change.
- Each product in `src/data/products.js` has `title`, `medium`, `size` and
  `description` as `{ en, bg }` pairs, and a `category` that's a key
  (`"landscape"`, `"abstract"`, etc.) looked up in the `categories` part of
  `translations.js` rather than hardcoded text.
- To add a third language: add a new top-level key (e.g. `de`) to
  `translations.js` with the same shape as `en`/`bg`, add `{ code: "de",
  label: "DE" }` to the `LANGUAGES` list in that file, and add a `de` entry
  to each product. Every component already reads through `t()`, so nothing
  else needs to change.
- Currency is independent of language — it's still whatever `CURRENCY` is
  set to in `src/config.js` regardless of which language is selected.
- An order's line-item titles are saved in whichever language was active at
  the moment of purchase (like a real receipt would be); the rest of the
  order record (Order History, Admin) is translated live.

## Using your own photos instead of the placeholder art

Each entry in `src/data/products.js` has a `palette` (two hex colors) used
to generate a painterly placeholder. To use a real photo instead:

1. Add the image file under `src/assets/` (e.g. `src/assets/meadow.jpg`).
2. In `src/components/CanvasArt.jsx`, add an `image` prop and render
   `<img src={image} alt={title} />` when it's provided, falling back to the
   current gradient otherwise.
3. Import the image in `products.js` and add `image: meadowImg` to that
   product's entry.

## Good to know before going live

- **Accounts and orders live in the browser's `localStorage`**, not a real
  database. That's enough to demo and run a small shop end-to-end, but it's
  per-browser (an order placed on a phone won't appear on a laptop) and
  clearing browser data clears the shop. For a production store, replace the
  functions in `src/utils/storage.js` with calls to a real backend/database
  — every page already goes through that one file.
- **Passwords are stored in plain text** in that same local storage, which is
  fine for a local demo but not for a real production login system. A real
  deployment should use a proper backend with hashed passwords (or an
  auth provider like Auth0/Clerk/Supabase Auth).
- The 9 sample paintings, prices, and courier list are placeholders —
  edit `src/data/products.js` and `src/config.js` freely.

## Project structure

```
src/
  config.js               shop name, currency, admin email, couriers
  data/products.js        catalog
  context/AuthContext.jsx accounts, login/register/logout
  context/CartContext.jsx cart state
  context/LanguageContext.jsx current language + t() translator
  i18n/translations.js    all EN/BG copy
  utils/storage.js        localStorage persistence
  utils/email.js          EmailJS order notification
  components/             Navbar, Footer, ProductCard, OrderForm, etc.
  pages/                  Home, ProductDetail, Cart, Checkout, QuickOrder,
                           Login, Register, OrderHistory, Admin
```
