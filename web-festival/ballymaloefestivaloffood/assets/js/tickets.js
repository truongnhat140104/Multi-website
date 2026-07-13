function initializeTicketsPage() {
  const accordion = document.querySelector("[data-accordion]");

  if (!accordion) {
    return;
  }

  const items = accordion.querySelectorAll(".accordion__item");

  items.forEach((item) => {
    const trigger = item.querySelector(".accordion__trigger");
    const content = item.querySelector(".accordion__content");
    const icon = item.querySelector(".accordion__icon");

    if (!trigger || !content) {
      return;
    }

    trigger.addEventListener("click", () => {
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";

      // 1. Close all other items (only one open at a time)
      items.forEach((otherItem) => {
        const otherTrigger = otherItem.querySelector(".accordion__trigger");
        const otherContent = otherItem.querySelector(".accordion__content");
        const otherIcon = otherItem.querySelector(".accordion__icon");

        if (otherTrigger && otherContent && otherItem !== item) {
          otherTrigger.setAttribute("aria-expanded", "false");
          otherContent.style.maxHeight = "0px";
          if (otherIcon) {
            otherIcon.textContent = "+";
          }
        }
      });

      // 2. Toggle current item
      if (isExpanded) {
        trigger.setAttribute("aria-expanded", "false");
        content.style.maxHeight = "0px";
        if (icon) {
          icon.textContent = "+";
        }
      } else {
        trigger.setAttribute("aria-expanded", "true");
        // Set max-height to scrollHeight to animate correctly
        content.style.maxHeight = `${content.scrollHeight}px`;
        if (icon) {
          icon.textContent = "−";
        }
      }
    });

    // Handle keyboard navigation inside accordion
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        trigger.click();
      }
    });
  });

  // Adjust open accordion item max-height on window resize
  window.addEventListener("resize", () => {
    items.forEach((item) => {
      const trigger = item.querySelector(".accordion__trigger");
      const content = item.querySelector(".accordion__content");

      if (trigger && content && trigger.getAttribute("aria-expanded") === "true") {
        content.style.maxHeight = `${content.scrollHeight}px`;
      }
    });
  });
}

document.addEventListener("componentsLoaded", initializeTicketsPage);
