# Ngam The Project
[![Netlify Status](https://api.netlify.com/api/v1/badges/c518efd1-e85c-4a02-8ca7-13e7b25934ea/deploy-status)](https://app.netlify.com/projects/ngamtheproject/deploys)

Website for [Ngăm](https://ngamtheproject.github.io) - a charity organization founded by high school students. The project ran from 2022 to 2024 and the site is kept as its memory.

## Quick start

Requirements: [Hugo extended](https://gohugo.io/installation/) **0.154.5**. Node.js is needed only for the footer test.

```sh
hugo server                                 # preview at http://localhost:1313
hugo --gc --minify                          # production build into public/
node --test tests/netlify-footer-host.test.js
```

A cold build resizes every album photo and takes a few minutes; later builds reuse `resources/_gen/` and take about a second.

## Hugo version

The site is built with Hugo 0.154.5 extended everywhere: it is the version in the Ubuntu 26.04 LTS archive, which local builds use, and CI (`.github/workflows/publish.yaml`) and Netlify (`netlify.toml`) install the same release. Change all three together.

## Theme

The theme is written for this site and lives in the repo itself: templates in `layouts/`, styles in `assets/css/`, scripts in `assets/js/`. There are no Hugo modules and no npm packages. Photos and videos live in `assets/media/`; Hugo publishes resized JPEG copies of the photos (400, 800 and 1200 px wide), never the originals.

Content shortcodes: `figure`, `gallery`, `video`, `videos`, `albums` and `gdocs`.

## Hosting

- [GitHub Pages](https://pages.github.com/): every push to `main` deploys https://ngamtheproject.github.io.
- [Netlify](https://www.netlify.com/): the site is also deployed on Netlify, which kindly hosts it on its Open Source plan; pages served from `*.netlify.app` show a "powered by Netlify" credit in the footer.

We are grateful to the creators and maintainers of [Hugo](https://gohugo.io/), GitHub Pages and Netlify for making this project possible.
