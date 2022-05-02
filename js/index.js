const outputMovie = document.getElementById("outputMovie");
const movieContainer = document.querySelector("#movie-container");
const TIMER_VALUE = 5;

/******************************************************************************************************************/
/*************************************************** MENU JUGAR ***************************************************/
/******************************************************************************************************************/

document.getElementById('initPlay').addEventListener('click', () => {
    document.getElementById('panelPlay').classList.remove('d-none');
    document.getElementById('initPlay').classList.add('disabled');
});

document.getElementById("buttonGetMovie").addEventListener("click", getMovie);
// getMovie() selecciona una película de las lista de películas de forma aleatoria
function getMovie() {
    // Se inicializa el timer que marca el tiempo para el jugador
    document.getElementById('timer').value = TIMER_VALUE;
    const timer = setInterval(() => {
        document.getElementById('timer').value--;
        if (document.getElementById('timer').value == 0) {
            clearInterval(timer);
            // ! DEFINIR FIN DE TURNO
        }
    }, 1000);

    // Se inhabilita el botón de buscar película hasta que finalice el timer
    document.getElementById("buttonGetMovie").classList.add('disabled');


    // Se capta la lista de películas del local storage
    let movieListCopy = getMovieListCopy(false);

    // Se genera género de película de forma aleatoria
    const randomGenderIndex = Math.round(Math.random() * (moviesGenders.length - 1));
    const randomGender = moviesGenders[randomGenderIndex];
    // Se selecciona todas las películas de ese género
    const genderMovies = movieListCopy.filter((m) => m.gender == randomGender);
    // Se selecciona una película de forma aleatoria, del género correspondiente
    const randomMovieIndex = Math.round(Math.random() * (genderMovies.length - 1));
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
function showMoviesOptions() {
    outputMovie.innerHTML = "";
    document.getElementById("mainOptions").classList.add('d-none');
    document.getElementById("moviesOptions").classList.remove('d-none');
}

document.getElementById("backToMenu").addEventListener("click", backToMenu);
// backToMenu() vuelve al menu principal, similar al hacer click en 'Inicio'
function backToMenu() {
    document.getElementById("moviesOptions").classList.add('d-none');
    document.getElementById("addMovieInputs").classList.add('d-none');
    document.getElementById("mainOptions").classList.remove('d-none');
    movieContainer.innerHTML = "";
}

/************************************************ AGREGAR PELÍCULA ************************************************/

document.getElementById("addMovie").addEventListener("click", addMovie);
// addMovie() muestra un formulario para que el usuario luego complete con información de la película a agregar
function addMovie() {
    document.getElementById("addMovieInputs").classList.toggle('d-none');
    movieContainer.classList.add('d-none');
}

document.getElementById("confirmAddMovie").addEventListener("click", confirmAdd);
// confirmAdd() toma la información ingresada por el usuario y agrega la película a la lista de películas
function confirmAdd(e) {
    // Se frena el envío del formulario
    e.preventDefault();

    // Se capta nombre y se normaliza el formato
    let movieName = document.getElementById("movieName").value;
    movieName = movieName.toLowerCase();
    movieName = movieName.charAt(0).toUpperCase() + movieName.slice(1);

    let error = checkMovieName(movieName);

    if (error == movieNameError.noError) {
        let gender = document.getElementById("movieGender").value;
        let director = document.getElementById("movieDirector").value;
        let imgUrl = document.getElementById("imgUrl").value;

        pushMovie(movieName, gender, director, imgUrl);

        document.getElementById("addMovieInputs").classList.add('d-none');
        listMovies();

        // Se reinicia el formulario
        document.querySelector("#addMovieInputs").reset();

        // Se muestra alert de éxito al usuario
        popSweetAlert("", "Película agregada!", "success", "Close");
    } else {
        popError(error);
    }
}

// Muestra un Sweet Alert según el error
function popError(error) {
    switch (error) {
        case movieNameError.blankName:
            popSweetAlert("Error!", "La película debe contener un nombre", "error", "Close");
            break;
        case movieNameError.repeatedName:
            popSweetAlert("Error!", "Esa película ya existe.", "error", "Close");
            break;
        default:
            break;
    }
}

/************************************************ LISTAR PELÍCULAS ************************************************/

document.getElementById("listMovies").addEventListener("click", listMovies);
// listMovies() lista las películas en pantalla usando una lista ordenada
function listMovies() {
    movieContainer.classList.toggle('d-none');
    document.getElementById("addMovieInputs").classList.add('d-none');

    showMovieContainers();
}

// showMovieContainers() muestra las card images
function showMovieContainers() {
    movieContainer.innerHTML = "";

    // Se capta la lista de películas del local storage ordenada alfabéticamente
    let movieListCopy = getMovieListCopy(true);

    let moviesCards;
    movieListCopy.forEach((m) => {
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
                <div class="d-flex align-self-center mb-2"><a id="borrar${m.id}" class="btn btn-danger">Borrar <ion-icon name="trash-outline" size="small"></ion-icon></a></div>
            </div>`;
        movieContainer.appendChild(moviesCards);

        document.getElementById(`borrar${m.id}`).addEventListener("click", () => deleteMovie(`${m.id}`));
    });
}

/************************************************ ELIMINAR PELÍCULA ************************************************/

function deleteMovie(movieToDeleteId) {
    let movieListCopy = getMovieListCopy(false);
    movieListCopy = movieListCopy.filter((m) => m.id != movieToDeleteId);

    // Se reasigna los id según sea necesario
    movieListCopy = movieListCopy.map((m) => {
        m.id > movieToDeleteId && m.id--;
        return m;
    });

    localStorage.setItem("movieList", JSON.stringify(movieListCopy));

    showMovieContainers();
}