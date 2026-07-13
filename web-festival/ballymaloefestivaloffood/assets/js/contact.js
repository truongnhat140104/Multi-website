function initializeContactPage() {
  initializeContactForm();
  initializeTravelTabs();
}

function initializeContactForm() {
  const form = document.querySelector(".contact-form");

  if (!form) {
    return;
  }

  const fields = {
    name: {
      input: form.querySelector("#contact-name"),
      error: form.querySelector("#contact-name-error"),
      message: "Please enter your name."
    },
    email: {
      input: form.querySelector("#contact-email"),
      error: form.querySelector("#contact-email-error"),
      message: "Please enter a valid email address."
    },
    phone: {
      input: form.querySelector("#contact-phone"),
      error: form.querySelector("#contact-phone-error"),
      message: "Please enter a valid phone number."
    },
    subject: {
      input: form.querySelector("#contact-subject"),
      error: form.querySelector("#contact-subject-error"),
      message: "Please enter a subject."
    },
    message: {
      input: form.querySelector("#contact-message"),
      error: form.querySelector("#contact-message-error"),
      message: "Please enter a message."
    }
  };

  const status = form.querySelector(".contact-form__status");

  function setFieldState(field, message) {
    if (!field.input || !field.error) {
      return;
    }

    const hasError = Boolean(message);
    field.input.setAttribute("aria-invalid", String(hasError));
    field.error.textContent = message || "";
  }

  function validateField(key) {
    const field = fields[key];
    const value = field.input ? field.input.value.trim() : "";
    let message = "";

    if (key === "name" && !value) {
      message = field.message;
    }

    if (key === "email" && (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) {
      message = field.message;
    }

    if (key === "phone" && value && !/^\+?[\d\s().-]{7,}$/.test(value)) {
      message = field.message;
    }

    if (key === "subject" && !value) {
      message = field.message;
    }

    if (key === "message" && !value) {
      message = field.message;
    }

    setFieldState(field, message);
    return !message;
  }

  Object.keys(fields).forEach(key => {
    const input = fields[key].input;

    if (input) {
      input.addEventListener("blur", () => validateField(key));
      input.addEventListener("input", () => {
        if (input.getAttribute("aria-invalid") === "true") {
          validateField(key);
        }
      });
    }
  });

  form.addEventListener("submit", event => {
    event.preventDefault();

    if (status) {
      status.textContent = "";
    }

    const isValid = Object.keys(fields).every(validateField);

    if (!isValid) {
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      firstInvalid?.focus();
      return;
    }

    if (status) {
      status.textContent = "Thank you! Your message has been received.";
    }

    form.reset();
    Object.values(fields).forEach(field => setFieldState(field, ""));
  });
}

function initializeTravelTabs() {
  const tabList = document.querySelector(".contact-travel__tabs");
  const tabs = Array.from(document.querySelectorAll("[data-travel-tab]"));
  const panels = Array.from(document.querySelectorAll("[data-travel-panel]"));

  if (!tabList || tabs.length === 0 || panels.length === 0) {
    return;
  }

  function activateTab(tab, shouldFocus = false) {
    const target = tab.dataset.travelTab;

    tabs.forEach(currentTab => {
      const isActive = currentTab === tab;
      currentTab.classList.toggle("contact-travel__tab--active", isActive);
      currentTab.setAttribute("aria-selected", String(isActive));
      currentTab.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    panels.forEach(panel => {
      panel.hidden = panel.dataset.travelPanel !== target;
    });

    if (shouldFocus) {
      tab.focus();
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => activateTab(tab));
  });

  tabList.addEventListener("keydown", event => {
    const currentIndex = tabs.indexOf(document.activeElement);

    if (currentIndex === -1 || !["ArrowLeft", "ArrowRight"].includes(event.key)) {
      return;
    }

    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
    event.preventDefault();
    activateTab(tabs[nextIndex], true);
  });
}

document.addEventListener("componentsLoaded", initializeContactPage);
