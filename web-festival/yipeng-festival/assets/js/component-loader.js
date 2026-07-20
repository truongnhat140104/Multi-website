async function loadComponent(element) {
  const path = element.dataset.component;

  if (!path) {
    return;
  }

  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Failed to load component: ${path}`);
    }

    let htmlText = await response.text();

    // Auto-fix paths if the page is in pages/ folder and base tag isn't present
    const hasBaseTag = !!document.querySelector("base");
    const isSubpage = !hasBaseTag && (window.location.pathname.includes('/pages/') ||
      window.location.pathname.split('/').includes('pages'));

    if (isSubpage) {
      // 1. Redirect links back to homepage
      htmlText = htmlText.replace(/(href|src)="(\.\/)?index\.html"/g, '$1="../index.html"');

      // 2. Redirect other pages in pages/
      htmlText = htmlText.replace(/href="(\.\/)?pages\//g, 'href="./');

      // 3. Fix paths to assets (css, js, images) going outward one folder level
      htmlText = htmlText.replace(/(href|src)="(\.\/)?assets\//g, '$1="../assets/');
    }

    element.outerHTML = htmlText;
  } catch (error) {
    console.error(error);
    element.innerHTML = `
      <div style="padding: 16px; background: rgba(255, 0, 0, 0.1); border: 1px solid rgba(255, 0, 0, 0.3); color: #ff6b6b; margin: 10px 0; border-radius: 4px;">
        ${error.message}
      </div>
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
