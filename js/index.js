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
        <div class="card border-dark mb-3 bg-light h-100">
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
    document.getElementById("addMovieInputs").classList.add('d-none');
    document.getElementById("mainOptions").classList.remove('d-none');
    movieContainer.innerHTML = "";
}

/************************************************ AGREGAR PELÍCULA ************************************************/

document.getElementById("addMovie").addEventListener("click", addMovie);
// addMovie() muestra un formulario para que el usuario luego complete con información de la película a agregar
function addMovie(){
    document.getElementById("addMovieInputs").classList.remove('d-none');    
}

document.getElementById("confirmAddMovie").addEventListener("click", confirmAdd);
// confirmAdd() toma la información ingresada por el usuario y agrega la película a la lista de películas
function confirmAdd(e){
    // Se frena el envío del formulario
    e.preventDefault();

    let newMovie = document.getElementById("movieName").value;
    let gender = document.getElementById("movieGender").value;
    let director = document.getElementById("movieDirector").value;
    let imgUrl = document.getElementById("imgUrl").value;

    // Se setea la primer letra de cada variable a mayúscula y el resto a mínuscula
    newMovie= newMovie.toLowerCase();
    director = director.toLowerCase();
    newMovie = newMovie.charAt(0).toUpperCase() + newMovie.slice(1);
    director = director.charAt(0).toUpperCase() + director.slice(1);
    
    document.getElementById("addMovieInputs").classList.add('d-none');
    movieList.push(new Movie(movieList.length+1, newMovie, gender, director, imgUrl));

    // Se agrega la nueva película al local storage
    localStorage.setItem("movieList", JSON.stringify(movieList));

    // Se reinicia el formulario
    document.querySelector("#addMovieInputs").reset();

    listMovies();
}

/************************************************ LISTAR PELÍCULAS ************************************************/
const movieContainer = document.querySelector("#movie-container");

document.getElementById("listMovies").addEventListener("click", listMovies);
// listMovies() lista las películas en pantalla usando una lista ordenada
function listMovies(){
    movieContainer.classList.remove('d-none');
    document.getElementById("addMovieInputs").classList.add('d-none');
    
    movieContainer.innerHTML = "";

    // Se capta la lista de películas del local storage ordenada alfabéticamente
    let movieListCopy = getMovieListCopy(true);

    let moviesCards;
    movieListCopy.forEach( (m) => {
        moviesCards = document.createElement('div');
        moviesCards.classList.add('col');
        moviesCards.innerHTML = `
            <div class="card border-dark mb-3 bg-light h-100">
                <img src=${m.img} class="card-img-top" alt="Not available">
                <div class="card-body">
                    <h5>${m.name}</h5>
                    <p class="card-text">Género: ${m.gender}<br>
                                            Director: ${m.director}
                    </p>
                </div>
                <div class="d-flex align-self-center mb-2"><a id="borrar${m.id}" class="btn btn-danger">Borrar</a></div>
            </div>`;
        movieContainer.appendChild(moviesCards);

        document.getElementById(`borrar${m.id}`).addEventListener("click", () => deleteMovie(`${m.id}`));
    });
}

/************************************************ ELIMINAR PELÍCULA ************************************************/

function deleteMovie(movieToDeleteId){
    let movieListCopy = getMovieListCopy(false);
    movieListCopy = movieListCopy.filter( (m) => m.id != movieToDeleteId );
        
    // Se reasigna los id según sea necesario
    movieListCopy = movieListCopy.map( (m) => {
        m.id > movieToDeleteId && m.id--;
        return m;
    });

    localStorage.setItem("movieList", JSON.stringify(movieListCopy));

    listMovies();
}