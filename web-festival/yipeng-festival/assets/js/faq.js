document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. FAQ ACCORDION EXPAND/COLLAPSE LOGIC
  // ==========================================================================
  const faqSteps = document.querySelectorAll("[data-faq-step]");

  faqSteps.forEach((step) => {
    const button = step.querySelector(".faq-step__header");
    if (!button) return;

    button.addEventListener("click", () => {
      const isOpen = step.classList.contains("is-open");
      step.classList.toggle("is-open", !isOpen);
      button.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  // ==========================================================================
  // 2. SIDEBAR LINK ACTIVE CLASS ON SCROLL
  // ==========================================================================
  const navigationLinks = Array.from(
    document.querySelectorAll(".faq-guide__navigation a")
  );

  const sections = navigationLinks
    .map((link) => {
      const id = link.getAttribute("href");
      return id ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if (navigationLinks.length && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navigationLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("is-active", isActive);
          });
        });
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
  }
});
