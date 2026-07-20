function initializeHeader() {
  const header = document.querySelector("[data-site-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");

  if (!header) {
    return;
  }

  // Thiết lập class active động dựa vào trang đang truy cập
  const links = header.querySelectorAll(".navbar__link, .mobile-menu a");
  const currentPath = window.location.pathname;

  links.forEach(link => {
    link.classList.remove("navbar__link--active", "is-active");
    const href = link.getAttribute("href");
    if (!href) return;

    const pageName = href.split("/").pop();
    const isCurrentPage = currentPath.endsWith(pageName) || 
                          (pageName === "index.html" && (currentPath.endsWith("/") || currentPath === ""));

    if (isCurrentPage) {
      if (link.classList.contains("navbar__link")) {
        link.classList.add("navbar__link--active");
      } else {
        link.classList.add("is-active");
      }
    }
  });


  function updateHeaderOnScroll() {
    const isScrolled = window.scrollY > 0;

    header.classList.toggle("is-scrolled", isScrolled);
  }

  updateHeaderOnScroll();

  window.addEventListener("scroll", updateHeaderOnScroll, {
    passive: true
  });

  if (!toggle || !mobileMenu) {
    return;
  }

  function closeMenu() {
    header.classList.remove("is-open");
    document.body.classList.remove("menu-open");

    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
  }

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");

    document.body.classList.toggle("menu-open", isOpen);

    toggle.setAttribute("aria-expanded", String(isOpen));

    toggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  mobileMenu.addEventListener("click", event => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1100) {
      closeMenu();
    }
  });
}

document.addEventListener(
  "componentsLoaded",
  initializeHeader
);