/* JS code for the games page of the indiefind project */

document.addEventListener('gamesLoaded', function() {
    const searchBar = document.getElementById('search-bar');
    const genreFilter = document.getElementById('genre-filter');
    const sortOption = document.getElementById('sort-option');
    const ratingRange = document.getElementById('rating-range');
    const ratingValue = document.getElementById('rating-value');
    const consoleFilter = document.getElementById('console-filter');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    const priceMaxValue = document.getElementById('price-max-value');
    const resetBtn = document.getElementById('reset-filters');

    const allConsoles = [...new Set(window.gamesData.flatMap(game => game.console || []))].sort((a, b) => a.localeCompare(b));
    allConsoles.forEach(consoleName => {
        const option = document.createElement('option');
        option.value = consoleName;
        option.textContent = consoleName;
        consoleFilter.appendChild(option);
    });

    // Update price slider display
    priceRange.addEventListener('input', function() {
        priceMaxValue.textContent = this.value;
        filterGames();
    });

    // Search functionality
    searchBar.addEventListener('input', filterGames);

    // Genre filter
    genreFilter.addEventListener('change', filterGames);

    // Rating filter
    ratingRange.addEventListener('input', function() {
        ratingValue.textContent = this.value;
        filterGames();
    });

    // Console filter
    consoleFilter.addEventListener('change', filterGames);

    // Sort functionality
    sortOption.addEventListener('change', filterGames);

    // Reset all filters
    resetBtn.addEventListener('click', function() {
        searchBar.value = '';
        genreFilter.value = '';
        sortOption.value = 'name-asc';
        ratingRange.value = '1';
        ratingValue.textContent = '1';
        consoleFilter.value = '';
        priceRange.value = '50';
        priceMaxValue.textContent = '50';
        filterGames();
    });

    function parseGameDate(dateString) {
        const [month, day, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day);
    }

    function filterGames() {
        const searchTerm = searchBar.value.toLowerCase();
        const selectedGenre = genreFilter.value.toLowerCase();
        const selectedConsole = consoleFilter.value.toLowerCase();
        const maxPrice = parseInt(priceRange.value);
        const minRating = parseFloat(ratingRange.value);
        const sortBy = sortOption.value;

        // Filter games from actual data
        let filtered = window.gamesData.filter(game => {
            const gameName = game.title.toLowerCase();
            const gamePrice = game.price;
            const gameGenres = game.genre.map(g => g.toLowerCase()).join(', ');
            const gameRating = parseFloat(game.rating);
            const gameConsoles = (game.console || []).map(consoleName => consoleName.toLowerCase());

            const matchesSearch = gameName.includes(searchTerm);
            const matchesGenre = selectedGenre === '' || gameGenres.includes(selectedGenre);
            const matchesPrice = gamePrice <= maxPrice;
            const matchesRating = gameRating >= minRating;
            const matchesConsole = selectedConsole === '' || gameConsoles.includes(selectedConsole);

            return matchesSearch && matchesGenre && matchesPrice && matchesRating && matchesConsole;
        });

        // Sort games
        filtered.sort((a, b) => {
            const nameA = a.title;
            const nameB = b.title;
            const priceA = a.price;
            const priceB = b.price;

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
                    return parseGameDate(b.date) - parseGameDate(a.date);
                case 'oldest':
                    return parseGameDate(a.date) - parseGameDate(b.date);
                default:
                    return 0;
            }
        });

        // Update display by re-rendering from filtered data
        const gameBox = document.querySelector('#game-box');
        gameBox.innerHTML = '';
        filtered.forEach(game => {
            const gameElement = document.createElement('div');
            gameElement.className = 'game-box';
            
            const img = document.createElement('img');
            img.src = game.image || 'placeholder.jpg';
            img.alt = game.title;
            img.className = 'game-image';
            
            const gameInfo = document.createElement('div');
            gameInfo.className = 'game-info';
            
            const title = document.createElement('h3');
            title.textContent = game.title;
            title.className = 'game-name';
            
            const genres = document.createElement('p');
            genres.textContent = game.genre.join(', ');
            genres.className = 'game-genres';
            
            const price = document.createElement('p');
            price.textContent = `$${game.price.toFixed(2)}`;
            price.className = 'game-price';
            
            gameInfo.appendChild(title);
            gameInfo.appendChild(genres);
            gameInfo.appendChild(price);
            
            gameElement.appendChild(img);
            gameElement.appendChild(gameInfo);
            gameBox.appendChild(gameElement);
        });
    }
});