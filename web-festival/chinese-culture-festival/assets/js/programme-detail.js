function getSelectedProgrammeId() {
    const searchParams = new URLSearchParams(window.location.search);
    let id = searchParams.get("id");

    if (!id && window.location.hash.includes("id=")) {
        const hashMatch = window.location.hash.match(/id=([^&]+)/);
        if (hashMatch) {
            id = hashMatch[1];
        }
    }

    if (!id) {
        return "hebei-bangzi-opera";
    }

    return id;
}

function renderDetailSection(sec) {
    return `
        <section class="detail-section" id="${sec.id || ''}">
            <h2 class="detail-section__title">${sec.title}</h2>
            <div class="detail-section__body">
                ${sec.content}
            </div>
        </section>
        <hr class="detail-section-divider">
    `;
}

function initProgrammeDetailPage() {
    const id = getSelectedProgrammeId();
    let data = null;

    if (typeof PROGRAMME_DETAIL_DATA !== "undefined") {
        data = PROGRAMME_DETAIL_DATA[id] || PROGRAMME_DETAIL_DATA["hebei-bangzi-opera"];
    }

    const mainContent = document.querySelector("#page-content") || document.querySelector("#main-content");

    if (!data) {
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="programme-not-found" style="padding: 120px 20px; text-align: center;">
                    <h2 style="font-family: Georgia, serif; color: #57534f; margin-bottom: 16px;">Không tìm thấy thông tin chương trình</h2>
                    <p style="color: #777777; margin-bottom: 24px;">Rất tiếc, chương trình bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ bỏ.</p>
                    <a href="./index.html" style="display: inline-block; padding: 12px 28px; background: #008b4a; color: #ffffff; border-radius: 999px; text-decoration: none; font-weight: 600;">Quay lại Trang chủ</a>
                </div>
            `;
        }
        return;
    }

    // 1. Hero Image & Breadcrumb
    const heroImgEl = document.querySelector("[data-detail-hero-img]");
    if (heroImgEl && data.heroImage) {
        const imgTest = new Image();
        imgTest.onload = () => {
            heroImgEl.src = data.heroImage;
            heroImgEl.alt = data.title;
            heroImgEl.style.display = "block";
        };
        imgTest.onerror = () => {
            heroImgEl.style.display = "none";
        };
        imgTest.src = data.heroImage;
    } else if (heroImgEl) {
        heroImgEl.style.display = "none";
    }

    const genreNameEl = document.querySelector("[data-detail-genre-name]");
    if (genreNameEl) {
        genreNameEl.textContent = data.genre || "Chinese Opera";
    }

    const backLinkEl = document.querySelector("[data-detail-back-link]");
    if (backLinkEl && data.genreSlug) {
        backLinkEl.href = `?page=programme-genre&genre=${data.genreSlug}`;
    }

    // 2. Left Sidebar Info
    const dateEl = document.querySelector("[data-detail-date]");
    if (dateEl) dateEl.textContent = data.date || "";

    const timeEl = document.querySelector("[data-detail-time]");
    if (timeEl) timeEl.textContent = data.time || "";

    const venueEl = document.querySelector("[data-detail-venue]");
    if (venueEl) venueEl.textContent = data.venue || "";

    const priceEl = document.querySelector("[data-detail-price]");
    if (priceEl) priceEl.textContent = data.price || "";

    const moreLinkEl = document.querySelector("[data-detail-more-link]");
    if (moreLinkEl && data.detailsUrl) moreLinkEl.href = data.detailsUrl;

    const buyBtnEl = document.querySelector("[data-detail-buy-btn]");
    if (buyBtnEl && data.ticketUrl) buyBtnEl.href = data.ticketUrl;

    const noteEl = document.querySelector("[data-detail-note]");
    if (noteEl) noteEl.textContent = data.bookingNote || "";

    const leafletBtnEl = document.querySelector("[data-detail-leaflet-btn]");
    if (leafletBtnEl && data.leafletUrl) leafletBtnEl.href = data.leafletUrl;

    // 3. Right Column Main Article
    const titleEl = document.querySelector("[data-detail-title]");
    if (titleEl) titleEl.textContent = data.title || "";

    const introEl = document.querySelector("[data-detail-intro]");
    if (introEl) {
        introEl.innerHTML = `<p>${data.introduction || ''}</p>`;
    }

    const sectionsContainer = document.querySelector("#detail-sections-container");
    if (sectionsContainer && data.sections) {
        sectionsContainer.innerHTML = data.sections.map(renderDetailSection).join("");
    }
}

document.addEventListener("programmeDetailLoaded", initProgrammeDetailPage);
