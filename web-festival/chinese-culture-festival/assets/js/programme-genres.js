function getSelectedGenreKey() {
    const searchParams = new URLSearchParams(window.location.search);
    let key = searchParams.get("genre");

    if (!key && window.location.hash.includes("genre=")) {
        const hashMatch = window.location.hash.match(/genre=([^&]+)/);
        if (hashMatch) {
            key = hashMatch[1];
        }
    }

    if (!key || typeof PROGRAMME_GENRES_DATA === "undefined" || !PROGRAMME_GENRES_DATA[key]) {
        return "music";
    }

    return key;
}

function renderGenreCard(item) {
    const badgeHtml = item.status
        ? `<span class="genre-card__badge" data-status="${item.status}">${item.status}</span>`
        : "";

    return `
        <article class="genre-card">
            <div class="genre-card__image-wrap">
                <img src="${item.image}" alt="${item.title}" class="genre-card__image">
                ${badgeHtml}
            </div>

            <div class="genre-card__content">
                <div class="genre-card__date">${item.date}</div>

                <h3 class="genre-card__title">${item.title}</h3>

                <p class="genre-card__organizer">${item.organizer}</p>

                <p class="genre-card__venue">
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                    <span>${item.venue}</span>
                </p>

                <a href="./index.html?page=programme-detail&id=${item.id || 'hebei-bangzi-opera'}" class="genre-card__link">
                    View Details <i class="fa fa-arrow-right" aria-hidden="true"></i>
                </a>
            </div>
        </article>
    `;
}

function updateGenreHero(data) {
    const heroEl = document.querySelector(".genre-hero");
    if (!heroEl) return;

    const overlay = data.overlay || "linear-gradient(to right, rgba(20, 15, 15, 0.75) 0%, rgba(20, 15, 15, 0.35) 100%)";
    const bgPosition = data.heroPosition || "center center";

    heroEl.style.setProperty("--hero-overlay", overlay);
    heroEl.style.setProperty("--hero-bg-position", bgPosition);

    if (data.heroImage) {
        const imgTest = new Image();
        imgTest.onload = () => {
            heroEl.style.setProperty("--hero-bg-image", `url("${data.heroImage}")`);
            heroEl.style.backgroundImage = `${overlay}, url("${data.heroImage}")`;
            heroEl.style.backgroundPosition = bgPosition;
            heroEl.style.backgroundSize = "cover";
            heroEl.style.backgroundRepeat = "no-repeat";
        };
        imgTest.onerror = () => {
            const fallbackUrl = "./assets/images/about/about-background.png";
            heroEl.style.setProperty("--hero-bg-image", `url("${fallbackUrl}")`);
            heroEl.style.backgroundImage = `${overlay}, url("${fallbackUrl}")`;
            heroEl.style.backgroundPosition = bgPosition;
            heroEl.style.backgroundSize = "cover";
            heroEl.style.backgroundRepeat = "no-repeat";
        };
        imgTest.src = data.heroImage;
    } else {
        const fallbackUrl = "./assets/images/about/about-background.png";
        heroEl.style.setProperty("--hero-bg-image", `url("${fallbackUrl}")`);
        heroEl.style.backgroundImage = `${overlay}, url("${fallbackUrl}")`;
        heroEl.style.backgroundPosition = bgPosition;
        heroEl.style.backgroundSize = "cover";
        heroEl.style.backgroundRepeat = "no-repeat";
    }

    // Update Titles & Subtitles
    document.querySelectorAll("[data-genre-title]").forEach(el => {
        el.textContent = data.title;
    });

    const subtitleEl = document.querySelector("[data-genre-subtitle]");
    if (subtitleEl) {
        subtitleEl.textContent = data.description || data.subtitle;
    }
}

function initProgrammeGenrePage() {
    const genreKey = getSelectedGenreKey();
    const data = PROGRAMME_GENRES_DATA[genreKey] || PROGRAMME_GENRES_DATA["music"];

    if (!data) {
        return;
    }

    // 1. Update Hero Banner
    updateGenreHero(data);

    // 2. Highlight Active Tab
    document.querySelectorAll("[data-genre-tab]").forEach(tab => {
        const tabKey = tab.dataset.genreTab;
        tab.classList.toggle("is-active", tabKey === genreKey);
    });

    // 3. Render Cards
    const gridContainer = document.querySelector("#genre-programme-grid");
    const countEl = document.querySelector("[data-genre-count]");
    const emptyEl = document.querySelector("#genre-grid-empty");

    if (!gridContainer) {
        return;
    }

    let currentItems = [...data.items];

    function renderList(itemsToRender) {
        if (countEl) {
            countEl.textContent = itemsToRender.length;
        }

        if (itemsToRender.length === 0) {
            gridContainer.innerHTML = "";
            if (emptyEl) emptyEl.style.display = "block";
            return;
        }

        if (emptyEl) emptyEl.style.display = "none";
        gridContainer.innerHTML = itemsToRender.map(renderGenreCard).join("");
    }

    renderList(currentItems);

    // 4. Attach Live Search Filter
    const searchInput = document.querySelector("#genre-search-input");
    if (searchInput) {
        searchInput.value = "";
        searchInput.oninput = (e) => {
            const query = e.target.value.toLowerCase().trim();
            const filtered = data.items.filter(item =>
                item.title.toLowerCase().includes(query) ||
                item.organizer.toLowerCase().includes(query) ||
                item.venue.toLowerCase().includes(query) ||
                item.date.toLowerCase().includes(query)
            );
            renderList(filtered);
        };
    }
}

document.addEventListener("programmeGenreLoaded", initProgrammeGenrePage);
