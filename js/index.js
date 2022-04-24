/******************************************************************************************************************/
/*************************************************** MENU JUGAR ***************************************************/
/******************************************************************************************************************/
const outputMovie = document.getElementById("outputMovie");

document.getElementById("buttonGetMovie").addEventListener("click", getMovie);
// getMovie() selecciona una película de las lista de películas de forma aleatoria
function getMovie(){
    // Se capta la lista de películas del local storage
    let movieListCopy = getMovieListCopy(false);
    
    // Se genera género de película de forma aleatoria
    const randomGenderIndex = Math.round( Math.random() * (moviesGenders.length-1) );
    const randomGender = moviesGenders[randomGenderIndex];
    // Se selecciona todas las películas de ese género
    const genderMovies = movieListCopy.filter((m) => m.gender == randomGender);
    // Se selecciona una película de forma aleatoria, del género correspondiente
    const randomMovieIndex = Math.round( Math.random() * (genderMovies.length-1) );
    const randomMovie = genderMovies[randomMovieIndex];
    
    outputMovie.innerHTML = "";
    let movieCard;    
    movieCard = document.createElement('div');
    movieCard.setAttribute("class", 'col col-sm-6');
    movieCard.innerHTML = `
        <div class="card h-100">
            <img src=${randomMovie.img} class="card-img-top" alt="Not available">
            <div class="card-body">
                <h5 class="card-title">${randomMovie.name}</h5>
                <p class="card-text">Género: ${randomMovie.gender}<br>
                                                Director: ${randomMovie.director}
                </p>
            </div>
        </div>`;
    outputMovie.appendChild(movieCard);
}

/******************************************************************************************************************/
/*********************************************** MENU PELICULAS ***************************************************/
/******************************************************************************************************************/

document.getElementById("configMovies").addEventListener("click", showMoviesOptions);
// showMoviesOptions() muestra las opciones disponibles para la lista de películas
function showMoviesOptions(){
    outputMovie.innerHTML = "";
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
    movieList.push(new Movie(movieList.length+1, newMovie, gender, director));

    // Se agrega la nueva película al local storage
    localStorage.setItem("movieList", JSON.stringify(movieList));

    alert("Película agregada!");

    newMovie = document.getElementById("movieName").value = "";
    gender = document.getElementById("movieGender").value = "";
    director = document.getElementById("movieDirector").value = "";

    listMovies();
}

/************************************************ LISTAR PELÍCULAS ************************************************/
const movieContainer = document.querySelector("#movie-container");

document.getElementById("listMovies").addEventListener("click", listMovies);
// listMovies() lista las películas en pantalla usando una lista ordenada
function listMovies(){
    movieContainer.classList.remove('d-none');
    document.getElementById("addMovieInputs").classList.add('d-none');
    document.getElementById("deleteParam").classList.add('d-none');

    movieContainer.innerHTML = "";

    // Se capta la lista de películas del local storage ordenada alfabéticamente
    let movieListCopy = getMovieListCopy(true);

    let moviesCards;
    movieListCopy.forEach( (m) => {
        moviesCards = document.createElement('div');
        moviesCards.classList.add('col');
        moviesCards.innerHTML = `
            <div class="card h-100">
                <img src=${m.img} class="card-img-top" alt="Not available">
                <div class="card-body">
                    <h5 class="card-title">${m.name}</h5>
                    <p class="card-text">Género: ${m.gender}<br>
                                                    Director: ${m.director}
                    </p>
                </div>
            </div>`;
        movieContainer.appendChild(moviesCards);
    });
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
    // Se capta la lista de películas del local storage ordenada alfabéticamente
    let movieListCopy = getMovieListCopy(true);

    const deleteIndex = document.getElementById("deleteIndex");
    let index = parseInt(deleteIndex.value);
    if( (index > 0) && (index <= movieListCopy.length) ){
        const movieToDelete = movieListCopy[index-1];

        movieListCopy = movieListCopy.filter( (m) => m.id != movieToDelete.id );
        
        // Se reasigna los id según sea necesario
        movieListCopy = movieListCopy.map( (m) => {
            m.id > movieToDelete.id && m.id--;
            return m;
        });

        // Se reordena según id y se guardan los cambios en local storage
        movieListCopy.sort( (a,b) => a.id - b.id );
        localStorage.setItem("movieList", JSON.stringify(movieListCopy));

        alert("Película eliminada!");
        listMovies();
    }
    else{
        alert("No se ha encontrado la película.");
    }
    document.getElementById("deleteParam").classList.add('d-none');
    deleteIndex.value = "";
}