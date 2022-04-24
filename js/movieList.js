// Se inicializan algunas películas
let movieList = [
    new Movie(1, "El señor de los anillos", "Fantasía", "Peter Jackson", './img/el_señor_de_los_anillos.jpg'),
    new Movie(2, "La dama en el agua", "Fantasía", "M. Night Shyamalan", './img/la_dama_en_el_agua.jpg'),
    new Movie(3, "Kung Fu Panda", "Película infantil", "Mark Osborne - John Wayne Stevenson", './img/kung_fu_panda.jpg'),
    new Movie(4, "El rey león", "Película infantil", "Rob Minkoff - Rogers Allers", './img/el_rey_leon.jpg'),
    new Movie(5, "La terminal", "Comedia", "Steven Spielberg", './img/la_terminal.jpg'),
    new Movie(6, "Legalmente rubia", "Comedia", "Robert Luketic", './img/legalmente_rubia.jpg'),
    new Movie(7, "El día que la tierra se detuvo", "Ciencia ficción", "Scott Derrickson", './img/el_dia_que_la_tierra_se_detuvo.jpg'),
    new Movie(8, "Interestelar", "Ciencia ficción", "Christopher Nolan", './img/interestellar.jpg')
];

// Géneros de películas
const moviesGenders = ["Fantasía", "Ciencia ficción", "Película infantil", "Comedia"];

// Se guardan arrays en local storage
localStorage.setItem("movieList", JSON.stringify(movieList));

/******************************************************************************************************************/
/**************************************************** MÉTODOS *****************************************************/
/******************************************************************************************************************/

// Ordena arreglo alfabéticamente
function sortMovies(movieArray){
    movieArray.sort((a,b) => {
        if(a.name > b.name){ return 1; }
        if(a.name < b.name){ return -1; }
        return 0;
    })
}

// Convierte arreglo captado de local storage a su clase original
function serializer(arrayMovie, movieList){
    arrayMovie.forEach(e => { movieList.push(new Movie(e.id,
                                                e.name,
                                                e.gender,
                                                e.director,
                                                e.img));
    });
}

// Genera una copia de movieList ordenada o no alfabéticamente
function getMovieListCopy(sorted){
    let movieListCopy = [];
    if(sorted){
        serializer(JSON.parse(localStorage.getItem("movieList")), movieListCopy);
        sortMovies(movieListCopy);
    }else{
        serializer(JSON.parse(localStorage.getItem("movieList")), movieListCopy);
    }

    return movieListCopy;
}