class Movie{
    constructor(id, name, gender, director, img){
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.director = director;
        this.img = img;
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