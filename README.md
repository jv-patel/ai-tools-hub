This project is without permission by author cannot right, if you have use to project without author permission then author is take a action for you and your project 

# AI Tools Hub

A curated directory of 50 AI tools across 15 categories ” searchable, filterable, and saveable to favorites ” built with plain HTML, CSS, and JavaScript.  frameworks, build step, dependencies.

Live site: [jv-patel.github.io/ai-tools-hub](https://jv-patel.github.io/ai-tools-hub/)

---

Features

Instant search across tool names, categories, and tags, with lightweight word-stemming so related terms (e.g. "generator" / "generation") still match
**Filter & sort* by category, pricing tier (Free / Freemium / Paid), rating, and recency
**Favorites* saved locally in the browser via `localStorage`  no account required
 "*Dark / light theme* toggle with saved preference
**Animated UI*  scroll-reveal cards, animated counters, hover/tilt effects, typing-effect search placeholder
**13 pages*  Home, Explore, Categories, Tool Details, Top Rated, New Tools, Favorites, About, Contact, FAQ, Privacy Policy, Terms & Conditions, and a custom 404
 **Fully responsive*  designed mobile-first for phones, tablets, and desktop
**Accessible markup* semantic HTML, ARIA labels on icon buttons, visible focus states

## Tech stack

| Layer    | Choice                                              |
| -------- | --------------------------------------------------- |
| Markup   | Semantic HTML5                                      |
| Styling  | Hand-written CSS (Grid + Flexbox), no framework     |
| Behavior | Vanilla JavaScript (ES6)                            |
| Data     | Static in-page dataset (50 tools, 15 categories)    |
| Storage  | Browser `localStorage` (favorites, theme)           |
| Fonts    | Space Grotesk, Inter, JetBrains Mono (Google Fonts) |

No React, no Tailwind, no jQuery, no bundler â€” every page is a single, self-contained `.html` file with its CSS and JavaScript inlined. This keeps deployment to a single step: upload the files and go.

## Project structure

```text
ai-tools-hub/
index.html          Home
explore.html        Search, filter & browse all tools
 categories.html      All 15 categories
 tool-details.html    Single tool detail (reads ?id= from the URL)
 top-rated.html       Tools rated 4.3â˜… and above
 new-tools.html       Sorted by date added
 favorites.html       Tools saved locally by the visitor
 about.html
 contact.html         Validated contact form
 faq.html             15-question accordion
 privacy.html
 terms.html
 404.html
```

Each file is fully self-contained there are no separate `css/` or `js/` folders to keep in sync, which makes the project trivial to host anywhere that serves static files.

## Running locally

No build tools or installation required:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/index.html`. Double-clicking `index.html` directly also works, since every page is self-contained.

## Deploying

Because every page is a single static file, deployment is a one-step upload:

 **GitHub Pages* push the files to a repository and enable Pages (Settings â†’ Pages  Branch: `main`, folder: `/root`)
**Netlify / Vercel* drag and drop the folder onto the dashboard
- Any static host  just copy the files up, no build command needed

## Data notes

- All 50 tools are real, publicly known AI products, with original one-sentence descriptions written for this directory.
- Favorites and theme preference are stored per-browser in `localStorage`  they are not synced across devices and will reset if browser data is cleared.
- Tool "logos" are rendered as colored initials rather than image files, so the site needs zero external image assets to run.

## Contact

- GitHub: [github.com/jv-patel](https://github.com/jv-patel)
- Instagram: [@jeel_ptl_.2515](https://www.instagram.com/jeel_ptl_.2515)
- Email: [jeelpatel0038@gmail.com](mailto:jeelpatel0038@gmail.com)
- WhatsApp: [+91 97234 15082](https://wa.me/919723415082)

## License

This project is without permission by author cannot right, if you have use to project without author permission then author is take a action for you and your project 
