const outputMovie = document.getElementById("outputMovie");
const movieContainer = document.querySelector("#movie-container");

let teamPlaying = "Azul";

const team = [
    { id: 1, color: "Azul", score: 0 },
    { id: 2, color: "Rojo", score: 0 }
]

document.getElementById('teamAzulScore').value = 0;
document.getElementById('teamRojoScore').value = 0;

/******************************************************************************************************************/
/*************************************************** MENU JUGAR ***************************************************/
/******************************************************************************************************************/

document.getElementById('initPlay').addEventListener('click', () => {
    document.getElementById('panelPlay').classList.remove('d-none');
    document.getElementById('mainOptions').classList.add('d-none');
    popSweetAlert("", `Turno del equipo ${teamPlaying.toLocaleUpperCase()}!`, "info", "Ok");
});

document.getElementById('backToMenu_fromPlaying').addEventListener("click", () => {
    document.getElementById('panelPlay').classList.add('d-none');
    document.getElementById('mainOptions').classList.remove('d-none');
})

document.getElementById("buttonGetMovie").addEventListener("click", getMovie);
// getMovie() selecciona una película de las lista de películas de forma aleatoria
function getMovie() {
    document.getElementById('main-container').classList.remove('vh-100');

    // Se inhabilita el botón de buscar película hasta próximo turno
    document.getElementById("buttonGetMovie").classList.add('disabled');

    // Se capta la lista de películas del local storage
    let movieListCopy = getMovieListCopy(false);

    // Se selecciona una película de forma aleatoria, del género correspondiente
    const randomMovieIndex = Math.round(Math.random() * (movieListCopy.length - 1));
    const randomMovie = movieListCopy[randomMovieIndex];

    // Se muestra la película en pantalla
    outputMovie.innerHTML = "";
    let movieCard;
    movieCard = document.createElement('div');
    movieCard.setAttribute("class", 'col col-sm-6');
    movieCard.innerHTML = `
        <div class="card border-warning border-2 mb-3 bg-light bg-opacity-75 h-100">
            <img src=${randomMovie.img} class="card-img-top" alt="Not available">
            <div class="card-body">
                <h4 class="card-title">${randomMovie.name}</h4>
                <p class="card-text"><strong>Género:</strong> ${randomMovie.genderList.join(', ')}<br>
                <strong>Reparto:</strong> ${randomMovie.starList.join(', ')}
                </p>
            </div>
        </div>`;
    outputMovie.appendChild(movieCard);

    // Se inicia el temporizador
    startTimer()
        .then((resolved) => {
            if (resolved) {
                Swal.fire({
                    title: "Timeout!",
                    icon: 'warning',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#198754',
                })
                .then(() => endTurn(randomMovie.id))
            }
        });
}

// endTurn() avanza el turno
function endTurn(outputMovieId) {
    // Cambia el equipo jugador
    (teamPlaying === "Rojo") ? (teamPlaying = "Azul") : (teamPlaying = "Rojo");

    // Se muestra alerta del equipo que sigue
    popSweetAlert("", `Turno del equipo ${teamPlaying.toLocaleUpperCase()}!`, "info", "Ok");

    // Se vuelve a habilitar el botón de buscar película
    document.getElementById("buttonGetMovie").classList.remove('disabled');

    // Se elimina la película para que no pueda ser seleccionada nuevamente
    deleteMovie(outputMovieId);
    outputMovie.innerHTML = "";

    // Se muestra timer en su valor inicial
    document.getElementById("base-timer-label").innerHTML = formatTime(TIME_LIMIT);

    document.getElementById('main-container').classList.add('vh-100');
}

/******************************************************************************************************************/
/*********************************************** MENU PELICULAS ***************************************************/
/******************************************************************************************************************/

document.getElementById("configMovies").addEventListener("click", showMoviesOptions);
// showMoviesOptions() muestra las opciones disponibles para la lista de películas
function showMoviesOptions() {
    outputMovie.innerHTML = "";
    document.getElementById('panelPlay').classList.add('d-none');
    document.getElementById("mainOptions").classList.add('d-none');
    document.getElementById("moviesOptions").classList.remove('d-none');
}

document.getElementById("backToMenu").addEventListener("click", backToMenu);
// backToMenu() vuelve al menu principal, similar al hacer click en 'Inicio'
function backToMenu() {
    document.getElementById("moviesOptions").classList.add('d-none');
    document.getElementById("timeLimitInput").classList.add('d-none');
    document.getElementById("addMovieInputs").classList.add('d-none');
    document.getElementById("mainOptions").classList.remove('d-none');
    document.getElementById('main-container').classList.add('vh-100');
    document.querySelector("#addMovieInputs").reset();
    movieContainer.classList.add('d-none');
    movieContainer.innerHTML = "";
}

/************************************************ TIEMPO DE TURNO ************************************************/

document.getElementById('btnTimeLimit').addEventListener("click", () => {
    document.getElementById("timeLimitInput").classList.toggle('d-none');
    document.getElementById("addMovieInputs").classList.add('d-none');
    movieContainer.classList.add('d-none');
    document.getElementById('main-container').classList.add('vh-100');

    document.getElementById('timeLimitValue').value = "";
});

