const newsItems = [
    {
        date: "2026-06-18",
        title: "Chinese Culture Festival 2026 Grand Opening",
        downloadUrl: "./assets/documents/news-article-placeholder.pdf"
    },
    {
        date: "2026-06-12",
        title: "Chinese Culture Festival 2026 opens today (with photos)",
        downloadUrl: "./assets/documents/news-article-placeholder.pdf"
    },
    {
        date: "2026-06-10",
        title: "Highlight Performances of Guangdong Chinese Orchestra and Lingnan Gala Show",
        downloadUrl: "./assets/documents/news-article-placeholder.pdf"
    },
    {
        date: "2026-06-08",
        title: "Master Performance of Xiqu Centre Grand Theatre Cantonese Opera",
        downloadUrl: "./assets/documents/news-article-placeholder.pdf"
    },
    {
        date: "2026-06-05",
        title: "Dunhuang Silk Road Dance Drama - Background Insight and Artistry Review",
        downloadUrl: "./assets/documents/news-article-placeholder.pdf"
    },
    {
        date: "2026-06-01",
        title: "Beijing People's Art Theatre Captivates Audiences with Classic Drama Teahouse",
        downloadUrl: "./assets/documents/news-article-placeholder.pdf"
    },
    {
        date: "2026-05-28",
        title: "Special Exhibition: Splendors of Traditional Craft Fair Foyer Highlights",
        downloadUrl: "./assets/documents/news-article-placeholder.pdf"
    },
    {
        date: "2026-05-25",
        title: "Peking Opera Face Painting Masterclass Registrations Open Now",
        downloadUrl: "./assets/documents/news-article-placeholder.pdf"
    },
    {
        date: "2026-05-20",
        title: "Special Arrangements Announcement: Weather Warnings and Programme Rescheduling Info",
        downloadUrl: "./assets/documents/news-article-placeholder.pdf"
    },
    {
        date: "2026-05-18",
        title: "Cross-Disciplinary Digital Art Blends Virtual Reality and Martial Arts Dynamics",
        downloadUrl: "./assets/documents/news-article-placeholder.pdf"
    },
    {
        date: "2026-05-15",
        title: "Venue Accessibility Guidelines: Assisted Listening Systems and Wheelchair Access Info",
        downloadUrl: "./assets/documents/news-article-placeholder.pdf"
    },
    {
        date: "2026-05-10",
        title: "Hong Kong Film Archive Classic Cinema Retrospective Screenings Revealed",
        downloadUrl: "./assets/documents/news-article-placeholder.pdf"
    },
    {
        date: "2026-05-05",
        title: "Chinese Culture Festival 2026 Official Platform and Ticket Booking Launched",
        downloadUrl: "./assets/documents/news-article-placeholder.pdf"
    },
    {
        date: "2026-05-01",
        title: "Artistic Dialogues: Meet the Artists Behind Dunhuang Reverie Production Team",
        downloadUrl: "./assets/documents/news-article-placeholder.pdf"
    }
];

const NEWS_PER_PAGE = 8;

function formatDateString(dateStr) {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = parseInt(parts[2], 10);
    const month = months[parseInt(parts[1], 10) - 1];
    const year = parts[0];
    return `${day} ${month} ${year}`;
}

function getInitialNewsPage() {
    const searchParams = new URLSearchParams(window.location.search);
    const pageVal = parseInt(searchParams.get("newsPage"), 10);

    const totalPages = Math.ceil(newsItems.length / NEWS_PER_PAGE);

    if (isNaN(pageVal) || pageVal < 1) return 1;
    if (pageVal > totalPages) return totalPages;
    return pageVal;
}

function renderNewsRow(item) {
    const formattedDate = formatDateString(item.date);

    return `
        <article class="news-row">
            <span class="news-row__date">${formattedDate}</span>
            <a class="news-row__title-link" href="${item.downloadUrl}" target="_blank" rel="noopener noreferrer">
                ${item.title}
            </a>
            <div class="news-row__download">
                <a class="news-row__download-link" href="${item.downloadUrl}" target="_blank" rel="noopener noreferrer" aria-label="Download PDF">
                    <i class="fa fa-download" aria-hidden="true"></i>
                </a>
            </div>
        </article>
    `;
}

function renderNewsPage(pageNumber) {
    const listContainer = document.querySelector("#news-list");
    const paginationContainer = document.querySelector("#news-pagination");

    if (!listContainer || !paginationContainer) {
        return;
    }

    const totalPages = Math.ceil(newsItems.length / NEWS_PER_PAGE);

    // Clamp pageNumber
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > totalPages) pageNumber = totalPages;

    // Slice Items for Current Page
    const startIndex = (pageNumber - 1) * NEWS_PER_PAGE;
    const pageItems = newsItems.slice(startIndex, startIndex + NEWS_PER_PAGE);

    // Render Rows
    listContainer.innerHTML = pageItems.map(renderNewsRow).join("");

    // Render Pagination Controls
    let paginationHtml = "";

    // Prev Button
    if (pageNumber <= 1) {
        paginationHtml += `<span class="news-pagination__btn is-disabled" aria-label="Previous Page">‹</span>`;
    } else {
        paginationHtml += `<button class="news-pagination__btn" data-news-target="${pageNumber - 1}" aria-label="Previous Page">‹</button>`;
    }

    // Number Buttons
    for (let i = 1; i <= totalPages; i++) {
        if (i === pageNumber) {
            paginationHtml += `<span class="news-pagination__btn is-active">${i}</span>`;
        } else {
            paginationHtml += `<button class="news-pagination__btn" data-news-target="${i}">${i}</button>`;
        }
    }

    // Next Button
    if (pageNumber >= totalPages) {
        paginationHtml += `<span class="news-pagination__btn is-disabled" aria-label="Next Page">›</span>`;
    } else {
        paginationHtml += `<button class="news-pagination__btn" data-news-target="${pageNumber + 1}" aria-label="Next Page">›</button>`;
    }

    paginationContainer.innerHTML = paginationHtml;

    // Attach Click Events to Pagination Buttons
    paginationContainer.querySelectorAll("[data-news-target]").forEach(btn => {
        btn.onclick = () => {
            const targetPage = parseInt(btn.dataset.newsTarget, 10);
            if (!isNaN(targetPage)) {
                // Update URL without page refresh
                if (window.history && window.history.replaceState) {
                    const newUrl = `./index.html?page=news&newsPage=${targetPage}`;
                    window.history.replaceState(null, "", newUrl);
                }

                renderNewsPage(targetPage);

                // Scroll smoothly back to top of news section
                const pageContainer = document.querySelector(".news-page");
                if (pageContainer) {
                    pageContainer.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        };
    });
}

function initNewsPage() {
    const initialPage = getInitialNewsPage();
    renderNewsPage(initialPage);
}

document.addEventListener("newsPageLoaded", initNewsPage);
