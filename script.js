(() => {
  const form = document.getElementById('productSearchForm');
  const input = document.getElementById('productSearch');
  const status = document.getElementById('searchStatus');
  const sections = Array.from(document.querySelectorAll('.product-section'));

  if (!form || !input || !status) return;

  const cards = sections.flatMap((section) =>
    Array.from(section.querySelectorAll('.product-card')).map((card) => ({ card, section }))
  );

  function filterProducts(query) {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    let visibleCount = 0;

    cards.forEach(({ card }) => {
      const matches = !normalizedQuery ||
        card.textContent.toLocaleLowerCase().includes(normalizedQuery);
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    sections.forEach((section) => {
      const hasVisibleProducts = section.querySelector('.product-card:not([hidden])') !== null;
      section.hidden = !hasVisibleProducts;
    });

    if (!normalizedQuery) {
      status.textContent = '';
    } else if (visibleCount === 0) {
      status.textContent = 'No products found. Try another search.';
    } else {
      status.textContent = visibleCount + (visibleCount === 1 ? ' product found.' : ' products found.');
    }
  }

  input.addEventListener('input', () => filterProducts(input.value));
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    filterProducts(input.value);
  });
})();
