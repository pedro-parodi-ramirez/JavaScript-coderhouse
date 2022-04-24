class Movie{
    constructor(id, name, gender, director){
        this.id = id;
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

// Ordena arreglo alfabéticamente
function sortMovies(movieArray){
    movieArray.sort((a,b) => {
        if(a.name > b.name){ return 1; }
        if(a.name < b.name){ return -1; }
        return 0;
    })
}

// Convierte arreglo captado de local storage a su clase original
function serializer(arrayMovie, movieList){
    arrayMovie.forEach(e => { movieList.push(new Movie(e.id,
                                                e.name,
                                                e.gender,
                                                e.director));
    });
}

function getMovieListCopy(sorted){
    let movieListCopy = [];
    if(sorted){
        serializer(JSON.parse(localStorage.getItem("movieList")), movieListCopy);
        sortMovies(movieListCopy);
    }else{
        serializer(JSON.parse(localStorage.getItem("movieList")), movieListCopy);
    }

    return movieListCopy;
}