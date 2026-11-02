# harshitha.vedantam.co

Personal site for Harshitha Kalluri, data governance consultant (data quality, lineage, regulatory reporting, SAP S/4HANA data migration).

Plain static HTML, CSS and JavaScript. No build step.

## Structure

```
index.html            the whole site (one page)
404.html              not-found page
assets/style.css      styles (navy and white)
assets/main.js        mobile menu, scroll reveal, active nav, email link
assets/img/           social preview card and app icon
favicon.svg/.ico/.png icons
```

## Run locally

Any static server works. From the repo root:

```bash
python -m http.server 8000
```

Then open http://localhost:8000. Paths are root-relative (`/assets/...`), so open it through a server rather than as a file.

## Editing content

All copy lives in `index.html`, grouped by section (`#services`, `#experience`, `#casework`, `#toolkit`, `#credentials`, `#contact`). The email address is stored as `data-u` / `data-d` attributes on `.js-email` links and assembled by `main.js`, so it isn't sitting in the HTML as plain text.

If you change the headline or description, update the `og:` / `twitter:` meta tags in `<head>` too. The social card image is `assets/img/og-card.png` (1200×630).

## Deployment

Hosted on Vercel (project imported from this repo, framework preset "Other", no build command). Every push to `main` deploys to production.

Custom domain `harshitha.vedantam.co` is added in the Vercel project's Domains settings. DNS for `vedantam.co` is on GoDaddy, with a CNAME record for `harshitha` pointing at the target Vercel shows for the domain.
