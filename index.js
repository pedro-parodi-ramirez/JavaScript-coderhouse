/******************************************************************************************************************/
/*************************************************** MENU JUGAR ***************************************************/
/******************************************************************************************************************/

document.getElementById("buttonGetMovie").addEventListener("click", getMovie);
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
    outputMovieGender.innerHTML = `<i>Género: ${randomGender}</i>`;
    
    const outputMovie = document.getElementById("outputMovie");
    outputMovie.innerHTML = `<strong>${randomMovie.showInfoReduced(true)}</strong>`;
}

/******************************************************************************************************************/
/*********************************************** MENU PELICULAS ***************************************************/
/******************************************************************************************************************/

document.getElementById("configMovies").addEventListener("click", showMoviesOptions);
// showMoviesOptions() muestra las opciones disponibles para la lista de películas
function showMoviesOptions(){
    document.getElementById("mainOptions").classList.add('d-none');
    document.getElementById("moviesOptions").classList.remove('d-none');
}

document.getElementById("backToMenu").addEventListener("click", backToMenu);
// backToMenu() vuelve al menu principal, similar al hacer click en 'Inicio'
function backToMenu(){
    document.getElementById("moviesOptions").classList.add('d-none');
    document.getElementById("mainOptions").classList.remove('d-none');    
}

/************************************************ AGREGAR PELÍCULA ************************************************/

document.getElementById("addMovie").addEventListener("click", addMovie);
// addMovie() muestra un formulario para que el usuario luego complete con información de la película a agregar
function addMovie(){
    document.getElementById("addMovieInputs").classList.remove('d-none');
    document.getElementById("deleteParam").classList.add('d-none');
}

document.getElementById("confirmAddMovie").addEventListener("click", confirmAdd);
// confirmAdd() toma la información ingresada por el usuario y agrega la película a la lista de películas
function confirmAdd(){
    let newMovie = document.getElementById("movieName").value;
    let gender = document.getElementById("movieGender").value;
    let director = document.getElementById("movieDirector").value;
    
    // Se setea la primer letra de cada variable a mayúscula
    newMovie = newMovie.charAt(0).toUpperCase() + newMovie.slice(1);
    director = director.charAt(0).toUpperCase() + director.slice(1);
    
    document.getElementById("addMovieInputs").classList.add('d-none');
    movieList.push(new Movie(newMovie, gender, director));
    alert("Película agregada!");

    newMovie = document.getElementById("movieName").value = "";
    gender = document.getElementById("movieGender").value = "";
    director = document.getElementById("movieDirector").value = "";

    sortMovies(movieList);
    listMovies();
}

/************************************************ LISTAR PELÍCULAS ************************************************/

document.getElementById("listMovies").addEventListener("click", listMovies);
// listMovies() lista las películas en pantalla usando una lista ordenada
function listMovies(){
    document.getElementById("movieListDiv").classList.remove('d-none');
    document.getElementById("addMovieInputs").classList.add('d-none');
    document.getElementById("deleteParam").classList.add('d-none');

    const movieListDiv = document.getElementById("movieListDiv");
    movieListDiv.innerHTML = "<br><h4>Lista de películas almancedas:</h4>";
    
    const newOL = document.createElement("ol");
    let li;
    for(const element of movieList){
        li = document.createElement("li");
        li.innerHTML = element.showInfo();
        newOL.appendChild(li);
    };
    movieListDiv.appendChild(newOL);
}

/************************************************ ELIMINAR PELÍCULA ************************************************/

document.getElementById("deleteMovie").addEventListener("click", deleteMovie);
// deleteMovie() muestra en pantalla la lista de películas para que luego el usuario pueda decidir cual eliminar
function deleteMovie(){
    listMovies();
    document.getElementById("addMovieInputs").classList.add('d-none');
    document.getElementById("deleteParam").classList.remove('d-none');
}

document.getElementById("confirmDelete").addEventListener("click", confirmDelete);
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
    document.getElementById("deleteParam").classList.add('d-none');
    deleteIndex.value = "";
}