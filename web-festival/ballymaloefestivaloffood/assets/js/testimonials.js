function initializeTestimonialsSlider() {
    const slider = document.querySelector(
        "[data-testimonials-slider]"
    );

    if (!slider) {
        return;
    }

    const viewport = slider.querySelector(
        ".testimonials-slider__viewport"
    );

    const track = slider.querySelector(
        "[data-testimonials-track]"
    );

    const previousButton = slider.querySelector(
        "[data-testimonials-prev]"
    );

    const nextButton = slider.querySelector(
        "[data-testimonials-next]"
    );

    if (
        !viewport ||
        !track ||
        !previousButton ||
        !nextButton
    ) {
        return;
    }

    const cards = [
        ...track.querySelectorAll(".testimonial-card")
    ];

    if (cards.length === 0) {
        return;
    }

    let currentIndex = 0;
    let autoSlideTimer = null;
    let touchStartX = 0;

    function getGap() {
        const styles = window.getComputedStyle(track);

        return Number.parseFloat(styles.columnGap) || 0;
    }

    function setTrackPadding() {
        const viewportWidth =
            viewport.getBoundingClientRect().width;

        const cardWidth =
            cards[0].getBoundingClientRect().width;

        const sidePadding = Math.max(
            0,
            (viewportWidth - cardWidth) / 2
        );

        track.style.paddingLeft = `${sidePadding}px`;
        track.style.paddingRight = `${sidePadding}px`;
    }

    function updateSlider(animate = true) {
        setTrackPadding();

        const cardWidth =
            cards[0].getBoundingClientRect().width;

        const offset =
            currentIndex * (cardWidth + getGap());

        track.style.transition = animate
            ? "transform 500ms ease"
            : "none";

        track.style.transform =
            `translateX(-${offset}px)`;
    }

    function goToIndex(index) {
        currentIndex =
            (index + cards.length) % cards.length;

        updateSlider();
    }

    function goToNext() {
        goToIndex(currentIndex + 1);
    }

    function goToPrevious() {
        goToIndex(currentIndex - 1);
    }

    function stopAutoSlide() {
        if (autoSlideTimer === null) {
            return;
        }

        window.clearInterval(autoSlideTimer);
        autoSlideTimer = null;
    }

    function startAutoSlide() {
        stopAutoSlide();

        autoSlideTimer = window.setInterval(
            goToNext,
            4500
        );
    }

    previousButton.addEventListener("click", () => {
        goToPrevious();
        startAutoSlide();
    });

    nextButton.addEventListener("click", () => {
        goToNext();
        startAutoSlide();
    });

    slider.addEventListener(
        "mouseenter",
        stopAutoSlide
    );

    slider.addEventListener(
        "mouseleave",
        startAutoSlide
    );

    slider.addEventListener(
        "focusin",
        stopAutoSlide
    );

    slider.addEventListener(
        "focusout",
        startAutoSlide
    );

    slider.addEventListener(
        "touchstart",
        event => {
            touchStartX =
                event.changedTouches[0].clientX;

            stopAutoSlide();
        },
        {
            passive: true
        }
    );

    slider.addEventListener(
        "touchend",
        event => {
            const touchEndX =
                event.changedTouches[0].clientX;

            const distance =
                touchStartX - touchEndX;

            if (Math.abs(distance) >= 50) {
                if (distance > 0) {
                    goToNext();
                } else {
                    goToPrevious();
                }
            }

            startAutoSlide();
        },
        {
            passive: true
        }
    );

    window.addEventListener("resize", () => {
        updateSlider(false);
    });

    updateSlider(false);
    startAutoSlide();
}

document.addEventListener(
    "componentsLoaded",
    initializeTestimonialsSlider
);