# Chillie Website

A full-stack React and Node.js web application for Chillie Haven, a Nairobi-based fresh chilli and spice marketplace. The project includes a React frontend, an Express backend, and JSON-based data storage for product inventory and blog content.

---

## Project Summary

This app is built as a single-page React user interface with a separate Express backend API. It allows visitors to:

- browse chilli and spice products
- search and filter inventory
- add products to a cart
- place orders via WhatsApp with a prefilled order message
- view blog updates and read individual blog posts
- contact the business through a contact form and direct WhatsApp link

The frontend and backend are kept loosely coupled using a clear API boundary.

---

## Architecture

### Frontend

The frontend lives in `frontend/` and is built with:

- `React` for UI
- `react-router-dom` for client-side routing
- `Vite` for development and production builds
- `react-icons` for UI icons

Key structural files:

- `frontend/src/App.jsx` — top-level router and global cart state
- `frontend/src/components/jsx/Products.jsx` — inventory fetch and product UI
- `frontend/src/components/jsx/BlogSection.jsx` — blog list fetch and search UI
- `frontend/src/components/jsx/Cart.jsx` — cart drawer, quantity controls, WhatsApp checkout
- `frontend/src/components/jsx/Reach.jsx` — contact form with prefilled WhatsApp message
- `frontend/src/utils/CartUtil.js` — cart operations and WhatsApp URL builder

### Backend

The backend lives in `backend/` and is built with:

- `Express` for API routing
- `cors` for allowing frontend requests during development and production
- `dotenv` for environment configuration

Key backend files:

- `backend/server.js` — Express app initialization, middleware, and route mounting
- `backend/routes/Products.js` — inventory and config endpoints
- `backend/routes/BlogRoute.js` — blog data endpoint
- `backend/data/inventory.json` — static product data
- `backend/data/blogs.json` — static blog content

---

## Data Flow

### How frontend fetches data

The application uses `fetch()` from React components to retrieve backend data.

#### Inventory

- `frontend/src/components/jsx/Products.jsx` calls `${API_BASE}/vendor/inventory`
- `API_BASE` is defined from `import.meta.env.VITE_API_BASE_URL`
- The backend route `backend/routes/Products.js` reads `backend/data/inventory.json`
- The response returned is `{ data: [...] }`
- The frontend stores it in local state and renders product cards

#### Blogs

- `frontend/src/components/jsx/BlogSection.jsx` calls `${API_BASE}/blogs`
- `frontend/src/pages/BlogPage.jsx` also fetches the same endpoint to locate a blog by slug
- The backend route `backend/routes/BlogRoute.js` reads `backend/data/blogs.json`
- The response returned is the raw blog array

#### Business config

- `frontend/src/components/jsx/Cart.jsx` calls `${API_BASE}/config`
- The backend route `backend/routes/Products.js` returns:
  - `whatsappNumber`
  - `phoneNumber`
- These values are kept in backend environment variables, then delivered to the frontend through the API

### Local cart state

- `frontend/src/App.jsx` maintains cart state via `useState([])`
- That state is passed down to product pages and the cart drawer
- Cart operations are handled immutably in `frontend/src/utils/CartUtil.js`

### Cart-to-WhatsApp checkout

- The cart drawer collects items, quantities, and prices
- When a user clicks checkout, `buildWhatsAppURL(cart, phone)` constructs a WhatsApp link
- The link includes:
  - order summary lines
  - item quantities
  - prices and totals
  - delivery area and instructions
- `window.open(url, '_blank', 'noopener,noreferrer')` opens WhatsApp safely in a new tab

---

## Prefilled Messages

Prefilling happens in two places:

### 1. Cart checkout

The cart checkout flow uses `frontend/src/utils/CartUtil.js`:

- `buildWhatsAppURL(cart, phone)` builds a human-readable message
- It encodes the message with `encodeURIComponent()` to keep line breaks and special characters safe
- The message includes:
  - current timestamp
  - line-item list
  - total price
  - delivery area details
  - request to confirm availability, delivery time, and payment

This makes the buyer experience smooth and reduces manual typing.

### 2. Contact/order form

The `frontend/src/components/jsx/Reach.jsx` component builds a different prefilled WhatsApp message from user input:

- name
- phone
- email
- requested chillies or delivery details

The message template is embedded in the form submission handler and opened on WhatsApp using the configured number.

---

## Security

### What is protected

- The WhatsApp and phone numbers used for checkout are not hard-coded directly inside cart logic.
- Instead, the cart fetches `whatsappNumber` and `phoneNumber` from the backend API at `${API_BASE}/config`.
- This keeps contact configuration centralized and easier to update without changing UI code.

### How the backend is structured securely

