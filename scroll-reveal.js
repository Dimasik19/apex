(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const selectors = [
    ".site-header",
    ".hero-copy",
    ".stat",
    ".feature",
    ".calculator-widget",
    ".section-heading",
    ".quote-card",
    ".signup-form",
    ".faq details",
    ".footer img",
    ".footer-links > div"
  ];
  const elements = document.querySelectorAll(selectors.join(","));

  if (!elements.length) {
    return;
  }

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  elements.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 3, 2) * 80}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.14
    }
  );

  elements.forEach((element) => observer.observe(element));
})();
