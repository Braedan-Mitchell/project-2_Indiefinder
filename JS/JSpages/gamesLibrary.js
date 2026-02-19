/* JS code for the games page of the indiefind project - games library functionality */

const API_URL = "../db.json";

document.addEventListener("DOMContentLoaded", () => {
  const gameBox = document.querySelector("#game-box");

  async function fetchGames() {
    const response = await fetch(API_URL);
    const data = await response.json();
    renderGames(data.games);
  }

  function renderGames(games) {
    gameBox.innerHTML = ""; // Clear once, safely
    games.forEach(game => {
      const gameElement = document.createElement("div");
      gameElement.className = "game-box";
      
      // Build elements safely, piece by piece
      const img = document.createElement("img");
      img.src = game.image || "placeholder.jpg";
      img.alt = game.title;
      
      const title = document.createElement("h3");
      title.textContent = game.title; // Safe: text only, no HTML
      title.className = "game-name";
      
      const genres = document.createElement("p");
      genres.textContent = game.genre.join(", ");
      genres.className = "game-genres";
      
      const price = document.createElement("p");
      price.textContent = `$${game.price.toFixed(2)}`;
      price.className = "game-price";
      
      gameElement.appendChild(img);
      gameElement.appendChild(title);
      gameElement.appendChild(genres);
      gameElement.appendChild(price);
      gameBox.appendChild(gameElement);
    });
  }

  fetchGames();
});
