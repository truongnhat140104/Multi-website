// Lineup & Schedule Data
const scheduleData = {
  friday: [
    {
      id: "fri-1",
      time: "2.00pm",
      title: "Opening Ceremony & Welcome Drinks",
      area: "Garden Marquee",
      type: "Talk & Taste",
      image: "assets/images/lineup/cookery-school-workshop.avif",
      href: "#"
    },
    {
      id: "fri-2",
      time: "4.30pm",
      title: "Sustainable Foraging Walk & Identification",
      area: "Walks and Talks",
      type: "Walk and Talk",
      image: "assets/images/lineup/house-history-tour.avif",
      href: "#"
    },
    {
      id: "fri-3",
      time: "7.00pm",
      title: "Friday Sunset Sessions: Live Jazz & Bites",
      area: "Garden Marquee",
      type: "Music",
      image: "assets/images/lineup/duck-street-band.avif",
      href: "#"
    }
  ],
  saturday: [
    {
      id: "sat-1",
      time: "10.00am",
      title: "Ballymaloe Cookery School Workshop",
      area: "Ballymaloe Cookery School Marquee",
      type: "Workshops & Masterclasses",
      image: "assets/images/lineup/cookery-school-workshop.avif",
      href: "#"
    },
    {
      id: "sat-2",
      time: "11.15am",
      title: "In conversation with Cúan Greene - Omos",
      area: "Cook the Books",
      type: "In Conversation",
      image: "assets/images/lineup/cuan-greene.avif",
      href: "#"
    },
    {
      id: "sat-3",
      time: "12.00pm",
      title: "Ballymaloe Cookery School Tour",
      area: "Ballymaloe Cookery School",
      type: "Garden Tour",
      image: "assets/images/lineup/cookery-school-tour.avif",
      href: "#"
    },
    {
      id: "sat-4",
      time: "1.00pm",
      title: "Shane Smith Cooking Demonstration",
      area: "Kerrygold Main Stage",
      type: "Cooking Demos",
      image: "assets/images/lineup/shane-smith.avif",
      href: "#"
    },
    {
      id: "sat-5",
      time: "2.15pm",
      title: "Kids Food Revolution - Back to The Future",
      area: "Cool Food School",
      type: "Workshops & Masterclasses",
      image: "assets/images/lineup/kids-food-revolution.avif",
      href: "#"
    },
    {
      id: "sat-6",
      time: "3.30pm",
      title: "Ballymaloe House History Tours",
      area: "Walks and Talks",
      type: "Walk and Talk",
      image: "assets/images/lineup/house-history-tour.avif",
      href: "#"
    },
    {
      id: "sat-7",
      time: "4.45pm",
      title: "Bean & Goose Hot Chocolate Masterclass",
      area: "Carrigaun Room Workshops",
      type: "Workshops & Masterclasses",
      image: "assets/images/lineup/hot-chocolate-masterclass.avif",
      href: "#"
    },
    {
      id: "sat-8",
      time: "5.30pm",
      title: "Thomasina Miers - Book Signing",
      area: "Festival Book Shop",
      type: "Book Signing",
      image: "assets/images/lineup/book-signing.avif",
      href: "#"
    },
    {
      id: "sat-9",
      time: "6.15pm",
      title: "Fat Badgers Beth & George - Cookery Demonstration",
      area: "The Woodshed Kitchen - Pop-up Dining",
      type: "Cooking Demos",
      image: "assets/images/lineup/fat-badgers.avif",
      href: "#"
    },
    {
      id: "sat-10",
      time: "8.00pm",
      title: "Duck Street Jam Band",
      area: "Garden Marquee",
      type: "Music",
      image: "assets/images/lineup/duck-street-band.avif",
      href: "#"
    },
    {
      id: "sat-11",
      time: "9.30pm",
      title: "DJ Luke & Ted",
      area: "Garden Marquee",
      type: "Music",
      image: "assets/images/lineup/dj-luke-ted.avif",
      href: "#"
    }
  ],
  sunday: [
    {
      id: "sun-1",
      time: "10.30am",
      title: "Morning Yoga & Fresh Cold-Pressed Juice",
      area: "Carrigaun Room Workshops",
      type: "Talk & Taste",
      image: "assets/images/lineup/house-history-tour.avif",
      href: "#"
    },
    {
      id: "sun-2",
      time: "12.30pm",
      title: "Regenerative Farming: Farm-to-Fork Discussion",
      area: "Change We Must",
      type: "Panel Discussion",
      image: "assets/images/lineup/cookery-school-workshop.avif",
      href: "#"
    },
    {
      id: "sun-3",
      time: "3.00pm",
      title: "Sunday Afternoon Family Acoustic Session",
      area: "Garden Marquee",
      type: "Music",
      image: "assets/images/lineup/duck-street-band.avif",
      href: "#"
    }
  ]
};

