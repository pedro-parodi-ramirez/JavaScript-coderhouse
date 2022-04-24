// Se inicializan algunas películas
let movieList = [
    new Movie(1, "El señor de los anillos", "Fantasía", "Peter Jackson"),
    new Movie(2, "La dama en el agua", "Fantasía", "M. Night Shyamalan"),
    new Movie(3, "Kung Fu Panda", "Película infantil", "Mark Osborne - John Wayne Stevenson"),
    new Movie(4, "El rey león", "Película infantil", "Rob Minkoff - Rogers Allers"),
    new Movie(5, "La terminal", "Comedia", "Steven Spielberg"),
    new Movie(6, "Legalmente rubia", "Comedia", "Robert Luketic"),
    new Movie(7, "El día que la tierra se detuvo", "Ciencia ficción", "Scott Derrickson"),
    new Movie(8, "Interestelar", "Ciencia ficción", "Christopher Nolan")
];

// Géneros de películas
const moviesGenders = ["Fantasía", "Ciencia ficción", "Película infantil", "Comedia"];

// Se guardan arrays en local storage
localStorage.setItem("movieList", JSON.stringify(movieList));