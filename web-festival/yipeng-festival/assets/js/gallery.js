document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. IMAGE FILTERING LOGIC
  // ==========================================================================
  const filterButtons = Array.from(
    document.querySelectorAll("[data-gallery-filter]")
  );
  const galleryItems = Array.from(
    document.querySelectorAll("[data-gallery-item]")
  );

  if (filterButtons.length && galleryItems.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const selectedYear = button.dataset.galleryFilter;

        filterButtons.forEach((item) => {
          const isActive = item === button;
          item.classList.toggle("is-active", isActive);
          item.setAttribute("aria-selected", String(isActive));
        });

        // Trigger transition out
        galleryItems.forEach((item) => {
          item.classList.add("is-filtering");
        });

        window.setTimeout(() => {
          galleryItems.forEach((item) => {
            const itemYear = item.dataset.year;
            const isVisible =
              selectedYear === "all" || selectedYear === itemYear;

            item.classList.toggle("is-hidden", !isVisible);
            item.classList.remove("is-filtering");
          });
        }, 180);
      });
    });
  }

  // ==========================================================================
  // 2. LAZY IMAGE SKELETON LOADER STATE
  // ==========================================================================
  const images = document.querySelectorAll(".gallery-item__image");

  images.forEach((image) => {
    const markLoaded = () => {
      image.classList.add("is-loaded");
      image.closest(".gallery-item__button")?.classList.add("is-loaded");
    };

    if (image.complete) {
      markLoaded();
    } else {
      image.addEventListener("load", markLoaded, { once: true });
      image.addEventListener("error", markLoaded, { once: true });
    }
  });

  // ==========================================================================
  // 3. LIGHTBOX DIALOG MODAL LOGIC
  // ==========================================================================
  const lightbox = document.querySelector("[data-gallery-lightbox]");
  if (!lightbox) return;

  const lightboxImage = lightbox.querySelector(".gallery-lightbox__image");
  const lightboxCaption = lightbox.querySelector(".gallery-lightbox__caption");
  const currentCounter = lightbox.querySelector("[data-lightbox-current]");
  const totalCounter = lightbox.querySelector("[data-lightbox-total]");
  const previousButton = lightbox.querySelector("[data-lightbox-previous]");
  const nextButton = lightbox.querySelector("[data-lightbox-next]");
  const closeButtons = lightbox.querySelectorAll("[data-lightbox-close]");

  let visibleItems = [];
  let currentIndex = 0;
  let lastFocusedElement = null;

  const updateVisibleItems = () => {
    visibleItems = Array.from(
      document.querySelectorAll("[data-gallery-item]:not(.is-hidden)")
    );
  };

  const renderImage = () => {
    const currentItem = visibleItems[currentIndex];
    if (!currentItem) return;

    const image = currentItem.querySelector(".gallery-item__image");
    if (!image) return;

    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = image.alt;

    currentCounter.textContent = String(currentIndex + 1);
    totalCounter.textContent = String(visibleItems.length);
  };

  const openLightbox = (item) => {
    lastFocusedElement = document.activeElement;
    updateVisibleItems();
    currentIndex = visibleItems.indexOf(item);

    if (currentIndex < 0) return;

    renderImage();
    lightbox.hidden = false;
    document.body.classList.add("is-gallery-lightbox-open");
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.classList.remove("is-gallery-lightbox-open");

    // Recover focus for accessibility
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  };

  const showPrevious = () => {
    if (!visibleItems.length) return;
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    renderImage();
  };

  const showNext = () => {
    if (!visibleItems.length) return;
    currentIndex = (currentIndex + 1) % visibleItems.length;
    renderImage();
  };

  document.querySelectorAll("[data-gallery-item]").forEach((item) => {
    const button = item.querySelector(".gallery-item__button");
    button?.addEventListener("click", () => {
      openLightbox(item);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeLightbox);
  });

  previousButton?.addEventListener("click", showPrevious);
  nextButton?.addEventListener("click", showNext);

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;

    if (event.key === "Escape") {
      closeLightbox();
    }
    if (event.key === "ArrowLeft") {
      showPrevious();
    }
    if (event.key === "ArrowRight") {
      showNext();
    }
  });
});
