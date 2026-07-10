/* ==========================================================================
   THEME LOGIC: EDITORIAL LUXURY (MarketingPort)
   ========================================================================== */

const EditorialTheme = {
    init() {
        console.log("Editorial Luxury System Initialized...");
        this.initHeaderScroll();
        this.initScrollAnimations();
        this.initSmoothScroll();
    },

    // 1. Hiệu ứng Header thu nhỏ khi cuộn
    initHeaderScroll() {
        const header = document.querySelector('.lp-header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    },

    // 2. Hiệu ứng xuất hiện dần cho các Section (Fade-in)
    initScrollAnimations() {
        const observerOptions = { threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            section.classList.add('reveal-item');
            observer.observe(section);
        });
    },

    // 3. Smooth Scroll cho các link menu
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }
};

// Khởi chạy hệ thống
document.addEventListener('DOMContentLoaded', () => EditorialTheme.init());