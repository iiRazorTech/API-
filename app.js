const moviesWrapper = document.getElementById("movie__result--container");

function searchChange(event) {
    renderMovies(event.target.value)
}

async function renderMovies(searchTerm) {
    const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=1fb66a7f`);
    const data = await response.json();
    const moviesArr = data.Search
    moviesWrapper.innerHTML = moviesArr.slice(0,6).map((movie) => {
        return `
        <div class="movie__result">
        <img class="movie__img" src="${movie.Poster}" alt="${movie.Title}">
        <h2 class="movie__title">${movie.Title}</h2>
        <h3 class="movie__year">${movie.Year}</h3>
        <button type="submit" class="learn-more_btn click">Learn More</button>
        </div>
      `
    }).join('');
}





