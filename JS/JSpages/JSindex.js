/* Index page carousel logic */

// One config list for all homepage carousels (selectors + matching buttons).
const HOME_CAROUSELS = [
    { slidesSelector: '#featured-games .slides', prevBtnId: 'prev-btn', nextBtnId: 'next-btn' },
    { slidesSelector: '#new-games .slides', prevBtnId: 'prev-btn-2', nextBtnId: 'next-btn-2' },
    { slidesSelector: '#popular-games .slides', prevBtnId: 'prev-btn-3', nextBtnId: 'next-btn-3' },
    { slidesSelector: '#cheaper-games .slides', prevBtnId: 'prev-btn-4', nextBtnId: 'next-btn-4' }
];

function initCarousel(slidesSelector, prevBtnId, nextBtnId) {
    // Resolve required DOM nodes for a single carousel instance.
    const slidesEl = document.querySelector(slidesSelector);
    if (!slidesEl) return;

    const slides = Array.from(slidesEl.querySelectorAll('.slide'));
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    if (slides.length === 0 || !prevBtn || !nextBtn) return;

    let index = 0;

    function update() {
        // Shift slides container by 100% per index to show the active card.
        slidesEl.style.transform = `translateX(-${index * 100}%)`;
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === slides.length - 1;
        const show = slides.length > 1;
        prevBtn.style.display = show ? 'block' : 'none';
        nextBtn.style.display = show ? 'block' : 'none';
    }

    prevBtn.addEventListener('click', () => {
        index = Math.max(0, index - 1);
        update();
    });

    nextBtn.addEventListener('click', () => {
        index = Math.min(slides.length - 1, index + 1);
        update();
    });

    document.addEventListener('keydown', (e) => {
        // Keyboard support for the current carousel buttons.
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });

    update();
}

function parseGameDate(value) {
    // db.json stores dates as MM/DD/YYYY; convert for reliable sorting.
    if (!value) return new Date(0);
    const [month, day, year] = value.split('/').map(Number);
    return new Date(year, month - 1, day);
}

function getRandomGames(games, count) {
    // Lightweight shuffle copy so we do not mutate the original array.
    const shuffled = [...games].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

function createSlideMarkup(game) {
    // Normalize genres to an array, then render as badge chips.
    const genreList = Array.isArray(game.genre)
        ? game.genre
        : game.genre
            ? [game.genre]
            : [];

    const genresMarkup = genreList.length > 0
        ? genreList.map((genre) => `<span class="genre-badge">${genre}</span>`).join('')
        : '<span class="genre-badge">N/A</span>';

    return `
        <div class="slide">
            <img src="${game.image}" alt="${game.title}">
            <h3>${game.title}</h3>
            <div class="genre-badges" aria-label="Genres">${genresMarkup}</div>
        </div>
    `;
}

function renderCarouselGames(slidesSelector, games) {
    // Replace all cards in a carousel with freshly generated markup.
    const slidesEl = document.querySelector(slidesSelector);
    if (!slidesEl) return;
    slidesEl.innerHTML = games.map(createSlideMarkup).join('');
}

function initHomeCarousels() {
    // Initialize controls for every configured homepage carousel.
    HOME_CAROUSELS.forEach(({ slidesSelector, prevBtnId, nextBtnId }) => {
        initCarousel(slidesSelector, prevBtnId, nextBtnId);
    });
}

async function loadHomeCarousels() {
    try {
        // Load source data and build each section from the same game list.
        const response = await fetch('../json/db.json');
        const data = await response.json();
        const games = Array.isArray(data.games) ? data.games : [];

        // Selection rules per carousel.
        const carouselGames = {
            '#featured-games .slides': getRandomGames(games, 3),
            '#new-games .slides': [...games]
                .sort((gameA, gameB) => parseGameDate(gameB.date) - parseGameDate(gameA.date))
                .slice(0, 3),
            '#popular-games .slides': [...games]
                .sort((gameA, gameB) => Number(gameB.rating) - Number(gameA.rating))
                .slice(0, 3),
            '#cheaper-games .slides': [...games]
                .sort((gameA, gameB) => Number(gameA.price) - Number(gameB.price))
                .slice(0, 3)
        };

        Object.entries(carouselGames).forEach(([selector, selectedGames]) => {
            renderCarouselGames(selector, selectedGames);
        });
    } catch (error) {
        // Keep page usable even if data loading fails.
        console.error('Failed to load carousel games:', error);
    }

    initHomeCarousels();
}

document.addEventListener('DOMContentLoaded', () => {
    loadHomeCarousels();
});

