const recentProgrammeData = [
    {
        id: 1,
        month: "07",
        day: 1,
        weekday: "WED",
        category: "Others",
        categoryClass: "others",
        title:
            "The Hong Kong Jockey Club Series: Prosperity and Magnificence",
        image:
            "./assets/images/home/programmes/programme-01.webp",
        href: "#"
    },
    {
        id: 2,
        month: "07",
        day: 2,
        weekday: "THU",
        category: "Chinese Opera",
        categoryClass: "opera",
        title:
            "The Virtual Realm of Kingdom of Huai’an",
        image:
            "./assets/images/home/programmes/programme-02.webp",
        href: "#"
    },
    {
        id: 3,
        month: "07",
        day: 3,
        weekday: "FRI",
        category: "Others",
        categoryClass: "others",
        title:
            "Exhibition Corner, Yuen Long Theatre",
        image:
            "./assets/images/home/programmes/programme-03.webp",
        href: "#"
    },
    {
        id: 4,
        month: "07",
        day: 4,
        weekday: "SAT",
        category: "Others",
        categoryClass: "others",
        title:
            "Hong Kong Central Library Programme",
        image:
            "./assets/images/home/programmes/programme-04.webp",
        href: "#"
    },
    {
        id: 5,
        month: "07",
        day: 4,
        weekday: "SAT",
        category: "Chinese Opera",
        categoryClass: "opera",
        title:
            "Luoyang Yu Opera Troupe Special Performance",
        image:
            "./assets/images/home/programmes/programme-05.webp",
        href: "#"
    },
    {
        id: 6,
        month: "08",
        day: 1,
        weekday: "SAT",
        category: "Chinese Opera",
        categoryClass: "opera",
        title:
            "Grand Cantonese Opera Showcase",
        image:
            "./assets/images/home/programmes/programme-06.webp",
        href: "#"
    },
    {
        id: 7,
        month: "09",
        day: 15,
        weekday: "TUE",
        category: "Others",
        categoryClass: "others",
        title:
            "Mid-Autumn Festival Lantern Gala",
        image:
            "./assets/images/home/programmes/programme-07.webp",
        href: "#"
    }
];

