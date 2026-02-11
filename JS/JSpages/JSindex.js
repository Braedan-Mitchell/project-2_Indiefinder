/* JS code for the index page of the indiefind project */

document.addEventListener('DOMContentLoaded', () => {
    const slidesEl = document.querySelector('.slides');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    if (!slidesEl || slides.length === 0) return;

    let index = 0;

    function update() {
        slidesEl.style.transform = `translateX(-${index * 100}%)`;
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === slides.length - 1;
        // hide controls if only one slide
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

    // keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });

    update();
});

