const moviesWrapper = document.getElementById("movie__result--container");
const spinner = document.getElementById("spinner");
const searchName = document.querySelector(".movie__label");
const modal = document.getElementById("movieModal");
const modalBody = document.getElementById("modal-body");
const closeModal = document.querySelector(".close");

let currentMovies = [];

closeModal.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

async function renderMovies(searchTerm) {
  spinner.style.visibility = "visible";
  moviesWrapper.innerHTML = "";

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = await fetch(
    `https://www.omdbapi.com/?s=${searchTerm}&apikey=1fb66a7f`
  );

  const data = await response.json();
  currentMovies = data.Search;

  spinner.style.visibility = "hidden";

  displayMovies(currentMovies);
}

function displayMovies(movieList) {
  moviesWrapper.innerHTML = movieList
    .slice(0, 6)
    .map((movie) => {
      return `
        <div class="movie__result">
        <img class="movie__img" src="${movie.Poster}" alt="${movie.Title}">
        <h2 class="movie__title">${movie.Title}</h2>
        <h3 class="movie__year">${movie.Year}</h3>
        <button 
        type="button" 
        class="learn-more_btn click" 
        onclick="getMovieDetails('${movie.imdbID}')"
        >
        Learn More
        </button>
        </div>
      `;
    })
    .join("");
}

async function getMovieDetails(imdbID) {
  const response = await fetch(
    `https://www.omdbapi.com/?i=${imdbID}&apikey=1fb66a7f`
  );
  const movie = await response.json();

  alert(`
Title: ${movie.Title}
Year: ${movie.Year}
Rated: ${movie.Rated}
Released: ${movie.Released}
Runtime: ${movie.Runtime}
Genre: ${movie.Genre}
Plot: ${movie.Plot}
  `);
}

function sortChange(event) {
  const sortOption = event.target.value;
  let sortedMovies = [...currentMovies];

  if (sortOption === "newest") {
    sortedMovies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
  } else if (sortOption === "oldest") {
    sortedMovies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
  }

  displayMovies(sortedMovies);
}

function submitSearch(event) {
  event.preventDefault();
  const searchInput = document.querySelector(".movie-input");
  const query = searchInput.value.trim();
  if (query !== "") {
    renderMovies(query);
    searchName.innerHTML = `Search Result: ${query}`;
  }
}

function getMovieDetails(imdbID) {
  fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=1fb66a7f`)
    .then((res) => res.json())
    .then((data) => {
      modalBody.innerHTML = `
        <h2>${data.Title} (${data.Year})</h2>
        <img src="${data.Poster}" alt="${data.Title}" style="max-width: 100px; float: left; margin-right: 20px;">
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Director:</strong> ${data.Director}</p>
        <p><strong>Actors:</strong> ${data.Actors}</p>
        <p><strong>Plot:</strong> ${data.Plot}</p>
        <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
      `;
      modal.style.display = "block";
    });
}
