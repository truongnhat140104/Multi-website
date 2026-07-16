/**
 * include.js
 * Loader đơn giản để nạp các file HTML component (partials) vào trang
 * và chỉ load các plugin script (jQuery, GSAP, Swiper...) SAU KHI
 * toàn bộ nội dung đã được chèn vào DOM (vì các plugin này cần các
 * phần tử HTML đã tồn tại để gắn animation/scroll-spy...).
 */

// 1. Nạp tất cả các phần tử có [data-component="..."]
async function includeComponents() {
    const nodes = document.querySelectorAll('[data-component]');

    await Promise.all(
        Array.from(nodes).map(async (node) => {
            const url = node.getAttribute('data-component');
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const html = await res.text();
                node.outerHTML = html;
            } catch (err) {
                console.error(`Không thể nạp component: ${url}`, err);
                node.innerHTML = `<!-- Lỗi khi nạp ${url} -->`;
            }
        })
    );
}

// 2. Nạp danh sách <script src="..."> theo đúng thứ tự tuần tự
//    (bắt buộc vì jQuery phải có trước các plugin dùng jQuery, v.v.)
function loadScriptSequentially(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Không thể tải script: ${src}`));
        document.body.appendChild(script);
    });
}

async function loadScriptsInOrder(sources) {
    for (const src of sources) {
        await loadScriptSequentially(src);
    }
}

// Danh sách script gốc, giữ nguyên thứ tự như file index.html cũ
const VENDOR_SCRIPTS = [
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
    '../assets/js/plugins/text-type.js',
    '../assets/js/main.js'
];

// 3. Chạy toàn bộ quy trình: nạp component -> nạp script
document.addEventListener('DOMContentLoaded', async () => {
    await includeComponents();
    await loadScriptsInOrder(VENDOR_SCRIPTS);
    document.dispatchEvent(new Event('components:ready'));
});