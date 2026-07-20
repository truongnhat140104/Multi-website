function initializeAboutNavigation() {
    if (document.documentElement.dataset.aboutNavInitialized === "true") {
        return;
    }

    const links = [
        ...document.querySelectorAll(
            ".about-content__nav-link[href^='#']"
        )
    ];

    const sections = links
        .map(link => {
            const selector = link.getAttribute("href");

            return selector
                ? document.querySelector(selector)
                : null;
        })
        .filter(Boolean);

    if (!links.length || !sections.length) {
        return;
    }

    document.documentElement.dataset.aboutNavInitialized = "true";

    links.forEach(link => {
        link.addEventListener("click", event => {
            const selector = link.getAttribute("href");
            const section = document.querySelector(selector);

            if (!section) {
                return;
            }

            event.preventDefault();

            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }

                links.forEach(link => {
                    link.classList.toggle(
                        "is-active",
                        link.getAttribute("href")
                            === `#${entry.target.id}`
                    );
                });
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px",
            threshold: 0
        }
    );

    sections.forEach(section => {
        observer.observe(section);
    });
}

document.addEventListener(
    "aboutPageLoaded",
    initializeAboutNavigation
);
