class Movie{
    constructor(name, gender, director){
        this.name = name;
        this.gender = gender;
        this.director = director;
    }
}

const movieList = [];
movieList.push(new Movie("El señor de los anillos", "Literatura fantástica", "Peter Jackson"));
movieList.push(new Movie("El día que la tierra se detuvo", "Ciencia Ficción", "Scott Derrickson"));
movieList.push(new Movie("La dama en el agua", "Fantasía", "M. Night Shyamalan"));
movieList.push(new Movie("El rey león", "Película infantil animada", "Rob Minkoff - Rogers Allers"))

const buttonAddMovie = document.getElementById("addMovie");
buttonAddMovie.addEventListener("click", addMovie);
function addMovie(){
    let newMovie, gender, director;
    
    newMovie = prompt("Ingrese nombre de película:");
    gender = prompt("Ingrese género:");
    director = prompt("Ingrese director:");
    
    movieList.push(new Movie(newMovie, gender, director));
    return movieList;
}

const buttonListMovies = document.getElementById("listMovies");
buttonListMovies.addEventListener("click", listMovies);
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


const buttonDeleteMovie = document.getElementById("deleteMovie");
buttonDeleteMovie.addEventListener("click", deleteMovie);
function deleteMovie(){
    let index = parseInt(prompt("Ingrese índice de la película a eliminar"));
    if( (index > 0) && (index <= movieList.length)){
        const deleted = movieList.splice(index-1, 1);
        alert("Película eliminada!")
    }
    else{
        alert("No se ha encontrado la película.");
    }
}