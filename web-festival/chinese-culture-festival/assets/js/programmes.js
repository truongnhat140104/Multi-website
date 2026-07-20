document.addEventListener("DOMContentLoaded", () => {
  function initProgrammes() {
    console.log("Programmes script loaded.");
  }

  document.addEventListener("componentsLoaded", initProgrammes);
  initProgrammes();
});
