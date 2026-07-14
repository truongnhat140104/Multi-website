(function () {
    'use strict';

    const pageScriptPaths = [
        '../assets/js/vendor/jquery.js',
        '../assets/js/vendor/jquery-ui.min.js',
        '../assets/js/vendor/waypoints.min.js',
        '../assets/js/plugins/odometer.js',
        '../assets/js/vendor/appear.js',
        '../assets/js/vendor/jquery-one-page-nav.js',
        '../assets/js/plugins/swiper.js',
        '../assets/js/plugins/gsap.js',
        '../assets/js/plugins/splittext.js',
        '../assets/js/plugins/scrolltigger.js',
        '../assets/js/plugins/scrolltoplugins.js',
        '../assets/js/plugins/smoothscroll.js',
        '../assets/js/vendor/bootstrap.min.js',
        '../assets/js/vendor/waw.js',
        '../assets/js/plugins/isotop.js',
        '../assets/js/plugins/animation.js',
        '../assets/js/plugins/contact.form.js',
        '../assets/js/vendor/backtop.js',
    ];

    async function loadComponents() {
        const targets = [...document.querySelectorAll('[data-component]')];

        await Promise.all(targets.map(async (target) => {
            const name = target.dataset.component;
            const response = await fetch(`components/${name}.html`);

            if (!response.ok) {
                throw new Error(`Cannot load component: ${name}`);
            }

            const template = document.createElement('template');
            template.innerHTML = await response.text();
            target.replaceWith(template.content);
        }));
    }

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = false;
            script.onload = resolve;
            script.onerror = () => {
                console.error(`Cannot load script: ${src}`);
                resolve();
            };
            document.body.appendChild(script);
        });
    }

    async function loadPageScripts() {
        const scripts = [...pageScriptPaths];

        if (document.getElementById('particles-js')) {
            scripts.push('../assets/js/vendor/particle.js');
        }

        scripts.push('../assets/js/plugins/text-type.js', '../assets/js/main.js');

        for (const src of scripts) {
            await loadScript(src);
        }
    }

    async function initializePage() {
        await loadComponents();

        document.querySelectorAll('[data-current-year]').forEach((target) => {
            target.textContent = new Date().getFullYear();
        });

        await loadPageScripts();
    }

    window.componentsReady = initializePage();
    window.componentsReady.catch((error) => {
        console.error('Could not initialize page components.', error);
    });
})();
