document.addEventListener("DOMContentLoaded", () => {
  /**
   * Initializes the Hero Slider component.
   * Runs only after elements have been fully loaded into the DOM.
   */
  function initHeroSlider() {
    const heroSection = document.getElementById("lantern-hero");
    const sliderContainer = document.querySelector("[data-lantern-slider]");
    const paginationContainer = document.querySelector("[data-slider-pagination]");
    const scrollBtn = document.getElementById("js-hero-scroll-btn");

    if (!heroSection || !sliderContainer || !paginationContainer) {
      return;
    }

    const slides = sliderContainer.querySelectorAll(".lantern-slide");
    const totalSlides = slides.length;

    if (totalSlides === 0) {
      return;
    }

    let currentIndex = 0;
    let autoplayInterval = null;
    const autoplayDuration = 5000; // Autoplay every 5000ms

    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Create pagination dots dynamically
    const dots = [];
    paginationContainer.innerHTML = ""; // Clear placeholder
    
    // Only generate pagination if there are slides
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("button");
      dot.className = "lantern-slider__dot";
      dot.setAttribute("type", "button");
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      
      if (i === 0) {
        dot.classList.add("is-active");
        dot.setAttribute("aria-current", "true");
      } else {
        dot.setAttribute("aria-current", "false");
      }

      dot.addEventListener("click", () => {
        showSlide(i);
        // Reset autoplay timer after manual click
        resetAutoplay();
      });

      paginationContainer.appendChild(dot);
      dots.push(dot);
    }

    /**
     * Transitions the slider to the slide at the specified index.
     * Updates visual classes and accessibility ARIA attributes.
     */
    function showSlide(index) {
      if (index < 0 || index >= totalSlides) {
        return;
      }

      // Deactivate current slide and dot
      slides[currentIndex].classList.remove("is-active");
      slides[currentIndex].setAttribute("aria-hidden", "true");
      if (dots[currentIndex]) {
        dots[currentIndex].classList.remove("is-active");
        dots[currentIndex].setAttribute("aria-current", "false");
      }

      // Activate new slide and dot
      currentIndex = index;
      slides[currentIndex].classList.add("is-active");
      slides[currentIndex].setAttribute("aria-hidden", "false");
      if (dots[currentIndex]) {
        dots[currentIndex].classList.add("is-active");
        dots[currentIndex].setAttribute("aria-current", "true");
      }
    }

    /**
     * Cycles to the next slide in sequence, looping back to index 0 at the end.
     */
    function nextSlide() {
      const nextIndex = (currentIndex + 1) % totalSlides;
      showSlide(nextIndex);
    }

    /**
     * Starts the autoplay interval if multiple slides exist and reduced motion is disabled.
     */
    function startAutoplay() {
      if (totalSlides <= 1 || prefersReducedMotion) {
        return;
      }
      
      stopAutoplay(); // Clear any existing intervals first
      autoplayInterval = setInterval(nextSlide, autoplayDuration);
    }

    /**
     * Stops/clears the autoplay slide cycle.
     */
    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    }

    /**
     * Resets the autoplay interval (e.g. after manual interaction).
     */
    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // Initialize Autoplay loop
    startAutoplay();

    // Pause autoplay when document/tab is hidden to reduce power & memory usage
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });

    // Scroll Down Button handler: scrolls exactly past the Hero section
    if (scrollBtn) {
      scrollBtn.addEventListener("click", () => {
        const heroBottom = heroSection.getBoundingClientRect().bottom + window.scrollY;
        window.scrollTo({
          top: heroBottom,
          behavior: "smooth"
        });
      });
    }
  }

  // Hook into componentsLoaded custom event dispatched by component-loader.js
  document.addEventListener("componentsLoaded", initHeroSlider);

  // Fallback: If component elements are already present in the DOM
  if (document.getElementById("lantern-hero")) {
    initHeroSlider();
  }
});
