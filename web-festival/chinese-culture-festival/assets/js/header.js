// Global single closeSidebar function
function closeSidebar() {
    const sideMenu = document.querySelector("[data-side-menu]");
    const overlay = document.querySelector("[data-menu-overlay]");
    const openButton = document.querySelector("[data-menu-open]");

    if (sideMenu) {
        sideMenu.classList.remove("is-open");
        sideMenu.setAttribute("aria-hidden", "true");
        sideMenu.style.pointerEvents = "none";
    }
    if (overlay) {
        overlay.classList.remove("is-visible");
        overlay.classList.remove("is-active");
        overlay.setAttribute("aria-hidden", "true");
        overlay.style.pointerEvents = "none";
    }
    if (openButton) {
        openButton.setAttribute("aria-expanded", "false");
    }

    document.body.classList.remove("sidebar-open");
    document.body.classList.remove("menu-open");
    document.body.style.overflow = "";
}

function openSidebar() {
    const sideMenu = document.querySelector("[data-side-menu]");
    const overlay = document.querySelector("[data-menu-overlay]");
    const openButton = document.querySelector("[data-menu-open]");
    const closeButton = document.querySelector("[data-menu-close]");

    if (sideMenu) {
        sideMenu.classList.add("is-open");
        sideMenu.setAttribute("aria-hidden", "false");
        sideMenu.style.pointerEvents = "auto";
    }
    if (overlay) {
        overlay.classList.add("is-visible");
        overlay.classList.add("is-active");
        overlay.setAttribute("aria-hidden", "false");
        overlay.style.pointerEvents = "auto";
    }
    if (openButton) {
        openButton.setAttribute("aria-expanded", "true");
    }

    document.body.classList.add("sidebar-open");
    document.body.classList.add("menu-open");
    document.body.style.overflow = "hidden";

    if (closeButton) {
        window.setTimeout(() => {
            closeButton.focus();
        }, 100);
    }
}

// Global initialization using window.__sidebarInitialized to ensure it only runs once!
function initSidebarDelegation() {
    if (window.__sidebarInitialized) return;
    window.__sidebarInitialized = true;

    // Use event delegation on document level to ensure DOM replacement doesn't break events
    document.addEventListener("click", event => {
        const btnOpen = event.target.closest("[data-menu-open]");
        if (btnOpen) {
            event.preventDefault();
            openSidebar();
            return;
        }

        const btnClose = event.target.closest("[data-menu-close]");
        if (btnClose) {
            event.preventDefault();
            closeSidebar();
            return;
        }

        const overlay = event.target.closest("[data-menu-overlay]");
        if (overlay) {
            event.preventDefault();
            closeSidebar();
            return;
        }

        // Close sidebar if clicking menu links or other SPA routes
        const menuLink = event.target.closest(".side-menu__link, .side-menu__genres a, .side-menu__secondary-links a");
        if (menuLink) {
            const href = menuLink.getAttribute("href");
            // If it's a PDF link or external, do not call preventDefault or run router navigation
            if (
                menuLink.getAttribute("target") === "_blank" ||
                menuLink.classList.contains("sidebar__link--external") ||
                (href && href.toLowerCase().endsWith(".pdf"))
            ) {
                // Just close the sidebar, let browser open PDF naturally
                closeSidebar();
                return;
            }

            // Close the sidebar, then let SPA navigate
            closeSidebar();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            const sideMenu = document.querySelector("[data-side-menu]");
            if (sideMenu && sideMenu.classList.contains("is-open")) {
                closeSidebar();
            }
        }
    });
}

// Bind to DOM and load events to ensure immediate attachment
document.addEventListener("DOMContentLoaded", initSidebarDelegation);
document.addEventListener("componentsLoaded", initSidebarDelegation);
document.addEventListener("homePageLoaded", initSidebarDelegation);
