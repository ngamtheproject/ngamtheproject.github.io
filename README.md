# Ngam The Project
[![Netlify Status](https://api.netlify.com/api/v1/badges/c518efd1-e85c-4a02-8ca7-13e7b25934ea/deploy-status)](https://app.netlify.com/projects/ngamtheproject/deploys)

Website for [Ngăm](https://ngamtheproject.github.io) - a charity organization founded by high school students.

## Quick start

Requirements: [Hugo extended](https://gohugo.io/installation/) (the version in `hugoblox.yaml`), Go, Node.js 22 or newer.

```sh
npm install           # Tailwind CSS and Pagefind, used by the HugoBlox Kit theme
hugo server           # preview at http://localhost:1313
npm run build         # production build into public/, then the Pagefind search index
node --test tests/netlify-footer-host.test.js
```

## Powered By

- [Hugo](https://gohugo.io/): Our static site generator.
- [HugoBlox Kit](https://hugoblox.com/): Our Hugo theme.
- [GitHub Pages](https://pages.github.com/) & [Netlify](https://www.netlify.com/): Our hosting.

We are grateful to the creators and maintainers of these tools and services for making our project possible.
