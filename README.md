
# FACTO Frontend

A modern, production-ready template for building full-stack React applications using React Router, Redux Toolkit, Axios, and TailwindCSS.

## Features

- ⚡️ React 19 with React Router v7
- 🔄 Modular HTTP service layer (Axios with separated interceptors and methods)
- 🔥 Hot Module Replacement (HMR) via Vite
- �️ TypeScript by default
- 🎨 TailwindCSS for styling
- 🗂️ Redux Toolkit for state management
- 🧩 Component-based architecture (atoms, layout, hooks, pages)
- 📦 Asset bundling and optimization
- � Form validation with Zod and React Hook Form
- � Font loading via `<link>` in `root.tsx` (no duplicate @import in CSS)
- � Docker-ready

## Getting Started


### Installation

With npm:
```bash
npm install
```
With Bun:
```bash
bun install
```

### Development

With npm:
```bash
npm run dev
```
With Bun:
```bash
bun run dev
```

Visit [http://localhost:5173](http://localhost:5173).

## Building for Production

With npm:
```bash
npm run build
```
With Bun:
```bash
bun run build
```

## Deployment

### Docker

```bash
docker build -t facto-frontend .
docker run -p 3000:3000 facto-frontend
```

### Manual

Deploy the output of `npm run build` from the `build/` directory.

## Project Structure

```
app/
	components/      # UI components (atoms, layout)
	hooks/           # Custom hooks and providers
	lib/             # Utilities
	pages/           # Route-based pages
	redux/           # Redux Toolkit store and slices
	routes/          # Route configs
	services/        # Modular HTTP service (interceptors, methods)
	styles/          # Tailwind and theme CSS
	types/           # TypeScript types
	utils/           # Error handling, helpers
public/
	.well-known/     # Static files for special routes (e.g., Chrome DevTools)
	...
```

## Styling

- TailwindCSS is pre-configured.
- Custom theme variables in `app/styles/theme.css`.
- Fonts loaded via `<link>` in `root.tsx` (no CSS @import).

## HTTP Service Layer

- Axios instance with separated request/response interceptors (`app/services/interceptors`)
- HTTP methods modularized (`app/services/methods`)
- Centralized error handling

## State Management

- Redux Toolkit for global state
- React Hook Form for forms

## Notes

- Chrome DevTools special requests are handled by static files in `public/.well-known`.
- No duplicate font imports; all fonts are loaded in the HTML head.

---

Built with ❤️ using React, Redux, and Vite.

