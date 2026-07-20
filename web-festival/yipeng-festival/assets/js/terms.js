document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. SIDEBAR LINK ACTIVE HIGH LIGHT ON SCROLL
  // ==========================================================================
  const links = Array.from(
    document.querySelectorAll(".terms-sidebar__nav a")
  );

  const sections = links
    .map((link) => {
      const selector = link.getAttribute("href");
      return selector ? document.querySelector(selector) : null;
    })
    .filter(Boolean);

  if (links.length && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          links.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("is-active", isActive);
          });
        });
      },
      {
        rootMargin: "-28% 0px -58% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
  }
});
