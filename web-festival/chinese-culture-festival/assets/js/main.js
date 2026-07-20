document.addEventListener("DOMContentLoaded", () => {
  function initApp() {
    console.log("Chinese Culture Festival App initialized.");
  }

  document.addEventListener("componentsLoaded", initApp);
  initApp();
});
