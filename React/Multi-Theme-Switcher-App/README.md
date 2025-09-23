# Multi-Theme Switcher App

## Overview

The Multi-Theme Switcher App is a modern React-based single-page web application built with TypeScript, Vite, Tailwind CSS, and React Router. It features a dynamic theme switcher with three distinct themes, each altering colors, fonts, spacing, and layout. The app fetches product data from the [FakeStoreAPI](https://fakestoreapi.com/), persists theme selection using localStorage, and ensures responsive design across devices. The app includes navigation across Home, About, and Contact pages, with subtle animations for theme transitions and type-safe code.

## Features

- **Header**: Fixed top header with app name ("Theme App") and a dropdown to switch between three themes (Theme 1 as default).
- **Themes**:
  - **Theme 1 (Minimalist)**: Light background, Roboto font, simple grid layout.
  - **Theme 2 (Dark)**: Dark background with sidebar layout, Merriweather font.
  - **Theme 3 (Colorful)**: Gradient background, Pacifico font, card-based grid with hover effects.
- **Content**: Includes a title, dummy paragraph, button, and product cards fetched from FakeStoreAPI.
- **Functionality**:
  - Theme persistence using localStorage.
  - Theme management via React Context API.
  - Navigation across Home, About, and Contact pages using React Router.
  - Responsive design with Tailwind CSS.
  - Subtle animations during theme transitions using CSS transitions.
  - Type-safe code with TypeScript.
  - Secure with no inline scripts and trusted dependencies.
- **Compatibility**: Works across all devices (desktop and mobile).

## Prerequisites

- **Node.js**: Version 16 or higher (recommended: latest LTS version).
- **npm**: Version 7 or higher (comes with Node.js).
- A modern web browser (e.g., Chrome, Firefox, Safari).
- Internet connection (for fetching Google Fonts and FakeStoreAPI data).

## Installation

1. **Clone or Create the Project**:
   ```bash
   npm create vite@latest multi-theme-switcher -- --template react-ts
   cd multi-theme-switcher
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   npm install react-router-dom tailwindcss postcss autoprefixer
   ```

## Usage

1. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` (or the port shown in the terminal) in your browser.

2. **Interact with the App**:
   - Use the dropdown in the header to switch between Theme 1 (Minimalist), Theme 2 (Dark), and Theme 3 (Colorful).
   - Navigate between Home, About, and Contact pages using the navigation links.
   - View product cards on the Home page, fetched from the FakeStoreAPI.
   - Theme changes persist across page reloads via localStorage.

3. **Build for Production**:
   ```bash
   npm run build
   ```
   The output will be in the `dist` folder, ready for deployment to a static hosting service (e.g., Netlify, Vercel).

## Project Structure

- `src/main.tsx`: Entry point that renders the app.
- `src/context/ThemeContext.tsx`: Manages theme state and persistence using Context API.
- `src/components/`:
  - `Header.tsx`: Fixed navigation bar with app name and theme switcher.
  - `ThemeSwitcher.tsx`: Dropdown for selecting themes.
  - `ProductCard.tsx`: Displays product data with theme-specific styling.
- `src/pages/`:
  - `Home.tsx`: Displays product cards and sample content.
  - `About.tsx`: About page with sample content.
  - `Contact.tsx`: Contact page with sample content.
- `src/index.css`: Global styles with Tailwind CSS and custom theme transitions.

## Technologies Used

- **React 18**: For building the UI.
- **React Router 6**: For client-side routing.
- **TypeScript**: For type safety.
- **Vite**: For fast development and production builds.
- **Tailwind CSS**: For responsive, theme-specific styling.
- **FakeStoreAPI**: For fetching sample product data.
- **Google Fonts**: Roboto, Merriweather, and Pacifico for theme-specific typography.