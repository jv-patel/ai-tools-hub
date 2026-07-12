# AI Tools Hub

A static, vanilla HTML/CSS/JS directory of 50 AI tools across 15 categories — searchable, filterable, favoritable, and themeable (dark/light), with no framework and no build step.

## Running locally

No build tools required. From this folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/index.html`.

You can also just double-click `index.html`, though a local server is recommended so `fetch`/relative paths behave the same as a real deployment.

## Deploying

Drag-and-drop this folder onto **Netlify** or **Vercel**, or push it to a repo and enable **GitHub Pages** on the `main` branch — no build command needed, it's already static output.

## Structure

```
AI-Tools-Hub/
├── index.html          Home
├── explore.html         Explore / search / filter all tools
├── categories.html      All 15 categories
├── tool-details.html    Single tool detail (reads ?id=)
├── top-rated.html       Tools rated 4.3+
├── new-tools.html        Sorted by date added
├── favorites.html       Locally saved favorites
├── about.html
├── contact.html          Validated contact form
├── faq.html              15-question accordion
├── privacy.html
├── terms.html
├── 404.html
├── css/
│   ├── variables.css    Design tokens (color, type, spacing)
│   ├── style.css        Base + component styles
│   ├── navbar.css
│   ├── footer.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── data.js           Tool + category dataset
│   ├── storage.js        localStorage wrapper
│   ├── theme.js          Dark/light mode
│   ├── favorites.js      Favorite add/remove/persist
│   ├── filter.js         Card rendering, filter/sort/paginate
│   ├── search.js         Hero search + placeholder typing effect
│   ├── animation.js      Scroll reveal, counters, tilt, ripple, drawer, lazy load
│   ├── app.js            Page bootstrapping / per-page rendering
│   └── toast.js          Toast notifications
├── images/ icons/ assets/  (empty — logos are rendered as initials, no binary assets needed)
```

## Notes

- Favorites and theme preference are stored in `localStorage`, so they're per-browser and reset if browser data is cleared.
- Tool "logos" are rendered as colored initials rather than image files, so the site works with zero external image assets.
- All 50 tools are real, publicly known AI products with original one-sentence descriptions written for this directory.
