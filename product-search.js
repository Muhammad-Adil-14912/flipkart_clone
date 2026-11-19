(function (root) {
  function filterProducts(cards, sections, status, query) {
    const normalizedQuery = String(query || '').trim().toLocaleLowerCase();
    let visibleCount = 0;

    cards.forEach(({ card }) => {
      const matches = !normalizedQuery ||
        String(card.textContent || '').toLocaleLowerCase().includes(normalizedQuery);
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    sections.forEach((section) => {
      const hasVisibleProducts = cards.some(
        ({ card, section: cardSection }) => cardSection === section && !card.hidden
      );
      section.hidden = !hasVisibleProducts;
    });

    if (!normalizedQuery) {
      status.textContent = '';
    } else if (visibleCount === 0) {
      status.textContent = 'No products found. Try another search.';
    } else {
      status.textContent = visibleCount +
        (visibleCount === 1 ? ' product found.' : ' products found.');
    }

    return visibleCount;
  }

  const api = Object.freeze({ filterProducts });
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    root.ProductSearch = api;
  }
})(globalThis);
