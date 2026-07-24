const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const template = fs.readFileSync(
  path.join(__dirname, '..', 'layouts', 'partials', 'hooks', 'footer-start', 'netlify.html'),
  'utf8',
);

function creditIsHidden(hostname) {
  const script = template.match(/<script>([\s\S]*?)<\/script>/);
  assert.ok(script, 'footer must check the browser hostname at runtime');

  const credit = { hidden: true };
  vm.runInNewContext(script[1], {
    document: {
      currentScript: {
        previousElementSibling: credit,
      },
    },
    window: {
      location: {
        hostname,
      },
    },
  });

  return credit.hidden;
}

test('keeps the credit hidden until the hostname check runs', () => {
  const credit = template.match(/<div\b[^>]*class="powered-by"[^>]*>/);
  assert.ok(credit, 'footer must include the Netlify credit');
  assert.match(credit[0], /\shidden(?:\s|>)/);
});

test('shows the credit on Netlify subdomains', () => {
  assert.equal(creditIsHidden('ngamtheproject.netlify.app'), false);
  assert.equal(creditIsHidden('deploy-preview-42--ngamtheproject.netlify.app'), false);
});

test('hides the credit on non-Netlify hosts', () => {
  assert.equal(creditIsHidden('ngamtheproject.github.io'), true);
  assert.equal(creditIsHidden('netlify.app'), true);
  assert.equal(creditIsHidden('evilnetlify.app'), true);
  assert.equal(creditIsHidden('netlify.app.example.com'), true);
});