- The backend uses `dotenv` to load environment variables, preventing secrets from being stored in code.
- `backend/server.js` uses `cors()` so the frontend can request API data from a different port or host.
- Static images are served from `/images` using `express.static()`.
- All unknown routes return a `404` JSON message, preventing undefined behavior.

### Safe URL handling

- WhatsApp links are built with `encodeURIComponent()` to avoid broken URLs and injection-like issues in query strings.
- External links in the UI use `rel="noopener noreferrer"` when opening in a new tab.

### Input handling in UI

- The contact form uses controlled components to track user input safely.
- Required fields ensure that WhatsApp link generation only happens when data exists.

### Notes

- The backend currently reads JSON files instead of using a database. This avoids database injection risk but also means the API is not a full production persistence layer.
- Some security-related packages are listed in `backend/package.json` as dependencies, but the current routes are intentionally minimal and focused on serving static JSON data.

---

## Performance and Fastness

### Frontend performance

- `Vite` is configured for fast builds and a lightweight dev server
- The production build uses `terser` minification and removes console logs
- Vendor libraries are chunked separately so cached bundles can stay long-lived
- Image tags use `loading="lazy"` and `decoding="async"` to defer off-screen image loading
- `React.memo` is used for repeated UI parts like product cards and cart items
- `useMemo` caches filtered blog results
- `AbortController` cancels inventory fetch requests when the `Products` component unmounts
- The search bar resets visible pagination to keep list updates responsive

### Backend performance

- The backend is simple and file-based with no database overhead for this version
- Reads from JSON files and returns JSON quickly
- Static image hosting is handled directly by Express from a local folder
- The API does not perform expensive operations or business logic on each request

### UX performance

- Cart updates are local and instant because they occur in React state
- Search and load-more behavior is performed in-memory after initial fetch
- Blog and inventory pages only request data once on mount

---

## Environment Configuration

### Frontend

The frontend reads these variables from `.env.production` or `.env`:

- `VITE_API_BASE_URL` — backend API base URL
- `VITE_IMAGE_BASE_URL` — base URL for image loading
- `VITE_WHATSAPP_NUMBER` — default WhatsApp number for the contact page fallback
- `VITE_MAP_EMBED_URL` — Google Maps embed URL for the contact page

Example from `frontend/.env.example`:

```env
VITE_WHATSAPP_NUMBER=your_whatsapp_number_here
VITE_MAP_EMBED_URL=https://maps.google.com/maps?q=Wakulima+Market+Nairobi&output=embed
VITE_API_BASE_URL=http://localhost:5000/api
VITE_IMAGE_BASE_URL=http://localhost:5000
```

### Backend

The backend expects environment variables for config values like:

- `WHATSAPP_NUMBER`
- `PHONE_NUMBER`

These are used by `backend/routes/Products.js` to respond to `/api/config`.

---

## How to Run

### Install dependencies

From the project root:

```bash
npm install
npm install --prefix frontend
npm install --prefix backend
```

### Run both frontend and backend together

```bash
npm start
```

This uses `concurrently` from the root `package.json` to start:

- frontend on Vite dev server
- backend on Express server

### Run backend only

```bash
npm run dev --prefix backend
```

### Run frontend only

```bash
npm run dev --prefix frontend
```

---

## Deployment Notes

- The frontend build is prepared in `frontend/dist`
- `vite.config.js` sets `base: '/ChillieHaven/'` for production deploys on GitHub Pages
- The backend is ready to run on a port from `process.env.PORT || 5000`
- `frontend/.env.production` points the frontend to a deployed backend on Render

---

## What to Change for Production

- Add a real persistent database instead of file-based JSON if inventory and blogs must be updated dynamically
- Add authentication or admin protection for management operations
- Configure HTTPS and a proper host header if serving the backend directly
- Enable rate limiting and request validation in the backend
- Move contact configuration into secure production environment settings

---

## Key Files to Review

- `backend/server.js`
- `backend/routes/Products.js`
- `backend/routes/BlogRoute.js`
- `frontend/src/App.jsx`
- `frontend/src/components/jsx/Products.jsx`
- `frontend/src/components/jsx/Cart.jsx`
- `frontend/src/components/jsx/Reach.jsx`
- `frontend/src/utils/CartUtil.js`
- `frontend/vite.config.js`

---

## Summary

This repository is a lightweight, maintainable full-stack app for a Nairobi chilli business. It is built around:

- a React/Vite frontend that fetches API data and keeps cart state locally
- an Express backend that serves JSON data and contact config
- WhatsApp-based checkout with prefilled order and contact messages
- performance enhancements through lazy images, memoization, and Vite build optimizations
- an environment-driven configuration model for frontend and backend settings

If you want, I can also add a short architecture diagram or a developer quickstart section for this repo.