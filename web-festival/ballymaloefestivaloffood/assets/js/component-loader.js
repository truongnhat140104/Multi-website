async function loadComponent(element) {
  const path = element.dataset.component;

  if (!path) {
    return;
  }

  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Không thể tải component: ${path}`);
    }

    let htmlText = await response.text();

    // Tự động sửa lại link nếu trang đang hiển thị nằm trong thư mục pages/ và không có thẻ base
    const hasBaseTag = !!document.querySelector("base");
    const isSubpage = !hasBaseTag && (window.location.pathname.includes('/pages/') ||
      window.location.pathname.split('/').includes('pages'));

    if (isSubpage) {
      // 1. Chuyển hướng các link quay về trang chủ (index.html)
      htmlText = htmlText.replace(/(href|src)="(\.\/)?index\.html"/g, '$1="../index.html"');

      // 2. Chuyển hướng các trang con khác đang nằm cùng thư mục pages/
      htmlText = htmlText.replace(/href="(\.\/)?pages\//g, 'href="./');

      // 3. Sửa lại các đường dẫn assets (css, js, images) đi ngược ra ngoài 1 cấp
      htmlText = htmlText.replace(/(href|src)="(\.\/)?assets\//g, '$1="../assets/');
    }

    element.outerHTML = htmlText;
  } catch (error) {
    console.error(error);
    element.innerHTML = `
      <p style="padding:16px;background:#fee;color:#900">
        ${error.message}
      </p>
    `;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const componentElements = document.querySelectorAll("[data-component]");

  await Promise.all(
    [...componentElements].map(loadComponent)
  );

  document.dispatchEvent(new CustomEvent("componentsLoaded"));
});
