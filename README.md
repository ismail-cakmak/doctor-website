# Doctor Website - React + Vite

A modern, responsive doctor website built with React and Vite.

## Tech Stack

- **React 18.3** - UI library
- **Vite 6** - Build tool and dev server
- **Tailwind CSS 3** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Supabase** - Optional production database and admin authentication

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will open at `http://localhost:3000`

Without Supabase env vars, the public site can use local fallback content, but admin login is disabled.

### Reconnect Supabase

See [docs/SUPABASE_RECONNECT.md](docs/SUPABASE_RECONNECT.md).

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
doctor-website/
├── src/
│   ├── components/     # React components
│   ├── lib/           # Utility functions
│   ├── pages/         # Public and admin pages
│   ├── utils/         # Auth and data adapters
│   ├── App.jsx        # Main app component
│   ├── main.jsx       # Entry point
│   └── index.css      # Global styles
├── supabase/          # Database schema for reconnecting Supabase
├── docs/              # Operational guides
├── public/            # Static assets
├── index.html         # HTML template
└── vite.config.js     # Vite configuration
```

## Features

- Responsive design
- Modern UI with Tailwind CSS
- Fast development with Vite HMR
- Optimized production builds
