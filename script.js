(() => {
  const form = document.getElementById('productSearchForm');
  const input = document.getElementById('productSearch');
  const status = document.getElementById('searchStatus');
  const sections = Array.from(document.querySelectorAll('.product-section'));

  if (!form || !input || !status || !window.ProductSearch) return;

  const cards = sections.flatMap((section) =>
    Array.from(section.querySelectorAll('.product-card')).map((card) => ({ card, section }))
  );

  function filterProducts(query) {
    window.ProductSearch.filterProducts(cards, sections, status, query);
  }

  input.addEventListener('input', () => filterProducts(input.value));
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    filterProducts(input.value);
  });
})();
