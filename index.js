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
}

const movieList = [];
movieList.push(new Movie("El señor de los anillos", "Fantasía", "Peter Jackson"));
movieList.push(new Movie("El día que la tierra se detuvo", "Ciencia Ficción", "Scott Derrickson"));
movieList.push(new Movie("La dama en el agua", "Fantasía", "M. Night Shyamalan"));
movieList.push(new Movie("El rey león", "Película infantil", "Rob Minkoff - Rogers Allers"));
movieList.push(new Movie("La terminal", "Comedia", "Steven Spielberg"));
movieList.push(new Movie("Legalmente rubia", "Comedia", "Robert Luketic"));

/******************************************************************************************************************/
/*************************************************** MENU PLAY ***************************************************/
/******************************************************************************************************************/

const buttonGetMovie = document.getElementById("buttonGetMovie");
buttonGetMovie.addEventListener("click", generateRandomMovie);
function generateRandomMovie(){
    const outputRandomMovie = document.getElementById("outputMovie");
    const randomMovieIndex = Math.round( Math.random() * (movieList.length-1) );
    const randomMovie = movieList[randomMovieIndex];
    outputRandomMovie.value = randomMovie.showInfo();
}

/******************************************************************************************************************/
/************************************************** MENU MOVIES ***************************************************/
/******************************************************************************************************************/

const menuListMovies = document.getElementById("menuForMovies");
menuListMovies.addEventListener("click", listMoviesOptions);
// listMoviesOptions() muestra las opciones disponibles para la lista de películas
function listMoviesOptions(){
    document.querySelector(".getMovie").style.display = 'none';
    document.querySelector(".configMovies").style.display = 'block';
}

/************************************************ AGREGAR PELÍCULA ************************************************/

const buttonAddMovie = document.getElementById("addMovie");
buttonAddMovie.addEventListener("click", addMovie);
// addMovie() solicita la información de la película al usuario y la agrega a la lista de películas. Luego, muestra la lista completa en pantalla.
function addMovie(){
    let newMovie, gender, director;
    
    // Se solicita al usuario la información de la película
    newMovie = prompt("Ingrese nombre de película:");
    gender = prompt("Ingrese género:");
    director = prompt("Ingrese director:");
    
    movieList.push(new Movie(newMovie, gender, director));
    listMovies();
}

/************************************************ LISTAR PELÍCULAS ************************************************/

const buttonListMovies = document.getElementById("listMovies");
buttonListMovies.addEventListener("click", listMovies);
// listMovies() lista las películas en pantalla usando una lista ordenada
function listMovies(){
    const movieListDiv = document.getElementById("movieListDiv");
    movieListDiv.innerHTML = "";
    
    const newTitleH2 = document.createElement("h2");
    const textTitleH2 = document.createTextNode("Lista de películas almancedas:");
    newTitleH2.appendChild(textTitleH2);
    movieListDiv.appendChild(newTitleH2);

    const newOL = document.createElement("ol");
    let li, textLi;
    for(const element of movieList){
        li = document.createElement("li");
        li.setAttribute("class", "movieList");
        textLi = document.createTextNode(element.name
                                            + " - Género: " + element.gender
                                            + " - Director/a: " + element.director);
        li.appendChild(textLi);
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
    document.getElementById("deleteParam").style.display = 'block';    
}

const buttonconfirmDelete = document.getElementById("confirmDelete");
buttonconfirmDelete.addEventListener("click", confirmDelete);
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