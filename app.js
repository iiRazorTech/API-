const moviesWrapper = document.querySelector(".movie__result--container-1, .movie__result--container-2");

function searchChange(event) {
    console.log(event.target.value);
}

async function renderMovies() {
    const response = await fetch('https://www.omdbapi.com/?s=Batman&apikey=1fb66a7f');
    const data = await response.json();
    const moviesArr = data.Search
    moviesWrapper.innerHTML = moviesArr.map((movie) => {
        return `
        <div class="movie__result">
        <img class="movie__img" src="${movie.Poster}" alt="Hey">
        <h2 class="movie__title">${movie.Title}</h2>
        <h3 class="movie__year">${movie.Year}</h3>
        <button type="submit" class="learn-more_btn click">Learn More</button>
      `
    })
}

renderMovies();