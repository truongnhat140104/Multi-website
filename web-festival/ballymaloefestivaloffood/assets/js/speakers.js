function initializeSpeakersSlider() {
    const slider = document.querySelector("[data-speakers-slider]");

    if (!slider) {
        return;
    }

    const track = slider.querySelector("[data-speakers-track]");
    const previousButton = slider.querySelector("[data-speakers-prev]");
    const nextButton = slider.querySelector("[data-speakers-next]");

    if (!track || !previousButton || !nextButton) {
        return;
    }

    let currentPage = 0;
    let itemsPerPage = getItemsPerPage();
    let autoSlideTimer = null;

    function getItemsPerPage() {
        if (window.innerWidth <= 600) {
            return 1;
        }

        if (window.innerWidth <= 900) {
            return 2;
        }

        return 4;
    }

    function getCards() {
        return [...track.querySelectorAll(".speaker-card")];
    }

    function getPageCount() {
        return Math.ceil(getCards().length / itemsPerPage);
    }

    function updateSlider() {
        track.style.transform = `translateX(-${currentPage * 100}%)`;
    }

    function goToNextPage() {
        const pageCount = getPageCount();

        currentPage = (currentPage + 1) % pageCount;

        updateSlider();
    }

    function goToPreviousPage() {
        const pageCount = getPageCount();

        currentPage =
            (currentPage - 1 + pageCount) % pageCount;

        updateSlider();
    }

    function startAutoSlide() {
        stopAutoSlide();

        autoSlideTimer = window.setInterval(() => {
            goToNextPage();
        }, 4000);
    }

    function stopAutoSlide() {
        if (!autoSlideTimer) {
            return;
        }

        window.clearInterval(autoSlideTimer);
        autoSlideTimer = null;
    }

    previousButton.addEventListener("click", () => {
        goToPreviousPage();
        startAutoSlide();
    });

    nextButton.addEventListener("click", () => {
        goToNextPage();
        startAutoSlide();
    });

    slider.addEventListener("mouseenter", stopAutoSlide);
    slider.addEventListener("mouseleave", startAutoSlide);

    slider.addEventListener("focusin", stopAutoSlide);
    slider.addEventListener("focusout", startAutoSlide);

    let touchStartX = 0;

    slider.addEventListener(
        "touchstart",
        event => {
            touchStartX = event.changedTouches[0].clientX;
            stopAutoSlide();
        },
        {
            passive: true
        }
    );

    slider.addEventListener(
        "touchend",
        event => {
            const touchEndX = event.changedTouches[0].clientX;
            const swipeDistance = touchStartX - touchEndX;

            if (Math.abs(swipeDistance) >= 50) {
                if (swipeDistance > 0) {
                    goToNextPage();
                } else {
                    goToPreviousPage();
                }
            }

            startAutoSlide();
        },
        {
            passive: true
        }
    );

    window.addEventListener("resize", () => {
        const newItemsPerPage = getItemsPerPage();

        if (newItemsPerPage === itemsPerPage) {
            return;
        }

        itemsPerPage = newItemsPerPage;
        currentPage = 0;

        updateSlider();
        startAutoSlide();
    });

    updateSlider();
    startAutoSlide();
}

document.addEventListener(
    "componentsLoaded",
    initializeSpeakersSlider
);