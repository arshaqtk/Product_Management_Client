# Seclob Product Management Frontend

A modern, high-performance product management dashboard built with React, Vite, and TypeScript. Featuring a premium design, global state management, and real-time updates.

## ✨ Features

- **Dynamic Product Browsing**: 
    - Paginated product grid with custom row controls.
    - Advanced filtering by category and multiple subcategories.
    - Global search with debounced typing and smart suggestions.
- **Wishlist Experience**: 
    - Real-time wishlist toggling from product cards or detail pages.
    - **Slide-out Wishlist Drawer** (using React Portals) for a seamless management experience.
    - Visual counters in the navigation bar.
- **Product Management**: 
    - Detailed product views with local variant selection (RAM/Price/Stock).
    - Unified **Add/Edit Product Modal** with multi-image support and validation.
- **User Authentication**: 
    - Clean, modern Signup and Login flows.
    - Protected actions (Wishlist, Add/Edit) for authenticated users.
- **Premium UI/UX**: 
    - Responsive layout with a sticky category sidebar.
    - Rich micro-animations and toast notifications (React Hot Toast).
    - Sleek dark blue and amber color palette.

## 🚀 Technologies

- **Frontend Core**: React 19 + Vite
- **Language**: TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS 4.0
- **Icons**: Lucide React
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

## 🛠️ Getting Started

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables (create a `.env` file):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the App

- **Development**:
  ```bash
  npm run dev
  ```
- **Production Build**:
  ```bash
  npm run build
  npm run preview
  ```

## 🏗️ Project Architecture

```text
src/
├── api/            # Axios instance and base interceptors
├── components/     # Shared layout components (Navbar, WishlistDrawer, etc.)
├── features/       # Feature-based modular structure
│   ├── auth/       # Authentication logic (Signup, Login, Store)
│   ├── Home/       # Main dashboard, Sidebar, ProductCard
│   └── Product/    # Product details, Gallery, Add/Edit service
├── store/          # Global Zustand stores (Search, Category, Wishlist)
└── App.tsx         # Main application entry and routing
```

## 🎨 Design System

The application follows a curated, professional color palette:
- **Primary**: `#033f63` (Deep Ocean Blue)
- **Accent**: `#eda52d` (Vibrant Amber)
- **Background**: Modern white/gray-50 mix for depth.
- **Typography**: Clean sans-serif hierarchy for maximum readability.
