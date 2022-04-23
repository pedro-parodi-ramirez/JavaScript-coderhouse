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