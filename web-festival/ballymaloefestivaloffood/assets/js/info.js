const shuttleTimetableData = {
  friday: [
    {
      id: "fri-route-1-out",
      route: "Route 1:",
      destination: "Midleton to Ballymaloe",
      note: "*Stops in Cloyne, starts at the train station in Midleton",
      hours: ["4.45pm", "6.15pm", "8.45pm"]
    },
    {
      id: "fri-route-1-return",
      route: "Route 1:",
      destination: "Ballymaloe to Midleton",
      note: "*Stops in Cloyne, ends at the train station in Midleton",
      hours: ["5.40pm", "7.30pm", "10.30pm"]
    },
    {
      id: "fri-route-2-out",
      route: "Route 2:",
      destination: "Ballycotton Playground to Ballymaloe",
      note: "*Stops in Brodericks",
      hours: ["5.30pm", "7.15pm", "9.45pm"]
    },
    {
      id: "fri-route-2-return",
      route: "Route 2:",
      destination: "Ballymaloe to Ballycotton Playground",
      note: "*Stops in Brodericks",
      hours: ["6.10pm", "8.00pm", "10.00pm", "11.00pm"]
    }
  ],
  saturday: [
    {
      id: "sat-route-1-out",
      route: "Route 1:",
      destination: "Midleton to Ballymaloe",
      note: "*Stops in Cloyne, starts at the train station in Midleton",
      hours: ["9.30am", "11.00am", "12.30pm", "2.00pm", "4.00pm", "6.00pm", "8.00pm"]
    },
    {
      id: "sat-route-1-return",
      route: "Route 1:",
      destination: "Ballymaloe to Midleton",
      note: "*Stops in Cloyne, ends at the train station in Midleton",
      hours: ["10.15am", "11.45am", "1.15pm", "3.00pm", "5.00pm", "7.00pm", "9.30pm", "11.30pm"]
    },
    {
      id: "sat-route-2-out",
      route: "Route 2:",
      destination: "Ballycotton Playground to Ballymaloe",
      note: "*Stops in Brodericks",
      hours: ["9.45am", "11.30am", "1.30pm", "3.30pm", "5.30pm", "7.30pm", "9.30pm"]
    },
    {
      id: "sat-route-2-return",
      route: "Route 2:",
      destination: "Ballymaloe to Ballycotton Playground",
      note: "*Stops in Brodericks",
      hours: ["10.30am", "12.15pm", "2.15pm", "4.30pm", "6.30pm", "8.30pm", "10.30pm", "11.45pm"]
    }
  ],
  sunday: [
    {
      id: "sun-route-1-out",
      route: "Route 1:",
      destination: "Midleton to Ballymaloe",
      note: "*Stops in Cloyne, starts at the train station in Midleton",
      hours: ["9.30am", "11.00am", "12.30pm", "2.00pm", "4.00pm"]
    },
    {
      id: "sun-route-1-return",
      route: "Route 1:",
      destination: "Ballymaloe to Midleton",
      note: "*Stops in Cloyne, ends at the train station in Midleton",
      hours: ["10.15am", "11.45am", "1.15pm", "3.00pm", "5.00pm", "6.30pm"]
    },
    {
      id: "sun-route-2-out",
      route: "Route 2:",
      destination: "Ballycotton Playground to Ballymaloe",
      note: "*Stops in Brodericks",
      hours: ["9.45am", "11.30am", "1.30pm", "3.30pm"]
    },
    {
      id: "sun-route-2-return",
      route: "Route 2:",
      destination: "Ballymaloe to Ballycotton Playground",
      note: "*Stops in Brodericks",
      hours: ["10.30am", "12.15pm", "2.15pm", "4.30pm", "6.00pm"]
    }
  ]
};

function initializeGoodToKnowPage() {
  const routesContainer = document.getElementById("shuttle-routes-container");
  const tabs = document.querySelectorAll(".shuttle-tab");
  const dateHeading = document.querySelector("[data-shuttle-date]");

  if (!routesContainer || tabs.length === 0) {
    return;
  }

  let activeDay = "friday";

  const dates = {
    friday: "Friday 15th May 2026",
    saturday: "Saturday 16th May 2026",
    sunday: "Sunday 17th May 2026"
  };

  // Render Routes Function
  function renderRoutes() {
    routesContainer.innerHTML = "";
    const routes = shuttleTimetableData[activeDay] || [];

    if (dateHeading) {
      dateHeading.textContent = dates[activeDay];
    }

    routes.forEach((route) => {
      const routeCard = document.createElement("article");
      routeCard.className = "shuttle-card";

      // Keep each time and divider as an individual item so the hours can wrap naturally.
      const hoursMarkup = route.hours
        .flatMap((hour, index) => {
          const divider = index < route.hours.length - 1 ? [" <span>|</span> "] : [];
          return [`<span>${hour}</span>`, ...divider];
        })
        .join("");

      routeCard.innerHTML = `
        <div class="shuttle-card__content">
          <h3 class="shuttle-card__route">${route.route}</h3>
          <p class="shuttle-card__destination">
            ${route.destination}
          </p>
          <p class="shuttle-card__note">
            ${route.note}
          </p>
        </div>
        <div class="shuttle-card__hours">
          ${hoursMarkup}
        </div>
      `;

      routesContainer.appendChild(routeCard);
    });
  }

  // Event Listeners for tabs
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Clear active states
      tabs.forEach((t) => {
        t.classList.remove("shuttle-tab--active");
        t.setAttribute("aria-selected", "false");
      });

      // Set current tab active
      tab.classList.add("shuttle-tab--active");
      tab.setAttribute("aria-selected", "true");

      activeDay = tab.dataset.day;
      renderRoutes();
    });
  });

  // Keyboard navigation for Tabs (Arrow keys)
  const tabList = document.querySelector(".shuttle-tabs");
  if (tabList) {
    tabList.addEventListener("keydown", (e) => {
      const tabArray = Array.from(tabs);
      let index = tabArray.indexOf(document.activeElement);
      if (index === -1) return;

      if (e.key === "ArrowRight") {
        index = (index + 1) % tabArray.length;
        tabArray[index].focus();
        tabArray[index].click();
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        index = (index - 1 + tabArray.length) % tabArray.length;
        tabArray[index].focus();
        tabArray[index].click();
        e.preventDefault();
      }
    });
  }

  // Initial load
  renderRoutes();
}

document.addEventListener("componentsLoaded", initializeGoodToKnowPage);
