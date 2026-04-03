# Seclob Frontend

React + Vite frontend for browsing products, managing wishlists, and handling authentication flows.

## Stack

- React 19
- Vite
- TypeScript
- Zustand
- Tailwind CSS 4
- React Router DOM 7
- Axios
- React Hot Toast

## Features

- Product listing with pagination, category filters, subcategory filters, and search
- Debounced search suggestions in the navbar
- Product detail page with gallery and edit flow
- Login and signup flows
- Wishlist drawer for authenticated users
- Shared Axios client with cookie-based auth support

## Installation

```bash
npm install
```

## Environment Variables

Create `client/product-frontend/.env` with:

```env
VITE_API_URL=http://localhost:5000/api
```

For production on Vercel, set `VITE_API_URL` to your deployed backend API base URL, for example:

```env
VITE_API_URL=https://your-backend-service.onrender.com/api
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Run Locally

```bash
npm run dev
```

## Vercel Deployment

This app is ready for Vercel deployment.

### Recommended Vercel settings

- Framework Preset: `Vite`
- Root Directory: `client/product-frontend`
- Build Command: `npm run build`
- Output Directory: `dist`

### Required Vercel environment variable

- `VITE_API_URL=https://your-backend-service.onrender.com/api`

### Routing support

A [vercel.json](/d:/bridgeon/MachineTasks/Seclob/client/product-frontend/vercel.json) file is included so client-side routes like `/login` and `/product/:id` rewrite to `index.html` correctly.

## Project Structure

```text
src/
|-- api/
|-- assets/
|-- components/
|-- features/
|   |-- auth/
|   |-- Home/
|   `-- Product/
|-- store/
|-- App.tsx
`-- main.tsx
```

## Notes

- The frontend expects cookie-based auth from the backend
- `withCredentials: true` is enabled in the shared Axios instance
- Make sure backend CORS allows the deployed Vercel frontend URL
