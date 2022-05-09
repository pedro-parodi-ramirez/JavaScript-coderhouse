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
    const resp = await fetch('https://imdb-api.com/API/AdvancedSearch/k_8fxkd9r4?title_type=tv_movie&languages=es&count=250');
    const data = await resp.json();

    let id = 0, imgLowQualityUlr, gender;
    let genderList, stars;
    for (m of data.results) {
        genderList = [];
        stars = [];
        // Se rebaja la calidad de la imagen a linkear en cada película
        imgLowQualityUlr = m.image.replace('original', IMG_QLTY);

        if (m.genreList != null) {
            // Se captan solo los valores del arreglo 'genreList'
            for (gender of m.genreList) {
                genderList.push(gender.value);
                // Se almacena el género en moviesGenders, si es que no existe
                if ((moviesGenders.some((g) => g == gender.value) == false)) {
                    moviesGenders.push(gender.value);
                }
            }
        }

        (m.starList != null) && (stars = m.starList.map((s) => s.name));

        movieList.push(new Movie(id++, m.title, genderList, stars, imgLowQualityUlr));
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

// ! El servidor IMDb permite 100 consultas al día de forma gratuita
// ! Para limitar las consultas al servidor, se puede ejecutar un fetch y luego trabajar con localStorage.
// ! Para ello, ejecutar una única vez la app con el código de arriba y luego comentarlo.
// ! Finalmente, descomentar este código para poder utilizar la app con normalidad.

/* let movieList = getMovieListCopy(false);
const moviesGenders = [];

movieList.forEach((m) => {
    if (m.genderList != null) {
        for (gender of m.genderList) {
            if ((moviesGenders.some((g) => g == gender) == false)) {
                moviesGenders.push(gender);
            }
        }
    }
})

new Promise((resolved) => {
    setTimeout(() => {
        document.getElementById('configMovies').classList.remove('disabled');
        document.getElementById('initPlay').classList.remove('disabled');
        resolved();
    }, 1000);
})
    .then(() => {
        document.getElementById('spinner').remove();
    }) */

// ! Comentar/descomentar hasta este punto

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
function sortArray(array) {
    array.sort((a, b) => {
        if (a.name > b.name) { return 1; }
        if (a.name < b.name) { return -1; }
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
    serializer(JSON.parse(localStorage.getItem("movieList")), movieListCopy);
    
    (sorted) && sortArray(movieListCopy);

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