// Se inicializan algunas películas
const movieList = [
    new Movie("El señor de los anillos", "Fantasía", "Peter Jackson"),
    new Movie("La dama en el agua", "Fantasía", "M. Night Shyamalan"),
    new Movie("Kung Fu Panda", "Película infantil", "Mark Osborne - John Wayne Stevenson"),
    new Movie("El rey león", "Película infantil", "Rob Minkoff - Rogers Allers"),
    new Movie("La terminal", "Comedia", "Steven Spielberg"),
    new Movie("Legalmente rubia", "Comedia", "Robert Luketic"),
    new Movie("El día que la tierra se detuvo", "Ciencia ficción", "Scott Derrickson"),
    new Movie("Interestelar", "Ciencia ficción", "Christopher Nolan")
];

sortMovies(movieList);

// Géneros de películas
const moviesGenders = ["Fantasía", "Ciencia ficción", "Película infantil", "Comedia"];