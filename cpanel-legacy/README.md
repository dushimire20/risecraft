# cPanel/PHP fallback (unused on Vercel)

This folder holds the original PHP backend (admin panel, contact/enroll form
handlers, live-content endpoint) that the site used when hosted on cPanel
with `next build` static export (`output: "export"`).

The live app now runs entirely on Next.js API routes + middleware (see
`app/api/`, `app/admin/`, `middleware.js`, `lib/`), backed by Vercel Blob
instead of files on disk. These PHP files are kept only in case you go back
to cPanel hosting later.

**To use this again on cPanel:**
1. Re-add `output: "export"` (and `trailingSlash: true`) to `next.config.mjs`.
2. Run `node cpanel-legacy/copy-content-seed.js` before `next build` to
   refresh `content.seed.json`, then copy this folder's contents back into
   `public/` (`admin/`, `inc/`, `contact.php`, `enroll.php`,
   `get-content.php`, `content.seed.json`).
3. Change `ADMIN_PASSWORD` in `cpanel-legacy/inc/config.php` — it's currently
   the placeholder default and is plaintext-readable if this folder is ever
   served publicly. Do not upload this folder into `public/` on a
   PHP-executing host without changing it first.
