# Supabase Reconnect Guide

The site now has two data modes:

- Local mode: used when `VITE_SUPABASE_URL` or `VITE_SUPABASE_ANON_KEY` is missing. Content is stored in the browser with `localStorage`.
- Supabase mode: used automatically when both Supabase env vars are present.

## 1. Create or recover a Supabase project

Open Supabase, create a project, or regain access to the old one.

From the project dashboard, copy:

- Project URL
- anon public key

## 2. Create the database schema

In Supabase SQL Editor, run:

```sql
-- paste the contents of supabase/schema.sql
```

The schema allows public reads, but writes require a signed-in Supabase Auth user.

## 3. Create an admin user

In Supabase:

1. Go to Authentication.
2. Open Users.
3. Click Add user.
4. Create the admin email and password.
5. Confirm the user if Supabase asks for confirmation.

The website admin login will ask for email and password as soon as Supabase env vars are configured.

## 4. Add environment variables

Create `.env.local` in the project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

For local-only work without Supabase, leave those blank and optionally set:

```env
VITE_LOCAL_ADMIN_PASSWORD=your-local-password
```

## 5. Run locally

```bash
npm install
npm run dev
```

Restart the dev server after changing env vars.

## 6. Deploy

For GitHub Pages, add these repository secrets before running the Pages workflow:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

The workflow passes those secrets into `npm run build`, so Vite can bake them into the static files.

For Netlify or Vercel, add the same two Supabase env vars in the hosting dashboard, then redeploy.

The `public/_redirects` file is included for Netlify so direct React Router URLs keep working.
