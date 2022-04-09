class Movie{
    constructor(name, gender, director){
        this.name = name;
        this.gender = gender;
        this.director = director;
    }

    showInfo(){
        return (this.name 
                    + " - Gender: " + this.gender
                    + " - Director: " + this.director);
    }

    showInfoReduced(fullyReduced){
        if(fullyReduced){
            return (this.name);
        }
        else{
            return (this.name + " - Director: " + this.director);
        }
    }
}

function sortMovies(movieArray){
    movieArray.sort((a,b) => {
        if(a.name > b.name){ return 1; }
        if(a.name < b.name){ return -1; }
        return 0;
    })
}

const movieList = [];
// FANTASÍA
movieList.push(new Movie("El señor de los anillos", "Fantasía", "Peter Jackson"));
movieList.push(new Movie("La dama en el agua", "Fantasía", "M. Night Shyamalan"));

// INFANTIL
movieList.push(new Movie("Kung Fu Panda", "Película infantil", "Mark Osborne - John Wayne Stevenson"));
movieList.push(new Movie("El rey león", "Película infantil", "Rob Minkoff - Rogers Allers"));

// COMEDIA
movieList.push(new Movie("La terminal", "Comedia", "Steven Spielberg"));
movieList.push(new Movie("Legalmente rubia", "Comedia", "Robert Luketic"));

// CIENCIA FICCIÓN
movieList.push(new Movie("El día que la tierra se detuvo", "Ciencia ficción", "Scott Derrickson"));
movieList.push(new Movie("Interestelar", "Ciencia ficción", "Christopher Nolan"));

sortMovies(movieList);

const moviesGenders = ["Fantasía", "Ciencia ficción", "Película infantil", "Comedia"];

/******************************************************************************************************************/
/*************************************************** MENU JUGAR ***************************************************/
/******************************************************************************************************************/

const buttonGetMovie = document.getElementById("buttonGetMovie");
buttonGetMovie.addEventListener("click", getMovie);
// getMovie() selecciona una película de las lista de películas de forma aleatoria
function getMovie(){
    // Se genera género de película de forma aleatoria
    const randomGenderIndex = Math.round( Math.random() * (moviesGenders.length-1) );
    const randomGender = moviesGenders[randomGenderIndex];
    // Se selecciona todas las películas de ese género
    const genderMovies = movieList.filter((m) => m.gender == randomGender);
    // Se selecciona una película de forma aleatoria, del género correspondiente
    const randomMovieIndex = Math.round( Math.random() * (genderMovies.length-1) );
    const randomMovie = genderMovies[randomMovieIndex];
    
    const outputMovieGender = document.getElementById("outputMovieGender");
    outputMovieGender.value = randomGender;
    const outputMovie = document.getElementById("outputMovie");
    outputMovie.value = randomMovie.showInfoReduced(true);
}

/******************************************************************************************************************/
/*********************************************** MENU PELICULAS ***************************************************/
/******************************************************************************************************************/

const buttonMoviesOptions = document.getElementById("moviesOptions");
buttonMoviesOptions.addEventListener("click", showMoviesOptions);
// showMoviesOptions() muestra las opciones disponibles para la lista de películas
function showMoviesOptions(){
    document.querySelector(".getMovie").style.display = 'none';
    document.querySelector(".configMovies").style.display = 'block';
}

/************************************************ AGREGAR PELÍCULA ************************************************/

const buttonAddMovie = document.getElementById("addMovie");
buttonAddMovie.addEventListener("click", addMovie);
// addMovie() muestra un formulario para que el usuario luego complete con información de la película a agregar
function addMovie(){
    document.getElementById("addMovieInputs").style.display = 'block';
    document.getElementById("deleteParam").style.display = 'none';
    const addMovieInputs = document.querySelectorAll(".addMovie__input");
    for(const input of addMovieInputs){
        if(input.getAttribute("type") != "submit"){
            input.value = "";
        }
    }
}

const buttonConfirmAdd = document.getElementById("confirmAddMovie");
buttonConfirmAdd.addEventListener("click", confirmAdd);
buttonConfirmAdd.addEventListener("click", (event) => event.preventDefault());
// confirmAdd() toma la información ingresada por el usuario y agrega la película a la lista de películas
function confirmAdd(){
    let newMovie = document.getElementById("movieName").value;
    let gender = document.getElementById("movieGender").value;
    let director = document.getElementById("movieDirector").value;
    
    // Se setea la primer letra de cada variable a mayúscula
    newMovie = newMovie.charAt(0).toUpperCase() + newMovie.slice(1);
    director = director.charAt(0).toUpperCase() + director.slice(1);
    
    document.getElementById("addMovieInputs").style.display = 'none';
    movieList.push(new Movie(newMovie, gender, director));
    sortMovies(movieList);
    listMovies();
}

/************************************************ LISTAR PELÍCULAS ************************************************/

const buttonListMovies = document.getElementById("listMovies");
buttonListMovies.addEventListener("click", listMovies);
// listMovies() lista las películas en pantalla usando una lista ordenada
function listMovies(){
    document.getElementById("addMovieInputs").style.display = 'none';
    document.getElementById("deleteParam").style.display = 'none';

    const movieListDiv = document.getElementById("movieListDiv");
    movieListDiv.innerHTML = "<h2>Lista de películas almancedas:</h2>";
    
    const newOL = document.createElement("ol");
    let li;
    for(const element of movieList){
        li = document.createElement("li");
        li.setAttribute("class", "movieList");
        li.innerHTML = element.showInfo();
        newOL.appendChild(li);
    };
    movieListDiv.appendChild(newOL);
}

/************************************************ ELIMINAR PELÍCULA ************************************************/

const buttonDeleteMovie = document.getElementById("deleteMovie");
buttonDeleteMovie.addEventListener("click", deleteMovie);
// deleteMovie() muestra en pantalla la lista de películas para que luego el usuario pueda decidir cual eliminar
function deleteMovie(){
    listMovies();
    document.getElementById("addMovieInputs").style.display = 'none';
    document.getElementById("deleteParam").style.display = 'block';
}

const buttonConfirmDelete = document.getElementById("confirmDelete");
buttonConfirmDelete.addEventListener("click", confirmDelete);
// confirmDelete() consulta al usuario cual película desea eliminar y la elimina. Luego, muestra la lista de películas en pantalla.
function confirmDelete(){
    const deleteIndex = document.getElementById("deleteIndex");
    let index = parseInt(deleteIndex.value);
    if( (index > 0) && (index <= movieList.length) ){
        const deleted = movieList.splice(index-1, 1);
        alert("Película eliminada!");
        listMovies();
    }
    else{
        alert("No se ha encontrado la película.");
    }
    document.getElementById("deleteParam").style.display = 'none';
    deleteIndex.value = "";
}