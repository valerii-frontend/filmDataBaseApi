// НЕ ПОКАЗЫВАТЬ В СОЦ СЕТЯХ
const API_KEY = "api_key=a45e819dc588d4a31ae046e6ea1b6b49";

// КОПИРОВАТЬ СО СЛЕДУЮЩЕЙ СТРОКИ
// to get the key, you need to register on the site
// link to site: https://www.themoviedb.org/documentation/api
// const API_KEY = "api_key=USE-YOUR-API-KEY"
const API_URL = `https://api.themoviedb.org/3/discover/movie?desc&${API_KEY}&language=en-EN`;

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?${API_KEY}&language=en-EN&query="`;

const form = document.querySelector(".header__form");
const search = document.querySelector(".header__input");
const main = document.querySelector(".main__movies");
const body = document.querySelector("body");
getMovies(API_URL);
async function getMovies(url) {
	const res = await fetch(url);
	const data = await res.json();
	showMovies(data.results);
	console.log(data.results);
}

form.addEventListener("submit", function (e) {
	e.preventDefault();
	const searchTerm = search.value;
	if (searchTerm && searchTerm != "") {
		getMovies(SEARCH_URL + searchTerm);
		search.value = "";
	} else {
		window.location.reload();
	}
});

function showMovies(movies) {
	main.innerHTML = "";
	movies.forEach((movie) => {
		const { title, backdrop_path, vote_average, overview, id, poster_path } = movie;
		const movieEl = document.createElement("a");
		movieEl.classList.add("movie");
		movieEl.setAttribute("href", `https://www.themoviedb.org/movie/${id}`);
		movieEl.setAttribute("target", "_blank");
		movieEl.addEventListener("mouseenter", function (e) {
			body.classList.add("bg");
			body.style.cssText = `background-image:url(${IMG_PATH + backdrop_path})`;
		});

		movieEl.innerHTML = `
							<div class="movie__poster"><img src="${IMG_PATH + poster_path}" alt="${title}" /></div>
							<div class="movie__info">
								<h3 class="movie__title">${title}</h3>
								<span class="movie__rating movie__rating${getRatecolor(vote_average)}">${vote_average}</span>
							</div>
							<div class="movie__overview">
								<h3 class="movie__title" >${title}</h3>
								<p>
									${overview}
								</p>
							</div>`;
		if (vote_average < 2 || backdrop_path == null) {
			movieEl.innerHTML = "";
		} else {
			main.appendChild(movieEl);
		}
	});
}

function getRatecolor(vote) {
	if (vote >= 6.9) {
		return "_green";
	} else if (vote >= 4.9) {
		return "_orange";
	} else {
		return "_red";
	}
}