const dayTitles = {
  friday: "Friday 15th May 2026",
  saturday: "Saturday 16th May 2026",
  sunday: "Sunday 17th May 2026"
};

function initializeLineupPage() {
  const eventsContainer = document.getElementById("schedule-events-container");
  const dayTitleEl = document.getElementById("schedule-day-title");
  
  if (!eventsContainer) {
    return;
  }

  // Active States
  let activeDay = "friday";
  let activeAreaFilter = null;
  let activeTypeFilter = null;
  let searchQuery = "";

  // Elements
  const tabs = document.querySelectorAll(".schedule-tab");
  const searchInput = document.getElementById("event-search");
  const areaFilterGroup = document.getElementById("area-filters");
  const typeFilterGroup = document.getElementById("event-type-filters");

  // Type Color Mapping for visual badges inside card rendering
  const typeClasses = {
    "Drinks Theatre Demo": "filter-badge--blue",
    "Talk & Taste": "filter-badge--purple",
    "Panel Discussion": "filter-badge--orange",
    "Music": "filter-badge--green",
    "Garden Tour": "filter-badge--redbrown",
    "Book Signing": "filter-badge--olive",
    "Walk and Talk": "filter-badge--bluegray",
    "Dining Experience": "filter-badge--purple",
    "In Conversation": "filter-badge--orange",
    "Cooking Demos": "filter-badge--green",
    "Workshops & Masterclasses": "filter-badge--blue"
  };

  // Render Function
  function renderEvents() {
    // Filter logic
    const dayEvents = scheduleData[activeDay] || [];
    
    const filteredEvents = dayEvents.filter(event => {
      // 1. Search Query Match
      const matchesSearch = searchQuery === "" || 
        event.title.toLowerCase().includes(searchQuery) ||
        event.area.toLowerCase().includes(searchQuery) ||
        event.type.toLowerCase().includes(searchQuery);

      // 2. Area Filter Match
      const matchesArea = !activeAreaFilter || event.area === activeAreaFilter;

      // 3. Event Type Filter Match
      const matchesType = !activeTypeFilter || event.type === activeTypeFilter;

      return matchesSearch && matchesArea && matchesType;
    });

    // Clean container
    eventsContainer.innerHTML = "";

    if (filteredEvents.length === 0) {
      // Empty State Rendering
      const emptyState = document.createElement("div");
      emptyState.className = "schedule-empty";
      emptyState.innerHTML = `
        <div class="schedule-empty__icon">🔍</div>
        <p class="schedule-empty__text">No events found matching your current filters.</p>
        <button class="schedule-empty__reset-btn" type="button">Reset Filters</button>
      `;
      eventsContainer.appendChild(emptyState);
      
      // Connect reset button
      emptyState.querySelector(".schedule-empty__reset-btn").addEventListener("click", resetAllFilters);
      return;
    }

    // Render Event Rows
    filteredEvents.forEach(event => {
      const eventRow = document.createElement("article");
      eventRow.className = "schedule-event";
      if (event.href && event.href !== "#") {
        eventRow.classList.add("schedule-event--linkable");
      }

      const badgeClass = typeClasses[event.type] || "filter-badge--bluegray";

      eventRow.innerHTML = `
        <div class="schedule-event__time">${event.time}</div>
        <div class="schedule-event__media">
            <img class="schedule-event__image" src="${event.image}" alt="${event.title}" loading="lazy">
        </div>
        <div class="schedule-event__content">
            <span class="schedule-event__badge ${badgeClass}">${event.type}</span>
            <h3 class="schedule-event__title-text">${event.title}</h3>
            <p class="schedule-event__area-text">
                Area: <span>${event.area}</span>
            </p>
        </div>
      `;

      if (event.href && event.href !== "#") {
        eventRow.addEventListener("click", () => {
          window.location.href = event.href;
        });
      }

      eventsContainer.appendChild(eventRow);
    });
  }

  // Day Tab Handler
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => {
        t.classList.remove("schedule-tab--active");
        t.setAttribute("aria-selected", "false");
      });

      tab.classList.add("schedule-tab--active");
      tab.setAttribute("aria-selected", "true");
      
      activeDay = tab.dataset.day;
      dayTitleEl.textContent = dayTitles[activeDay];
      
      // Re-render
      renderEvents();
    });
  });

  // Keyboard navigation for Tabs (Arrow keys)
  const tabList = document.querySelector(".schedule-tabs");
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

  // Search Live Filtering
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderEvents();
    });
  }

  // Area Pill Filter Handler
  if (areaFilterGroup) {
    areaFilterGroup.addEventListener("click", (e) => {
      const button = e.target.closest(".filter-pill");
      if (!button) return;

      const area = button.dataset.area;
      const isCurrentlyActive = button.classList.contains("filter-pill--active");

      // Reset all pills active states
      areaFilterGroup.querySelectorAll(".filter-pill").forEach(btn => {
        btn.classList.remove("filter-pill--active");
        btn.setAttribute("aria-pressed", "false");
      });

      if (isCurrentlyActive) {
        activeAreaFilter = null;
      } else {
        button.classList.add("filter-pill--active");
        button.setAttribute("aria-pressed", "true");
        activeAreaFilter = area;
      }

      renderEvents();
    });
  }

  // Event Type Filter Handler
  if (typeFilterGroup) {
    typeFilterGroup.addEventListener("click", (e) => {
      const button = e.target.closest(".filter-badge");
      if (!button) return;

      const type = button.dataset.type;
      const isCurrentlyActive = button.classList.contains("filter-badge--active");

      // Reset all type badge states
      typeFilterGroup.querySelectorAll(".filter-badge").forEach(btn => {
        btn.classList.remove("filter-badge--active");
        btn.setAttribute("aria-pressed", "false");
      });

      if (isCurrentlyActive) {
        activeTypeFilter = null;
      } else {
        button.classList.add("filter-badge--active");
        button.setAttribute("aria-pressed", "true");
        activeTypeFilter = type;
      }

      renderEvents();
    });
  }

  // Reset Filters Helper
  function resetAllFilters() {
    searchQuery = "";
    activeAreaFilter = null;
    activeTypeFilter = null;

    if (searchInput) {
      searchInput.value = "";
    }

    if (areaFilterGroup) {
      areaFilterGroup.querySelectorAll(".filter-pill").forEach(btn => {
        btn.classList.remove("filter-pill--active");
        btn.setAttribute("aria-pressed", "false");
      });
    }

    if (typeFilterGroup) {
      typeFilterGroup.querySelectorAll(".filter-badge").forEach(btn => {
        btn.classList.remove("filter-badge--active");
        btn.setAttribute("aria-pressed", "false");
      });
    }

    renderEvents();
  }

  // Initial load
  dayTitleEl.textContent = dayTitles[activeDay];
  renderEvents();
}

document.addEventListener("componentsLoaded", initializeLineupPage);
