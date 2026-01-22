# ConfiguraPro Admin

ConfiguraPro Admin is the backend-facing React application used to create and manage
products for the ConfiguraPro client configurator.

All configuration data (materials, capacities, dimensions, pricing, images)
is created here and stored in Firebase Realtime Database.
The client application only reads this data.

---

## Tech Stack

- React (Vite)
- Redux Toolkit
- Firebase Authentication
- Firebase Realtime Database
- React Router
- Bootstrap

---

## Project Structure

src/
├─ assets/
├─ components/
│  ├─ AdminNavbar.jsx
│  ├─ AuthModal.jsx
│  ├─ ProductForm.jsx
│  └─ ProductList.jsx
├─ features/
│  └─ auth/
│     └─ authSlice.js
├─ pages/
│  ├─ Dashboard.jsx
│  ├─ Orders.jsx
│  └─ Products.jsx
├─ routes/
│  └─ AppRoute.jsx
├─ services/
│  ├─ firebaseAuth.js
│  ├─ orderServices.js
│  └─ productService.js
├─ store/
│  └─ store.js
├─ App.jsx
└─ main.jsx

---

## Product Data Structure (CRITICAL)

Every product saved from admin must follow this exact structure.
The client configurator depends on it.

```json
{
  "name": "1ton",
  "price": 6000,
  "image": "image-url-or-base64",
  "materials": [
    {
      "name": "rubber",
      "price": 2000
    },
    {
      "name": "steel",
      "price": 5000
    }
  ],
  "capacities": [
    {
      "name": "1ton",
      "price": 6000,
      "dimensions": [
        "5x6x7",
        "7x8x9"
      ]
    }
  ]
}
