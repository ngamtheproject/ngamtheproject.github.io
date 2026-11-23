// Checks the hosting credit in the footer (layouts/_partials/netlify-credit.html): a static link to
// Netlify, which its Open Source plan requires, shown on every host with no script.
// Run with `node --test tests/*.test.js`; no dependencies.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.join(__dirname, '..', 'layouts', '_partials');
const credit = fs.readFileSync(path.join(root, 'netlify-credit.html'), 'utf8');
const footer = fs.readFileSync(path.join(root, 'footer.html'), 'utf8');

test('links to Netlify and GitHub Pages in static markup', () => {
  assert.match(credit, /<a href="https:\/\/www\.netlify\.com"[^>]*>Netlify<\/a>/);
  assert.match(credit, /<a href="https:\/\/pages\.github\.com"[^>]*>GitHub Pages<\/a>/);
});

test('does not depend on the host or on JavaScript', () => {
  assert.doesNotMatch(credit, /<script/);
  assert.doesNotMatch(credit, /hostname/);
});

test('the footer includes the credit', () => {
  assert.match(footer, /partial "netlify-credit\.html"/);
});
