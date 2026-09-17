# Akhil & Sabitha Wedding Invitation

Standalone React + Vite source for the Akhil Raj and Sabitha wedding invitation.

## Requirements

- Node.js 18 or newer
- npm 9 or newer
- VS Code (recommended)

## Run in VS Code

1. Extract this folder and open `akhil-sabitha-wedding-invitation` in VS Code.
2. Open the integrated terminal.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the local development server:

   ```bash
   npm run dev
   ```

5. Open the URL printed by Vite, normally:

   ```text
   http://localhost:5173
   ```

## Other commands

```bash
npm run typecheck   # TypeScript validation
npm run build       # Production build in dist/
npm run preview     # Preview the production build locally
```

## Project structure

- `src/App.tsx` — invitation components, content, interactions, RSVP form, countdown, calendar download, maps, and sharing
- `src/index.css` — complete visual design, responsive layout, animations, and local font-face declarations
- `src/main.tsx` — React entry point and error boundary
- `public/reference-assets/` — wedding artwork and decorative assets
- `public/fonts/` — local Cormorant Garamond, Great Vibes, and Jost font files
- `vite.config.ts` — standalone Vite configuration
- `package.json` — npm dependencies and scripts

## Backend, API, database, and environment variables

This website is frontend-only. It does not require a backend server, API routes, integrations, database, or environment variables.

The RSVP form currently validates and confirms responses in the browser. It does not persist or send RSVP data to a server.
