# FC Risecraft Rwanda Limited — Website

A multi-page marketing website for FC Risecraft, built with **Next.js (App Router)** and
**Tailwind CSS**, including a built-in admin panel for editing site content and a working
contact + enrollment form. Runs fully on Vercel (or any Node host) — no PHP required.

## What's included

- **Public pages:** Home, Services, Products, Trainings & Certificates, About, Contact, Enroll
- **Contact form** and **Enrollment form**, both save submissions via `/api/contact` and `/api/enroll`
- **Admin panel** at `/admin` (password-protected) to:
  - Edit site info, services, products, trainings, and "why choose us" items — no code required
  - View and manage contact messages and enrollment sign-ups
- Design system based on the FC Risecraft brand flyer: deep plum, gold, and cream palette,
  with a measuring-tape / pattern-paper motif tying back to the tailoring business

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the dev server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000

In local dev, content and form submissions are stored as JSON files under `data/`
(no external service needed). See "Storage" below for how this works in production.

## Admin panel

- URL: http://localhost:3000/admin
- Default password: `risecraft2026` (set in `.env.local` as `ADMIN_PASSWORD`)

**Before deploying, change these two values (in `.env.local` locally, and in your
hosting provider's environment variables for production):**
```
ADMIN_PASSWORD=your-new-password
SESSION_SECRET=a-long-random-string
```

## How the content editor works

All editable site text lives in a `content.json` blob. The admin panel at `/admin/content`
reads and writes it through `/api/admin/content`, so changes appear on the live site
immediately without redeploying code (the public site polls `/api/content`).

## Storage: Vercel Blob

Vercel's filesystem is read-only/ephemeral, so `lib/blobStore.js` stores `content.json`,
`submissions.json`, and uploaded product photos in **Vercel Blob** instead of on disk.

- **Locally:** if `BLOB_READ_WRITE_TOKEN` isn't set, it automatically falls back to real
  files under `data/` (content, submissions) and `public/uploads/` (images) — nothing to
  configure for `npm run dev`.
- **On Vercel:** add a Blob store to your project (Storage tab → Create Database → Blob).
  Vercel injects `BLOB_READ_WRITE_TOKEN` automatically for deployments; no manual copying
  needed. If you also want to test against Blob locally, pull the token with
  `vercel env pull .env.local`.

## Email notifications

Contact/enroll submissions are currently **not** emailed anywhere — they save to storage
and show up in the admin panel at `/admin/submissions`. If you want email notifications
later, wire up a provider like [Resend](https://resend.com) inside `app/api/contact/route.js`
and `app/api/enroll/route.js`.

## Project structure

```
app/
  (site)/            Public pages — share the Navbar/Footer layout
    page.js           Home
    services/
    products/
    trainings/
    about/
    contact/
    enroll/
  admin/
    login/            Admin login (no dashboard chrome)
    (dashboard)/       Authenticated admin pages — dashboard, content, submissions
  api/
    content/           Public live-content endpoint
    contact/            Contact form submission endpoint
    enroll/             Enrollment form submission endpoint
    admin/              Admin login/logout/content/submissions/upload endpoints
components/            Shared UI components (components/admin/ for the admin panel)
lib/                   Content/submissions/auth/storage helpers
data/                  Seed content + local-dev JSON fallback storage
middleware.js           Protects /admin/** and /api/admin/** routes
cpanel-legacy/          Old PHP backend, kept only as a fallback for cPanel hosting
```

## Before going to production

- Change `ADMIN_PASSWORD` and `SESSION_SECRET` in your hosting provider's env vars
- Add a Vercel Blob store to the project (see Storage above)
- Run `npm audit fix` and review any flagged dependency updates
- Consider wiring up real email delivery for form submissions (see Email notifications above)
- Add your real logo image in place of the text-based "FC RISECRAFT" mark in `Navbar.jsx`
  and `Footer.jsx` if you have a vector/PNG version
