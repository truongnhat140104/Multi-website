function initializeGallery() {
  const items = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("gallery-lightbox");

  if (items.length === 0 || !lightbox) {
    return;
  }

  const lightboxImg = lightbox.querySelector(".lightbox__image");
  const closeBtn = lightbox.querySelector(".lightbox__close");
  const prevBtn = lightbox.querySelector(".lightbox__nav--prev");
  const nextBtn = lightbox.querySelector(".lightbox__nav--next");

  let currentIndex = 0;

  // Retrieve image sources and alts from the items
  const images = Array.from(items).map((item) => {
    const imgEl = item.querySelector(".gallery-item__image");
    return {
      src: imgEl ? imgEl.getAttribute("src") : "",
      alt: imgEl ? imgEl.getAttribute("alt") : ""
    };
  });

  // Open Lightbox
  function openLightbox(index) {
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add("lightbox--active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    
    // Set focus on close button for accessibility
    closeBtn.focus();
  }

  // Update image in lightbox
  function updateLightboxImage() {
    const currentImg = images[currentIndex];
    if (currentImg) {
      lightboxImg.setAttribute("src", currentImg.src);
      lightboxImg.setAttribute("alt", currentImg.alt);
    }
  }

  // Close Lightbox
  function closeLightbox() {
    lightbox.classList.remove("lightbox--active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    
    // Return focus to the triggered item for keyboard accessibility
    const activeItem = items[currentIndex];
    if (activeItem) {
      activeItem.focus();
    }
  }

  // Next image navigation
  function navigateNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightboxImage();
  }

  // Previous image navigation
  function navigatePrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightboxImage();
  }

  // Event Listeners for Grid Items
  items.forEach((item, index) => {
    item.addEventListener("click", () => {
      openLightbox(index);
    });
  });

  // Close Button Click
  closeBtn.addEventListener("click", closeLightbox);

  // Nav Click
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navigatePrev();
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navigateNext();
  });

  // Close when clicking outside content area (on backdrop)
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.classList.contains("lightbox__content")) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    const isActive = lightbox.classList.contains("lightbox--active");
    if (!isActive) return;

    switch (e.key) {
      case "Escape":
        closeLightbox();
        e.preventDefault();
        break;
      case "ArrowRight":
        navigateNext();
        e.preventDefault();
        break;
      case "ArrowLeft":
        navigatePrev();
        e.preventDefault();
        break;
    }
  });
}

document.addEventListener("componentsLoaded", initializeGallery);
