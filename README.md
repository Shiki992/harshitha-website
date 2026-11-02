# harshitha.vedantam.co

Personal site for Harshitha Kalluri, technical consultant (data governance, regulatory reporting, SAP S/4HANA data migration).

Plain static HTML, CSS and JavaScript. No build step.

## Structure

```
index.html            the whole site (one page)
404.html              not-found page
assets/style.css      styles, light and dark themes
assets/main.js        theme toggle, mobile menu, scroll reveal, email link
assets/img/           social preview card and app icon
favicon.svg/.ico/.png icons
CNAME                 custom domain for GitHub Pages
.nojekyll             serve files as-is (no Jekyll processing)
```

## Run locally

Any static server works. From the repo root:

```bash
python -m http.server 8000
```

Then open http://localhost:8000. Paths are root-relative (`/assets/...`), so open it through a server rather than as a file.

## Editing content

All copy lives in `index.html`, grouped by section (`#about`, `#experience`, `#work`, `#toolkit`, `#credentials`, `#contact`). The email address is stored as `data-u` / `data-d` attributes on `.js-email` links and assembled by `main.js`, so it isn't sitting in the HTML as plain text.

If you change the headline or description, update the `og:` / `twitter:` meta tags in `<head>` too. The social card image is `assets/img/og-card.png` (1200×630).

## Deployment

GitHub Pages, deploying from the `main` branch, root folder. Every push to `main` republishes the site.

Custom domain: `harshitha.vedantam.co` (set by the `CNAME` file). DNS for `vedantam.co` is on GoDaddy and needs one record:

| Type  | Name        | Value                |
|-------|-------------|----------------------|
| CNAME | `harshitha` | `shiki992.github.io` |

Once DNS resolves, tick **Enforce HTTPS** under Settings → Pages.
