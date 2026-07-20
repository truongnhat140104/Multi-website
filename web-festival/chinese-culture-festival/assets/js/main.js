document.addEventListener("DOMContentLoaded", () => {
  function initApp() {
    console.log("Chinese Culture Festival App initialized.");
  }

  document.addEventListener("componentsLoaded", initApp);
  initApp();
});

document.addEventListener(
  "error",
  event => {
    const image = event.target;

    if (
      image instanceof HTMLImageElement &&
      image.closest(".site-footer__partner")
    ) {
      image.style.visibility = "hidden";
    }
  },
  true
);