document.getElementById('confirmTimeLimit').addEventListener("click", changeTimeLimit);

function changeTimeLimit() {
    let newTimeLimit = parseInt(document.getElementById('timeLimitValue').value);

    if (newTimeLimit > 0) {
        TIME_LIMIT = newTimeLimit;
        document.getElementById("base-timer-label").innerHTML = formatTime(TIME_LIMIT);
        popSweetAlert("", "Listo.", "success", "Ok");
        document.getElementById("timeLimitInput").classList.add('d-none');
    } else {
        popSweetAlert("Error!", "El número debe ser entero y mayor a cero.", "error", "Cerrar");
    }
}

/************************************************ AGREGAR PELÍCULA ************************************************/

document.getElementById("addMovie").addEventListener("click", addMovie);
// addMovie() muestra un formulario para que el usuario luego complete con información de la película a agregar
function addMovie() {
    document.getElementById("addMovieInputs").classList.toggle('d-none');
    document.getElementById("timeLimitInput").classList.add('d-none');
    movieContainer.classList.add('d-none');
    document.getElementById('main-container').classList.add('vh-100');

    // Se generan las opciones de géneros disponibles
    let genderList = document.getElementById("movieGender");
    genderList.innerHTML = "";
    moviesGenders.forEach((g) => {
        genderList.innerHTML += `<option value=${g}>${g}</option>`;
    })
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
        let gender = [document.getElementById("movieGender").value];
        let starList = [document.getElementById("movieStarList").value];
        let imgUrl = document.getElementById("imgUrl").value;

        // En caso de que el usuario no agregue url de imagen, se agrega una para clarificar
        (imgUrl == null || imgUrl == undefined || imgUrl == "") && (imgUrl = './img/image_not_available.jpg');

        // En caso de que el usuario no agregue el reparto, se agrega uno vacío en formato array
        (movieStarList == null || movieStarList == undefined || movieStarList == "") && (movieStarList = []);

        pushMovie(movieName, gender, starList, imgUrl);

        document.getElementById("addMovieInputs").classList.add('d-none');

        // Se reinicia el formulario
        document.querySelector("#addMovieInputs").reset();

        // Se muestra alert de éxito al usuario
        popSweetAlert("", "Película agregada!", "success", "Cerrar");
    } else {
        popError(error);
    }
}

// Muestra un Sweet Alert según el error
function popError(error) {
    switch (error) {
        case movieNameError.blankName:
            popSweetAlert("Error!", "La película debe contener un nombre", "error", "Cerrar");
            break;
        case movieNameError.repeatedName:
            popSweetAlert("Error!", "Esa película ya existe.", "error", "Cerrar");
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
    document.getElementById("timeLimitInput").classList.add('d-none');
    document.getElementById('main-container').classList.toggle('vh-100');

    showMovieContainers();
}

// showMovieContainers() muestra las card images
function showMovieContainers() {
    movieContainer.innerHTML = "";

    // Se capta la lista de películas del local storage ordenada alfabéticamente
    let movieListCopy = getMovieListCopy(true);

    let moviesCards = "";
    movieListCopy.forEach((m) => {
        moviesCards = document.createElement('div');
        moviesCards.classList.add('col');
        moviesCards.innerHTML = `
            <div class="card border-warning mb-3 bg-light bg-opacity-75 h-100">
                <img src=${m.img} class="card-img-top" alt="Not available">
                <div class="card-body">
                    <h4>${m.name}</h4>
                    <p class="card-text"><strong>Género:</strong> ${m.genderList.join(', ')}<br>
                    <strong>Reparto:</strong> ${m.starList.join(', ')}</p>
                </div>
                <div class="d-flex align-self-center mb-2"><a id="borrar${m.id}" class="btn btn-warning">Borrar <ion-icon name="trash-outline" size="small"></ion-icon></a></div>
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

/******************************************************************************************************************/
/************************************************* COMO JUGAR *****************************************************/
/******************************************************************************************************************/

document.getElementById("btnHowToPlay").addEventListener("click", () => {
    document.getElementById("textHowToPlay").classList.remove('d-none');
    document.getElementById("mainOptions").classList.add('d-none');
    document.getElementById("moviesOptions").classList.add('d-none');
    document.getElementById("timeLimitInput").classList.add('d-none');
    document.getElementById("addMovieInputs").classList.add('d-none');
    document.getElementById("panelPlay").classList.add('d-none');
    document.getElementById("main-container").classList.add('vh-100');
    document.querySelector("#addMovieInputs").reset();
    movieContainer.classList.add('d-none');
    movieContainer.innerHTML = "";
})

document.getElementById("backToMenu_2").addEventListener("click", () => {
    document.querySelector('#textHowToPlay').classList.add('d-none');
    document.getElementById("mainOptions").classList.remove('d-none');
});

/******************************************************************************************************************/
/************************************************** METODOS *******************************************************/
/******************************************************************************************************************/

function popSweetAlert(_title, _text, _icon, _confirmButtonText) {
    Swal.fire({
        title: _title,
        text: _text,
        icon: _icon,
        confirmButtonText: _confirmButtonText,
        confirmButtonColor: '#198754',
        allowOutsideClick: false
    })
}