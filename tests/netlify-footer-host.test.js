const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const template = fs.readFileSync(
  path.join(__dirname, '..', 'layouts', 'partials', 'hooks', 'footer-start', 'netlify.html'),
  'utf8',
);

function insertedCredits(hostname) {
  const script = template.match(/<script>([\s\S]*?)<\/script>/);
  assert.ok(script, 'footer must check the browser hostname at runtime');

  const insertions = [];
  vm.runInNewContext(script[1], {
    document: {
      currentScript: {
        insertAdjacentHTML(position, html) {
          insertions.push({ html, position });
        },
      },
    },
    window: {
      location: {
        hostname,
      },
    },
  });

  return insertions;
}

test('does not render static credit markup', () => {
  const staticMarkup = template.replace(/<script>[\s\S]*?<\/script>/, '');
  assert.doesNotMatch(staticMarkup, /class="powered-by"/);
});

test('inserts the credit on Netlify subdomains', () => {
  for (const hostname of [
    'ngamtheproject.netlify.app',
    'deploy-preview-42--ngamtheproject.netlify.app',
  ]) {
    const insertions = insertedCredits(hostname);
    assert.equal(insertions.length, 1);
    assert.equal(insertions[0].position, 'beforebegin');
    assert.equal(
      insertions[0].html.replace(/\s+/g, ' ').trim(),
      '<div class="powered-by" style="text-align: center"> This site is powered by ' +
        '<a href="https://www.netlify.com" target="_blank">Netlify</a> </div>',
    );
  }
});

test('inserts nothing on non-Netlify hosts', () => {
  for (const hostname of [
    'ngamtheproject.github.io',
    'netlify.app',
    'evilnetlify.app',
    'netlify.app.example.com',
  ]) {
    assert.deepEqual(insertedCredits(hostname), []);
  }
});
