/******************************************************************************************************************/
/*************************************************** VARIABLES ****************************************************/
/******************************************************************************************************************/

// key : k_8fxkd9r4 IMBd

/* const movieList = [];       // Lista de películas
const moviesGenders = [];   // Géneros de películas */

// ! Se inicializan variables segun local storage dado que se agoto por el dia las solicitudes de fetch a IMBd
let movieList = getMovieListCopy(false);
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

/* const fetchData = async () => {
    // Fetch películas de fantasía
    const resp = await fetch('https://imdb-api.com/API/AdvancedSearch/k_8fxkd9r4?title_type=tv_movie&languages=es&count=250');
    const data = await resp.json();

    let id = 0, imgLowQualityUlr, gender;
    let genderList, starListForMovie;
    for (m of data.results) {
        genderList = [];
        // Se rebaja la calidad de la imagen a linkear en cada película
        imgLowQualityUlr = m.image.replace('original', '384x528');
        
        if (m.genreList != null) {
            for(gender of m.genreList){
                genderList.push(gender.value);
                if ( (moviesGenders.some((g) => g == gender.value ) == false ) ){
                    moviesGenders.push(gender.value);
                }
            }
        }

        (m.starList != null) && (starListForMovie = m.starList.map( (s) => s.name ));

        movieList.push(new Movie(id++, m.title, genderList, starListForMovie, imgLowQualityUlr));
    }

    // Se guarda array en local storage
    localStorage.setItem("movieList", JSON.stringify(movieList));
}

// Se captan datos de API IMBd
fetchData(); */

// Enumeración para validar nombre al intentar agregar una nueva película
const movieNameError = {
    noError: 0,
    blankName: 1,
    repeatedName: 2
}

/* // Se inicializan algunas películas
let movieList = [
    new Movie(1, "El señor de los anillos", "Fantasía", "Peter Jackson", "./img/el_señor_de_los_anillos.jpg"),
    new Movie(2, "La dama en el agua", "Fantasía", "M. Night Shyamalan", "./img/la_dama_en_el_agua.jpg"),
    new Movie(3, "Kung Fu Panda", "Película infantil", "Mark Osborne - John Wayne Stevenson", "./img/kung_fu_panda.jpg"),
    new Movie(4, "El rey león", "Película infantil", "Rob Minkoff - Rogers Allers", './img/el_rey_leon.jpg'),
    new Movie(5, "La terminal", "Comedia", "Steven Spielberg", "./img/la_terminal.jpg"),
    new Movie(6, "Legalmente rubia", "Comedia", "Robert Luketic", "./img/legalmente_rubia.jpg"),
    new Movie(7, "El día que la tierra se detuvo", "Ciencia ficción", "Scott Derrickson", "./img/el_dia_que_la_tierra_se_detuvo.jpg"),
    new Movie(8, "Interestelar", "Ciencia ficción", "Christopher Nolan", "./img/interestellar.jpg"),
    new Movie(9, "Atrápame si puede", "Drama", "Steven Spielberg", "./img/atrapame_si_puedes.jpg"),
    new Movie(10, "Una mente brillante", "Drama", "Ron Howard", "./img/una_mente_brillante.jpg"),
    new Movie(11, "Contagio", "Suspenso", "Steven Soderbergh", "./img/contagio.jpg"),
    new Movie(12, "Mujeres al ataque", "Comedia", "Nick Cassavetes", "./img/mujeres_al_ataque.jpg"),
    new Movie(13, "La red social", "Drama", "David Fincher", "./img/la_red_social.jpg"),
    new Movie(14, "Actividad Paranormal", "Terror", "Oren Peli", "./img/actividad_paranormal.jpg"),
    new Movie(15, "El conjuro", "Terror", "James Wan", "./img/el_conjuro.jpg"),
    new Movie(16, "El diablo viste a la moda", "Comedia", "David Frankel", "./img/el_diablo_viste_a_la_moda.jpg"),
    new Movie(17, "La guerra de los mundos", "Suspenso", "Steven Spielberg", "./img/la_guerra_de_los_mundos.jpg"),
    new Movie(18, "Fiebre de sábado por la noche", "Drama", "John Badham", "./img/fiebre_de_sabado_por_la_noche.jpg"),
    new Movie(19, "La familia de mi novia", "Comedia", "Jay Roach", "./img/la_familia_de_mi_novia.jpg"),
    new Movie(20, "El juego del miedo", "Terror", "James Wan", "./img/el_juego_del_miedo.jpg")
]; */

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
    if (!(movieName ?? false)) {
        error = movieNameError.blankName;
    } else {
        movieListCopy = getMovieListCopy(false);
        for (const m of movieListCopy) {
            (m.name == movieName) && (error = movieNameError.repeatedName);
        }
    }
    return error;
}