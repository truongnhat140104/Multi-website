const PROGRAMME_GENRES_DATA = {
    "music": {
        id: "music",
        title: "Music",
        description: "Experience the profound beauty of traditional and contemporary Chinese melodies and orchestral masterworks.",
        heroImage: "./assets/images/programme-genres/music-hero.webp",
        heroPosition: "center center",
        overlay: "linear-gradient(to right, rgba(20, 15, 15, 0.75) 0%, rgba(20, 15, 15, 0.35) 100%)",
        items: [
            {
                id: "m1",
                title: "Guangdong Chinese Orchestra - Splendours of Lingnan",
                date: "14 — 15.6.2026 (Fri — Sat) 7:30pm",
                status: "Selling Fast",
                organizer: "Leisure and Cultural Services Department",
                venue: "Concert Hall, Hong Kong Cultural Centre",
                image: "./assets/images/programme-genres/featured_event_1.webp"
            },
            {
                id: "m2",
                title: "Chinese Chamber Music Showcase - Ancient Winds",
                date: "20 — 21.6.2026 (Sat — Sun) 8:00pm",
                status: "Available",
                organizer: "HK Chinese Music Virtuosi",
                venue: "Theatre, Hong Kong City Hall",
                image: "./assets/images/programme-genres/featured_event_2.webp"
            },
            {
                id: "m3",
                title: "Silk & Bamboo Ensemble: Silk Road Echoes",
                date: "5 — 6.7.2026 (Sat — Sun) 3:00pm & 7:30pm",
                status: "Limited Tickets",
                organizer: "Chinese Culture Promotion Office",
                venue: "Auditorium, Sha Tin Town Hall",
                image: "./assets/images/programme-genres/featured_event_3.webp"
            },
            {
                id: "m4",
                title: "Pipa & Guzheng Recital by Master Virtuosos",
                date: "18.7.2026 (Sat) 7:30pm",
                status: "Available",
                organizer: "Traditional Music Society",
                venue: "Recital Hall, Hong Kong City Hall",
                image: "./assets/images/programme-genres/featured_event_4.webp"
            },
            {
                id: "m5",
                title: "Grand Orchestral Concert: Songs of the Yangtze",
                date: "8 — 9.8.2026 (Sat — Sun) 7:30pm",
                status: "Selling Fast",
                organizer: "National Traditional Orchestra",
                venue: "Concert Hall, Hong Kong Cultural Centre",
                image: "./assets/images/programme-genres/featured_event_5.webp"
            },
            {
                id: "m6",
                title: "Contemporary Chinese Symphonic Night",
                date: "22.8.2026 (Sat) 8:00pm",
                status: "Free Admission",
                organizer: "Hong Kong Chinese Orchestra",
                venue: "Piazza, Hong Kong Cultural Centre",
                image: "./assets/images/programme-genres/featured_event_6.webp"
            }
        ]
    },
    "dance": {
        id: "dance",
        title: "Dance",
        description: "Immerse in elegant traditional dance styles, classical folk storytelling, and modern choreographies.",
        heroImage: "./assets/images/programme-genres/dance-hero.webp",
        heroPosition: "center center",
        overlay: "linear-gradient(to right, rgba(20, 15, 15, 0.75) 0%, rgba(20, 15, 15, 0.35) 100%)",
        items: [
            {
                id: "d1",
                title: "China National Silk Road Dance Drama - Dunhuang Reverie",
                date: "27 — 28.6.2026 (Sat — Sun) 7:30pm",
                status: "Selling Fast",
                organizer: "China National Dance Ensemble",
                venue: "Grand Theatre, Hong Kong Cultural Centre",
                image: "./assets/images/programme-genres/featured_event_2.webp"
            },
            {
                id: "d2",
                title: "Lingnan Martial Dance & Folk Heritage Performance",
                date: "11 — 12.7.2026 (Sat — Sun) 3:00pm",
                status: "Available",
                organizer: "Guangdong Dance Theatre",
                venue: "Auditorium, Tsuen Wan Town Hall",
                image: "./assets/images/programme-genres/featured_event_3.webp"
            },
            {
                id: "d3",
                title: "Classic Chinese Ballet: The Legend of the Red Lantern",
                date: "15 — 16.8.2026 (Fri — Sat) 7:30pm",
                status: "Sold Out",
                organizer: "Hong Kong Dance Company",
                venue: "Lyric Theatre, HKAPA",
                image: "./assets/images/programme-genres/featured_event_1.webp"
            }
        ]
    },
    "chinese-opera": {
        id: "chinese-opera",
        title: "Chinese Opera",
        description: "Classic operatic traditions featuring Cantonese Opera, Peking Opera, and Yue Opera master performers.",
        heroImage: "./assets/images/programme-genres/opera-hero.webp",
        heroPosition: "center top",
        overlay: "linear-gradient(to right, rgba(20, 15, 15, 0.75) 0%, rgba(20, 15, 15, 0.35) 100%)",
        items: [
            {
                id: "o1",
                title: "Peking Opera Troupe of Beijing - The Peony Pavilion",
                date: "3 — 5.7.2026 (Fri — Sun) 7:15pm",
                status: "Selling Fast",
                organizer: "Peking Opera Troupe of Beijing",
                venue: "Grand Theatre, Hong Kong Cultural Centre",
                image: "./assets/images/programme-genres/featured_event_3.webp"
            },
            {
                id: "o2",
                title: "Cantonese Opera Classics: The Floral Princess",
                date: "17 — 19.7.2026 (Fri — Sun) 7:30pm",
                status: "Limited Tickets",
                organizer: "Hong Kong Cantonese Opera Troupe",
                venue: "Xiqu Centre Grand Theatre",
                image: "./assets/images/programme-genres/featured_event_1.webp"
            },
            {
                id: "o3",
                title: "Yue Opera Troupe of Shanghai - Dream of the Red Chamber",
                date: "7 — 9.8.2026 (Fri — Sun) 7:30pm",
                status: "Available",
                organizer: "Shanghai Yue Opera House",
                venue: "Auditorium, Kwai Tsing Theatre",
                image: "./assets/images/programme-genres/featured_event_2.webp"
            }
        ]
    },
    "theatre": {
        id: "theatre",
        title: "Theatre",
        description: "Captivating theatrical plays, historical dramas, and contemporary narrative storytelling.",
        heroImage: "./assets/images/programme-genres/theatre-hero.webp",
        heroPosition: "center center",
        overlay: "linear-gradient(to right, rgba(20, 15, 15, 0.75) 0%, rgba(20, 15, 15, 0.35) 100%)",
        items: [
            {
                id: "t1",
                title: "Beijing People's Art Theatre - Teahouse",
                date: "10 — 12.7.2026 (Fri — Sun) 7:30pm",
                status: "Selling Fast",
                organizer: "Beijing People's Art Theatre",
                venue: "Lyric Theatre, HKAPA",
                image: "./assets/images/programme-genres/featured_event_1.webp"
            },
            {
                id: "t2",
                title: "Historical Stage Play: The Grand Canal",
                date: "24 — 26.7.2026 (Fri — Sun) 8:00pm",
                status: "Available",
                organizer: "Hong Kong Repertory Theatre",
                venue: "Auditorium, Hong Kong City Hall",
                image: "./assets/images/programme-genres/featured_event_2.webp"
            }
        ]
    },
    "multi-arts": {
        id: "multi-arts",
        title: "Multi-arts",
        description: "Cross-disciplinary performances blending digital arts, martial arts, acrobatics, and live visuals.",
        heroImage: "./assets/images/programme-genres/multi-arts-hero.webp",
        heroPosition: "center center",
        overlay: "linear-gradient(to right, rgba(20, 15, 15, 0.75) 0%, rgba(20, 15, 15, 0.35) 100%)",
        items: [
            {
                id: "ma1",
                title: "China National Acrobatic Troupe - Dragon Awakening",
                date: "1 — 2.8.2026 (Sat — Sun) 3:00pm & 7:30pm",
                status: "Selling Fast",
                organizer: "China National Acrobatic Troupe",
                venue: "Queen Elizabeth Stadium Arena",
                image: "./assets/images/programme-genres/featured_event_2.webp"
            },
            {
                id: "ma2",
                title: "Digital Art & Shadow Puppetry Immersive Light Show",
                date: "14 — 23.8.2026 (Daily) 10:00am — 8:00pm",
                status: "Free Admission",
                organizer: "Chinese Culture Promotion Office",
                venue: "Hong Kong Museum of Art",
                image: "./assets/images/programme-genres/featured_event_3.webp"
            }
        ]
    },
    "films": {
        id: "films",
        title: "Films",
        description: "Retrospective and premiere screenings of iconic Chinese cinema classics and award-winning documentaries.",
        heroImage: "./assets/images/programme-genres/films-hero.webp",
        heroPosition: "center center",
        overlay: "linear-gradient(to right, rgba(20, 15, 15, 0.75) 0%, rgba(20, 15, 15, 0.35) 100%)",
        items: [
            {
                id: "f1",
                title: "Restored Classical Chinese Cinema Showcase",
                date: "5 — 12.7.2026 (Various Times)",
                status: "Available",
                organizer: "Hong Kong Film Archive",
                venue: "Cinema, Hong Kong Film Archive",
                image: "./assets/images/programme-genres/featured_event_3.webp"
            },
            {
                id: "f2",
                title: "Documentary Film Special: Heritage of China",
                date: "15 — 16.8.2026 (Sat — Sun) 2:30pm",
                status: "Free Admission",
                organizer: "Leisure and Cultural Services Department",
                venue: "Lecture Hall, Hong Kong Science Museum",
                image: "./assets/images/programme-genres/featured_event_1.webp"
            }
        ]
    },
    "others": {
        id: "others",
        title: "Others",
        description: "Workshops, masterclasses, outdoor cultural carnivals, and community interactive events.",
        heroImage: "./assets/images/programme-genres/others-hero.webp",
        heroPosition: "center center",
        overlay: "linear-gradient(to right, rgba(20, 15, 15, 0.75) 0%, rgba(20, 15, 15, 0.35) 100%)",
        items: [
            {
                id: "oth1",
                title: "Chinese Intangible Cultural Heritage Craft Fair",
                date: "20 — 21.6.2026 (Sat — Sun) 10:00am — 6:00pm",
                status: "Free Admission",
                organizer: "Intangible Cultural Heritage Office",
                venue: "Foyer Exhibition Area, HK Cultural Centre",
                image: "./assets/images/programme-genres/featured_event_1.webp"
            },
            {
                id: "oth2",
                title: "Masterclass: Art of Peking Opera Face Painting",
                date: "4.7.2026 (Sat) 2:30pm",
                status: "Limited Places",
                organizer: "Chinese Culture Promotion Office",
                venue: "Xiqu Centre Seminar Room",
                image: "./assets/images/programme-genres/featured_event_2.webp"
            }
        ]
    }
};
