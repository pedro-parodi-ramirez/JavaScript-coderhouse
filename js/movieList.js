/******************************************************************************************************************/
/*************************************************** VARIABLES ****************************************************/
/******************************************************************************************************************/

// key IMDb   : k_8fxkd9r4
// key IMDb 2 : k_aaaaaaaa

const movieList = [];       // Lista de películas
const moviesGenders = [];   // Géneros de películas

const IMG_QLTY = '192x264'; // [192x264, 384x528, ..., original]

// Se solicitan un total de 250 películas a la API de IMBDb y se almacenan en movieList
const fetchData = async () => {
    const resp = await fetch('https://imdb-api.com/API/AdvancedSearch/k_aaaaaaaa?title_type=tv_movie&languages=es&count=250');
    const data = await resp.json();

    let id = 0, imgLowQualityUlr, gender;
    let genderList, starListForMovie;
    for (m of data.results) {
        genderList = [];
        // Se rebaja la calidad de la imagen a linkear en cada película
        imgLowQualityUlr = m.image.replace('original', IMG_QLTY);

        if (m.genreList != null) {
            for (gender of m.genreList) {
                genderList.push(gender.value);
                if ((moviesGenders.some((g) => g == gender.value) == false)) {
                    moviesGenders.push(gender.value);
                }
            }
        }

        (m.starList != null) && (starListForMovie = m.starList.map((s) => s.name));

        movieList.push(new Movie(id++, m.title, genderList, starListForMovie, imgLowQualityUlr));
    }

    // Se guarda array en local storage
    localStorage.setItem("movieList", JSON.stringify(movieList));

    // Se habilitan funcionalidades
    document.getElementById('configMovies').classList.remove('disabled');
    document.getElementById('initPlay').classList.remove('disabled');
    document.getElementById('spinner').remove();
}

// Se captan datos de API IMDb
fetchData();

// Enumeración para validar nombre al intentar agregar una nueva película
const movieNameError = {
    noError: 0,
    blankName: 1,
    repeatedName: 2
}

/******************************************************************************************************************/
/**************************************************** MÉTODOS *****************************************************/
/******************************************************************************************************************/

// Ordena arreglo alfabéticamente
function sortMovies(movieArray) {
    movieArray.sort((a, b) => {
        if (a.name > b.name) { return 1; }
        if (a.name < b.name) { return -1; }
        return 0;
    })
}

// Convierte arreglo captado de local storage a su clase original
function serializer(arrayMovie, movieListCopy) {
    arrayMovie.forEach(e => {
        movieListCopy.push(new Movie(e.id,
            e.name,
            e.genderList,
            e.starList,
            e.img));
    });
}

// Genera una copia de movieList ordenada o no alfabéticamente
function getMovieListCopy(sorted) {
    let movieListCopy = [];
    if (sorted) {
        // Ordena alfabéticamente según el nombre
        serializer(JSON.parse(localStorage.getItem("movieList")), movieListCopy);
        sortMovies(movieListCopy);
    } else {
        // El orden es según se fueron creando, por default este orden es según #id
        serializer(JSON.parse(localStorage.getItem("movieList")), movieListCopy);
    }

    return movieListCopy;
}

// Agrega una película a la lista de películas
function pushMovie(movieName, gender, starList, imgUrl) {
    let movieListCopy = getMovieListCopy(false);

    movieListCopy.push(new Movie(movieListCopy.length, movieName, gender, starList, imgUrl));

    // Se agrega la nueva película al local storage
    localStorage.setItem("movieList", JSON.stringify(movieListCopy));
}

/* Corrobora si el nombre ingresado por el usuario es válido.
   Return:
    0 o movieNameError.noError -> sin errores
    1 o movieNameError.blankName -> nombre en blanco (undefined o null)
    2 o movieNameError.repeatedName -> nombre repetido
*/
function checkMovieName(movieName) {
    let error = movieNameError.noError;
    if ((movieName == false) || (movieName == undefined) || (movieName == "")) {
        error = movieNameError.blankName;
    } else {
        movieListCopy = getMovieListCopy(false);
        for (const m of movieListCopy) {
            (m.name == movieName) && (error = movieNameError.repeatedName);
        }
    }
    return error;
}