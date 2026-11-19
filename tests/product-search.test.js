const test = require('node:test');
const assert = require('node:assert/strict');
const { filterProducts } = require('../product-search');

function fixture() {
  const electronics = { hidden: false };
  const fashion = { hidden: false };
  const cards = [
    { card: { textContent: 'Wireless Headphones ₹1499', hidden: false }, section: electronics },
    { card: { textContent: 'Bluetooth Speaker ₹999', hidden: false }, section: electronics },
    { card: { textContent: "Men's Casual Shirt ₹599", hidden: false }, section: fashion },
  ];
  const status = { textContent: '' };
  return { electronics, fashion, cards, sections: [electronics, fashion], status };
}

test('filters products case-insensitively and hides empty sections', () => {
  const f = fixture();
  const count = filterProducts(f.cards, f.sections, f.status, 'HEADPHONES');
  assert.equal(count, 1);
  assert.equal(f.cards[0].card.hidden, false);
  assert.equal(f.cards[1].card.hidden, true);
  assert.equal(f.cards[2].card.hidden, true);
  assert.equal(f.electronics.hidden, false);
  assert.equal(f.fashion.hidden, true);
  assert.equal(f.status.textContent, '1 product found.');
});

test('shows a useful empty state when no products match', () => {
  const f = fixture();
  assert.equal(filterProducts(f.cards, f.sections, f.status, 'laptop'), 0);
  assert.equal(f.status.textContent, 'No products found. Try another search.');
  assert.equal(f.electronics.hidden, true);
  assert.equal(f.fashion.hidden, true);
});

test('clearing the query restores all products and sections', () => {
  const f = fixture();
  filterProducts(f.cards, f.sections, f.status, 'headphones');
  assert.equal(filterProducts(f.cards, f.sections, f.status, '  '), 3);
  assert.equal(f.cards.every(({ card }) => !card.hidden), true);
  assert.equal(f.sections.every((section) => !section.hidden), true);
  assert.equal(f.status.textContent, '');
});

test('reports plural result counts', () => {
  const f = fixture();
  assert.equal(filterProducts(f.cards, f.sections, f.status, '₹'), 3);
  assert.equal(f.status.textContent, '3 products found.');
});
