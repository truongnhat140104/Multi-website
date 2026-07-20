document.addEventListener("DOMContentLoaded", () => {
  /**
   * Initializes the header scroll and mobile drawer interactions.
   * Runs only after elements have been fully loaded into the DOM.
   */
  function initHeader() {
    const siteHeader = document.getElementById("js-site-header");
    const navToggle = document.getElementById("js-nav-toggle");
    const mobileDrawer = document.getElementById("js-mobile-drawer");
    const drawerOverlay = document.getElementById("js-drawer-overlay");
    const drawerClose = document.getElementById("js-drawer-close");
    const drawerLinks = document.querySelectorAll(".mobile-nav__link");

    // Prevent initialization if components are not yet injected
    if (!siteHeader || !navToggle || !mobileDrawer || !drawerOverlay) {
      return;
    }

    /**
     * Dynamically sets the active state class on navigation links based on URL pathname.
     */
    function highlightActiveNav() {
      const pathname = window.location.pathname.toLowerCase();
      const desktopLinks = document.querySelectorAll(".desktop-nav__link");
      const mobileLinks = document.querySelectorAll(".mobile-nav__link");

      function updateLinks(links, activeClass) {
        links.forEach((link) => {
          const href = link.getAttribute("href").toLowerCase();
          let isMatch = false;

          if (pathname.endsWith("tickets.html") && href.includes("tickets.html")) {
            isMatch = true;
          } else if (pathname.endsWith("gallery.html") && href.includes("gallery.html")) {
            isMatch = true;
          } else if (pathname.endsWith("faq.html") && href.includes("faq.html")) {
            isMatch = true;
          } else if (pathname.endsWith("terms.html") && href.includes("terms.html")) {
            isMatch = true;
          } else if (
            (pathname.endsWith("index.html") || pathname.endsWith("/")) &&
            (href.endsWith("index.html") || href === "index.html" || href === "../index.html")
          ) {
            isMatch = true;
          }

          link.classList.toggle(activeClass, isMatch);
        });
      }

      updateLinks(desktopLinks, "desktop-nav__link--active");
      updateLinks(mobileLinks, "mobile-nav__link--active");
    }

    // Run dynamic nav highlighter
    highlightActiveNav();

    /**
     * Opens the mobile navigation drawer, locks scroll, and updates accessibility attributes.
     */
    function openMenu() {
      document.body.classList.add("menu-open");
      navToggle.setAttribute("aria-expanded", "true");
      navToggle.setAttribute("aria-label", "Close navigation");
      mobileDrawer.setAttribute("aria-hidden", "false");
      drawerOverlay.removeAttribute("aria-hidden");
      
      // Accessibility: Focus the close button inside drawer
      if (drawerClose) {
        setTimeout(() => drawerClose.focus(), 100);
      }
    }

    /**
     * Closes the mobile navigation drawer, restores scroll, and updates accessibility attributes.
     */
    function closeMenu() {
      document.body.classList.remove("menu-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
      mobileDrawer.setAttribute("aria-hidden", "true");
      drawerOverlay.setAttribute("aria-hidden", "true");
      
      // Accessibility: Return focus to trigger button
      navToggle.focus();
    }

    // Toggle button click listener
    navToggle.addEventListener("click", () => {
      const isOpen = document.body.classList.contains("menu-open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close button click listener
    if (drawerClose) {
      drawerClose.addEventListener("click", closeMenu);
    }

    // Backdrop click listener to close menu
    drawerOverlay.addEventListener("click", closeMenu);

    // Escape key press listener to close menu
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
        closeMenu();
      }
    });

    // Navigation links listener (closes drawer when clicking anchors)
    drawerLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    /**
     * Toggles the scroll-specific style class when the user scrolls past 20px.
     */
    function handleScroll() {
      if (window.scrollY > 20) {
        siteHeader.classList.add("header-scrolled");
      } else {
        siteHeader.classList.remove("header-scrolled");
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger initial check in case page starts scrolled down
    handleScroll();
  }

  // Bind to the componentsLoaded custom event dispatched by component-loader.js
  document.addEventListener("componentsLoaded", initHeader);

  // Fallback: If components are already in the DOM (e.g. static pages without loader)
  if (document.getElementById("js-site-header")) {
    initHeader();
  }
});