function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function initializeRecentProgrammes() {
    if (
        document.documentElement.dataset.programmesInitialized === "true"
    ) {
        return;
    }

    const section = document.querySelector("#recent-programmes");
    if (!section) return;

    document.documentElement.dataset.programmesInitialized = "true";

    const monthSelect = section.querySelector("[data-programme-month]");
    const calendarTrack = section.querySelector("[data-calendar-track]");
    const calendarViewport = section.querySelector("[data-calendar-viewport]");
    const calendarPrev = section.querySelector("[data-calendar-prev]");
    const calendarNext = section.querySelector("[data-calendar-next]");

    const programmeTrack = section.querySelector("[data-programme-track]");
    const programmeViewport = section.querySelector("[data-programme-viewport]");
    const programmePrev = section.querySelector("[data-programme-prev]");
    const programmeNext = section.querySelector("[data-programme-next]");

    const emptyMessage = section.querySelector("[data-programme-empty]");

    let selectedMonth = monthSelect ? monthSelect.value : "07";
    let selectedDay = 1;
    let calendarIndex = 0;
    let programmeIndex = 0;

    const daysInMonthMap = {
        "07": { count: 31, startDay: 3 }, // July 2026 starts on Wednesday
        "08": { count: 31, startDay: 6 }, // Aug 2026 starts on Saturday
        "09": { count: 30, startDay: 2 }  // Sep 2026 starts on Tuesday
    };

    const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    function getMonthDates(monthKey) {
        const info = daysInMonthMap[monthKey] || { count: 30, startDay: 0 };
        const dates = [];
        for (let i = 1; i <= info.count; i++) {
            const dayOfWeek = weekdays[(info.startDay + i - 1) % 7];
            dates.push({ day: i, weekday: dayOfWeek });
        }
        return dates;
    }

    function renderCalendar() {
        if (!calendarTrack) return;
        const dates = getMonthDates(selectedMonth);
        calendarIndex = 0;
        calendarTrack.style.transform = `translateX(0px)`;

        calendarTrack.innerHTML = dates.map(d => {
            const isActive = d.day === selectedDay ? "is-active" : "";
            return `
                <button
                    class="programme-calendar__day ${isActive}"
                    type="button"
                    data-day="${d.day}"
                >
                    <span class="programme-calendar__day-number">${d.day}</span>
                    <span class="programme-calendar__day-week">${d.weekday}</span>
                </button>
            `;
        }).join("");

        updateCalendarArrows();
    }

    function renderCards() {
        if (!programmeTrack) return;
        programmeIndex = 0;
        programmeTrack.style.transform = `translateX(0px)`;

        const filtered = recentProgrammeData.filter(
            item => item.month === selectedMonth && item.day === selectedDay
        );

        if (filtered.length === 0) {
            programmeTrack.innerHTML = "";
            if (emptyMessage) emptyMessage.hidden = false;
            updateProgrammeArrows(0);
            return;
        }

        if (emptyMessage) emptyMessage.hidden = true;

        programmeTrack.innerHTML = filtered.map(item => `
            <article class="programme-card">
                <a class="programme-card__media" href="${escapeHtml(item.href)}">
                    <img
                        src="${escapeHtml(item.image)}"
                        alt="${escapeHtml(item.title)}"
                        loading="lazy"
                        onerror="this.style.display='none';"
                    >
                </a>
                <div class="programme-card__body">
                    <span class="programme-card__category programme-card__category--${escapeHtml(item.categoryClass)}">
                        ${escapeHtml(item.category)}
                    </span>
                    <h3 class="programme-card__title">
                        ${escapeHtml(item.title)}
                    </h3>
                    <a class="programme-card__link" href="${escapeHtml(item.href)}">
                        View programme <span aria-hidden="true">→</span>
                    </a>
                </div>
            </article>
        `).join("");

        updateProgrammeArrows(filtered.length);
    }

    function updateCalendarArrows() {
        if (!calendarTrack || !calendarViewport) return;
        const dayWidth = 67; // 58px + 9px gap
        const maxScroll = Math.max(0, calendarTrack.scrollWidth - calendarViewport.clientWidth);
        const currentScroll = calendarIndex * dayWidth;

        if (calendarPrev) calendarPrev.disabled = currentScroll <= 0;
        if (calendarNext) calendarNext.disabled = currentScroll >= maxScroll;
    }

    function updateProgrammeArrows(cardCount) {
        if (!programmeTrack || !programmeViewport) return;
        const visibleCards = window.innerWidth <= 700 ? 1 : window.innerWidth <= 1024 ? 2 : 4;
        const maxIndex = Math.max(0, cardCount - visibleCards);

        if (programmePrev) programmePrev.disabled = programmeIndex <= 0;
        if (programmeNext) programmeNext.disabled = programmeIndex >= maxIndex;
    }

    // Month Select Listener
    if (monthSelect) {
        monthSelect.addEventListener("change", (e) => {
            selectedMonth = e.target.value;
            selectedDay = 1;
            renderCalendar();
            renderCards();
        });
    }

    // Date Click Listener
    if (calendarTrack) {
        calendarTrack.addEventListener("click", (e) => {
            const btn = e.target.closest("[data-day]");
            if (!btn) return;

            const dayVal = parseInt(btn.dataset.day, 10);
            if (dayVal === selectedDay) return;

            selectedDay = dayVal;

            calendarTrack.querySelectorAll(".programme-calendar__day").forEach(b => {
                b.classList.toggle("is-active", parseInt(b.dataset.day, 10) === selectedDay);
            });

            renderCards();
        });
    }

    // Calendar Slider Arrows
    if (calendarPrev) {
        calendarPrev.addEventListener("click", () => {
            if (calendarIndex > 0) {
                calendarIndex = Math.max(0, calendarIndex - 3);
                const dayWidth = 67;
                calendarTrack.style.transform = `translateX(-${calendarIndex * dayWidth}px)`;
                updateCalendarArrows();
            }
        });
    }

    if (calendarNext) {
        calendarNext.addEventListener("click", () => {
            const dayWidth = 67;
            const maxScroll = Math.max(0, calendarTrack.scrollWidth - calendarViewport.clientWidth);
            const currentScroll = (calendarIndex + 3) * dayWidth;
            if (currentScroll <= maxScroll + dayWidth) {
                calendarIndex += 3;
                calendarTrack.style.transform = `translateX(-${Math.min(calendarIndex * dayWidth, maxScroll)}px)`;
                updateCalendarArrows();
            }
        });
    }

    // Programme Cards Slider Arrows
    if (programmePrev) {
        programmePrev.addEventListener("click", () => {
            if (programmeIndex > 0) {
                programmeIndex--;
                const cardWidth = programmeTrack.children[0] ? programmeTrack.children[0].offsetWidth + 24 : 0;
                programmeTrack.style.transform = `translateX(-${programmeIndex * cardWidth}px)`;
                const filtered = recentProgrammeData.filter(item => item.month === selectedMonth && item.day === selectedDay);
                updateProgrammeArrows(filtered.length);
            }
        });
    }

    if (programmeNext) {
        programmeNext.addEventListener("click", () => {
            const filtered = recentProgrammeData.filter(item => item.month === selectedMonth && item.day === selectedDay);
            const visibleCards = window.innerWidth <= 700 ? 1 : window.innerWidth <= 1024 ? 2 : 4;
            const maxIndex = Math.max(0, filtered.length - visibleCards);

            if (programmeIndex < maxIndex) {
                programmeIndex++;
                const cardWidth = programmeTrack.children[0] ? programmeTrack.children[0].offsetWidth + 24 : 0;
                programmeTrack.style.transform = `translateX(-${programmeIndex * cardWidth}px)`;
                updateProgrammeArrows(filtered.length);
            }
        });
    }

    window.addEventListener("resize", () => {
        const filtered = recentProgrammeData.filter(item => item.month === selectedMonth && item.day === selectedDay);
        updateCalendarArrows();
        updateProgrammeArrows(filtered.length);
    });

    renderCalendar();
    renderCards();
}

document.addEventListener("homePageLoaded", initializeRecentProgrammes);
