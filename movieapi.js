// DATA FETCH FROM API

const apiKey = "api_key=d81f7af5ef83a9b8f042d242c69abadb";
const pageNumber = 1;
const baseUrl = "https://api.themoviedb.org/3";
const apiUrl = baseUrl + "/discover/movie?" + apiKey + "&sort_by=popularity.desc&page=" + pageNumber;
const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
const searchUrl = baseUrl + '/search/movie?' + apiKey + '&query=';
const genresUrl = baseUrl + "/genre/movie/list?" + apiKey;

// function for getting all movies
getMovies(apiUrl);


function getMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => singleMovie(data.results))
}

// Select The Container Where All Movie Will Be Display
const moviesContainer = document.querySelector('.moviesContainer .container')


function singleMovie(movies) {

    moviesContainer.innerHTML = "";
    movies.forEach(movie => {

        // Select All Details From API
        /*
            const movieTitle = movie.original_title;
            const movieVote = movie.vote_average;
            const moviePoster = movie.poster_path;
            const movieOverview = movie.overview;
       */
        // shortcut selection

        const { original_title, vote_average, poster_path, overview } = movie;



        // Creating Single Movie Division
        const singleMovieDiv = document.createElement('div');
        singleMovieDiv.classList.add('single_movie');
        singleMovieDiv.innerHTML = `
        
        <div class="img_box">
             <img src="${poster_path ? baseImageUrl+poster_path : "images.png"}" alt="Movie Poster">
        </div>
        <div class="movie_details">
            <h3>${original_title}</h3>
            <span class="${ratingColor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
           <h3>${original_title}</h3>
           <p>${overview}</p>
        </div>
        
        `
        moviesContainer.appendChild(singleMovieDiv);

    })
};


// Function for Rating Color


function ratingColor(rating) {
    if (rating < 5) {
        return "rating_red";
    } else if (rating <= 7 && rating >= 5) {
        return "rating_tomato";
    } else {
        return "rating_green";
    }
};

// Function For Search Movie


// Select Search form

const searchForm = document.querySelector('#search_form');
const search = document.querySelector('#search_value');
const searchFor = document.querySelector('.search_for');
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const searchValue = search.value.trim();
    if (searchValue) {
        getMovies(searchUrl + searchValue);
        search.value = "";
        searchFor.innerHTML = "Search Result For:" + "<span>" + searchValue + "</span>";
    } else {
        window.location.reload();
    }

});

// catagory function
// select catagory item DOM

const catagory = document.querySelector('.catagory');
var selectedGenresId = [];

setGenres(genresUrl);

function setGenres(url) {
    catagory.innerHTML = "";
    fetch(url)
        .then(res => res.json())
        .then(data => data.genres.forEach(genre => {
            const spanEl = document.createElement('span');
            spanEl.classList.add('single_catagory');
            spanEl.id = genre.id;
            spanEl.innerText = genre.name;

            spanEl.addEventListener('click', function(e) {
                spanEl.classList.toggle('color');

                if (selectedGenresId.length == 0) {
                    selectedGenresId.push(genre.id);
                } else {
                    if (selectedGenresId.includes(genre.id)) {
                        selectedGenresId.forEach((id, index) => {
                            if (id = genre.id) {
                                selectedGenresId.splice(index, 1);
                            }
                        })
                    } else {
                        selectedGenresId.push(genre.id);
                    }
                }
                console.log(selectedGenresId);
                getMovies(apiUrl + "&with_genres=" + selectedGenresId.join(","));

            })
            catagory.appendChild(spanEl);

        }))
}




// function for Pagination


// select pagination button

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
var pNumber = 1;
nextButton.addEventListener("click", function(e) {
    e.preventDefault();
    pNumber += 1;
    getMovies(baseUrl + "/discover/movie?" + apiKey + "&sort_by=popularity.desc&page=" + pNumber)
});
prevButton.addEventListener('click', function(e) {
    e.preventDefault();
    pNumber -= 1;
    if (pNumber <= 1) {
        getMovies(apiUrl);
        pNumber = 1;
    } else {
        getMovies(baseUrl + "/discover/movie?" + apiKey + "&sort_by=popularity.desc&page=" + pNumber)
    }
})