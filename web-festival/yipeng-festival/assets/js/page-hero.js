document.addEventListener("DOMContentLoaded", () => {
  const heroes = document.querySelectorAll("[data-page-hero]");

  heroes.forEach((mount) => {
    const title = mount.dataset.title || "";
    const subtitle = mount.dataset.subtitle || "";
    const eyebrow = mount.dataset.eyebrow || "CHIANG MAI · THAILAND";
    const background = mount.dataset.background || "";
    const activeMenu = mount.dataset.activeMenu || "";
    const breadcrumb = mount.dataset.breadcrumb || title;

    mount.innerHTML = `
      <div class="page-hero__media">
        <img
          class="page-hero__image"
          src="${background}"
          alt="${title}"
        >
      </div>

      <div class="page-hero__overlay"></div>

      <div class="page-hero__container">
        <div class="page-hero__content">
          ${
            eyebrow
              ? `<p class="page-hero__eyebrow">${eyebrow}</p>`
              : ""
          }

          <h1 class="page-hero__title">${title}</h1>

          ${
            subtitle
              ? `<p class="page-hero__subtitle">${subtitle}</p>`
              : ""
          }

          <nav
            class="page-hero__breadcrumb"
            aria-label="Breadcrumb"
          >
            <a href="../index.html">Trang chủ</a>
            <span aria-hidden="true">/</span>
            <span class="page-hero__breadcrumb-current">
              ${breadcrumb}
            </span>
          </nav>
        </div>
      </div>
    `;

    const image = mount.querySelector(".page-hero__image");

    if (image) {
      if (image.complete) {
        mount.classList.add("is-loaded");
      } else {
        image.addEventListener(
          "load",
          () => {
            mount.classList.add("is-loaded");
          },
          { once: true }
        );

        image.addEventListener(
          "error",
          () => {
            mount.classList.add("is-loaded");
          },
          { once: true }
        );
      }
    }

    if (activeMenu) {
      document
        .querySelectorAll("[data-nav-key]")
        .forEach((link) => {
          link.classList.toggle(
            "is-active",
            link.dataset.navKey === activeMenu
          );
        });
    }
  });
});
