/* JS code for the index page of the indiefind project */

function initCarousel(slidesSelector, prevBtnId, nextBtnId) {
    const slidesEl = document.querySelector(slidesSelector);
    const slides = Array.from(slidesEl.querySelectorAll('.slide'));
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    if (!slidesEl || slides.length === 0) return;

    let index = 0;

    function update() {
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
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });

    update();
}

document.addEventListener('DOMContentLoaded', () => {
    initCarousel('#featured-games .slides', 'prev-btn', 'next-btn');
    initCarousel('#new-games .slides', 'prev-btn-2', 'next-btn-2');
    initCarousel('#popular-games .slides', 'prev-btn-3', 'next-btn-3');
    initCarousel('#cheaper-games .slides', 'prev-btn-4', 'next-btn-4');
});

