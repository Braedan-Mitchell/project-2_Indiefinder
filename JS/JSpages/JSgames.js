/* JS code for the games page of the indiefind project */

document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.getElementById('search-bar');
    const genreFilter = document.getElementById('genre-filter');
    const sortOption = document.getElementById('sort-option');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    const priceMaxValue = document.getElementById('price-max-value');
    const resetBtn = document.getElementById('reset-filters');
    const gameBoxes = Array.from(document.querySelectorAll('.game-box'));

    // Update price slider display
    priceRange.addEventListener('input', function() {
        priceMaxValue.textContent = this.value;
        filterGames();
    });

    // Search functionality
    searchBar.addEventListener('input', filterGames);

    // Genre filter
    genreFilter.addEventListener('change', filterGames);

    // Sort functionality
    sortOption.addEventListener('change', filterGames);

    // Reset all filters
    resetBtn.addEventListener('click', function() {
        searchBar.value = '';
        genreFilter.value = '';
        sortOption.value = 'name-asc';
        priceRange.value = '50';
        priceMaxValue.textContent = '50';
        filterGames();
    });

    function filterGames() {
        const searchTerm = searchBar.value.toLowerCase();
        const selectedGenre = genreFilter.value.toLowerCase();
        const maxPrice = parseInt(priceRange.value);
        const sortBy = sortOption.value;

        // Filter games
        let filtered = gameBoxes.filter(box => {
            const gameName = box.querySelector('.game-name').textContent.toLowerCase();
            const gamePrice = parseFloat(box.querySelector('.game-price').textContent.replace('$', ''));
            const gameGenres = box.querySelector('.game-genres').textContent.toLowerCase();

            const matchesSearch = gameName.includes(searchTerm);
            const matchesGenre = selectedGenre === '' || gameGenres.includes(selectedGenre);
            const matchesPrice = gamePrice <= maxPrice;

            return matchesSearch && matchesGenre && matchesPrice;
        });

        // Sort games
        filtered.sort((a, b) => {
            const nameA = a.querySelector('.game-name').textContent;
            const nameB = b.querySelector('.game-name').textContent;
            const priceA = parseFloat(a.querySelector('.game-price').textContent.replace('$', ''));
            const priceB = parseFloat(b.querySelector('.game-price').textContent.replace('$', ''));

            switch(sortBy) {
                case 'name-asc':
                    return nameA.localeCompare(nameB);
                case 'name-desc':
                    return nameB.localeCompare(nameA);
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'newest':
                    return 0;
                default:
                    return 0;
            }
        });

        // Update display
        const container = document.querySelector('.games-container');
        container.innerHTML = '';
        filtered.forEach(box => container.appendChild(box.cloneNode(true)));
    }
});