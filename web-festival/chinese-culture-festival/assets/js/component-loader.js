async function loadComponent(element) {
  const path = element.dataset.component;
  if (!path) return;

  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load component: ${path}`);
    }

    let htmlText = await response.text();

    const hasBaseTag = !!document.querySelector("base");
    const isSubpage = !hasBaseTag && (window.location.pathname.includes('/pages/') ||
      window.location.pathname.split('/').includes('pages'));

    if (isSubpage) {
      htmlText = htmlText.replace(/(href|src)="(\.\/)?index\.html"/g, '$1="../index.html"');
      htmlText = htmlText.replace(/href="(\.\/)?pages\//g, 'href="./');
      htmlText = htmlText.replace(/(href|src)="(\.\/)?assets\//g, '$1="../assets/');
    }

    element.outerHTML = htmlText;
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const componentElements = document.querySelectorAll("[data-component]");
  await Promise.all([...componentElements].map(loadComponent));
  document.dispatchEvent(new CustomEvent("componentsLoaded"));
});
