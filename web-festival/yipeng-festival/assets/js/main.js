// Add js-enabled class to HTML element immediately when script loads to enable transitions
document.documentElement.classList.add("js-enabled");

document.addEventListener("DOMContentLoaded", () => {
  /**
   * Initializes the package grid show/hide toggle behavior.
   */
  function initPackagesToggle() {
    const toggleBtn = document.getElementById("js-packages-toggle");
    if (!toggleBtn) {
      return;
    }

    const cards = document.querySelectorAll(".package-card");
    const totalCards = cards.length;

    if (totalCards <= 3) {
      toggleBtn.parentElement.style.display = "none";
      return;
    }

    // Remove existing event listener if any (to prevent duplicate handlers on dynamically reloaded components)
    const newToggleBtn = toggleBtn.cloneNode(true);
    toggleBtn.parentNode.replaceChild(newToggleBtn, toggleBtn);

    newToggleBtn.addEventListener("click", () => {
      const isShowingAll = newToggleBtn.getAttribute("data-showing-all") === "true";

      cards.forEach((card, index) => {
        if (index >= 3) {
          if (isShowingAll) {
            card.classList.add("is-hidden");
          } else {
            card.classList.remove("is-hidden");
          }
        }
      });

      if (isShowingAll) {
        newToggleBtn.setAttribute("data-showing-all", "false");
        newToggleBtn.textContent = "Xem Tất Cả Hạng Vé";
        newToggleBtn.focus();

        const packagesSection = document.getElementById("packages");
        if (packagesSection) {
          packagesSection.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        newToggleBtn.setAttribute("data-showing-all", "true");
        newToggleBtn.textContent = "Thu gọn";

        const firstHiddenCard = cards[3];
        if (firstHiddenCard) {
          const firstLink = firstHiddenCard.querySelector("a, button");
          if (firstLink) {
            setTimeout(() => firstLink.focus(), 150);
          }
        }
      }
    });
  }

  /**
   * Initializes scroll-based reveal trigger for elements with .reveal-item
   */
  function initRevealOnScroll() {
    const revealItems = document.querySelectorAll('.reveal-item');
    if (!revealItems.length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => {
        item.classList.add('is-visible');
      });
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16
      }
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });

    // Check items initially in viewport
    requestAnimationFrame(() => {
      revealItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          item.classList.add('is-visible');
        }
      });
    });
  }

  /**
   * Initializes scroll-based reveal trigger for schedule items
   */
  function initScheduleReveal() {
    const scheduleRevealItems = document.querySelectorAll(
      ".schedule-item, .schedule-info-card"
    );

    if (!scheduleRevealItems.length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      scheduleRevealItems.forEach((item) => {
        item.classList.add("is-visible");
      });
      return;
    }

    const scheduleObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    scheduleRevealItems.forEach((item) => {
      scheduleObserver.observe(item);
    });

    // Check items initially in viewport
    requestAnimationFrame(() => {
      scheduleRevealItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          item.classList.add("is-visible");
        }
      });
    });
  }

  /**
   * Initializes table column highlight hover behaviors.
   */
  function initTableColumnHighlight() {
    const table = document.querySelector(".tier-table");

    if (!table) return;

    const rows = Array.from(table.rows);

    table.addEventListener("mouseover", (event) => {
      const cell = event.target.closest("th, td");

      if (!cell || !table.contains(cell)) return;

      const columnIndex = cell.cellIndex;

      rows.forEach((row) => {
        const currentCell = row.cells[columnIndex];

        if (currentCell) {
          currentCell.classList.add("is-column-active");
        }
      });
    });

    table.addEventListener("mouseleave", () => {
      table
        .querySelectorAll(".is-column-active")
        .forEach((cell) => {
          cell.classList.remove("is-column-active");
        });
    });
  }

  /**
   * Initializes ticket purchase quantity controls (plus/minus).
   */
  function initTicketQuantity() {
    const minusButton = document.querySelector("[data-quantity-minus]");
    const plusButton = document.querySelector("[data-quantity-plus]");
    const quantityInput = document.querySelector(
      ".ticket-purchase__quantity input"
    );

    if (!minusButton || !plusButton || !quantityInput) return;

    // Prevent duplicate handlers by cloning
    const newMinus = minusButton.cloneNode(true);
    const newPlus = plusButton.cloneNode(true);
    minusButton.parentNode.replaceChild(newMinus, minusButton);
    plusButton.parentNode.replaceChild(newPlus, plusButton);

    newMinus.addEventListener("click", () => {
      const currentValue = Number(quantityInput.value) || 1;
      quantityInput.value = Math.max(1, currentValue - 1);
    });

    newPlus.addEventListener("click", () => {
      const currentValue = Number(quantityInput.value) || 1;
      quantityInput.value = currentValue + 1;
    });
  }

  /**
   * Initializes ticket image lightbox zoom triggers.
   */
  function initTicketLightbox() {
    const zoomButton = document.querySelector(".ticket-detail__zoom");
    const productImage = document.querySelector(".ticket-detail__image");
    const lightbox = document.querySelector("[data-ticket-lightbox]");
    const lightboxImage = document.querySelector(".ticket-lightbox__image");
    const closeButton = document.querySelector(".ticket-lightbox__close");

    if (
      !zoomButton ||
      !productImage ||
      !lightbox ||
      !lightboxImage ||
      !closeButton
    ) {
      return;
    }

    const openLightbox = () => {
      lightboxImage.src = productImage.src;
      lightboxImage.alt = productImage.alt;
      lightbox.hidden = false;
      document.body.classList.add("is-lightbox-open");
    };

    const closeLightbox = () => {
      lightbox.hidden = true;
      document.body.classList.remove("is-lightbox-open");
    };

    const newZoom = zoomButton.cloneNode(true);
    const newClose = closeButton.cloneNode(true);
    zoomButton.parentNode.replaceChild(newZoom, zoomButton);
    closeButton.parentNode.replaceChild(newClose, closeButton);

    newZoom.addEventListener("click", openLightbox);
    newClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    // Cleanup keydown listener to avoid memory leak if bound repeatedly
    const keydownHandler = (event) => {
      if (event.key === "Escape" && !lightbox.hidden) {
        closeLightbox();
      }
    };
    document.removeEventListener("keydown", keydownHandler);
    document.addEventListener("keydown", keydownHandler);
  }

  /**
   * Initializes related products layout checks.
   */
  function initRelatedProducts() {
    const section = document.querySelector(".related-products");
    const grid = document.querySelector(".related-products__grid");

    if (!section || !grid) return;

    const products = grid.querySelectorAll(".related-product-card");

    if (products.length === 0) {
      section.hidden = true;
      return;
    }

    if (products.length === 2) {
      grid.classList.add("related-products__grid--two");
    }
  }

  // Hook into the componentsLoaded custom event dispatched by component-loader.js
  document.addEventListener("componentsLoaded", () => {
    initPackagesToggle();
    initRevealOnScroll();
    initScheduleReveal();
    initTableColumnHighlight();
    initTicketQuantity();
    initTicketLightbox();
    initRelatedProducts();
  });

  // Fallback: If components are already present statically in the DOM
  initPackagesToggle();
  initRevealOnScroll();
  initScheduleReveal();
  initTableColumnHighlight();
  initTicketQuantity();
  initTicketLightbox();
  initRelatedProducts();
});
