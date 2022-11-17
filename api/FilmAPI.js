const FilmRepository = require('../repository/mysql2/FilmRepository');

exports.getFilms = (req, res , next) => {

    FilmRepository.getFilms()
        .then(films => {
            console.log('API : getFilms()')
            res.status(200).json(films)
        })
        .catch(err => {
            console.log('ERR API : getFilms()' , err)
        })

}

exports.getFilmById = (req, res , next) => {
    const filmId = req.params.id;
    FilmRepository.getFilmById(filmId)
        .then(film => {
            if(!film){
                res.status(404).json({
                    message: `API : Film o id: ${filmId} nie znaleziony`
                })
            } else {
                console.log("FILM BY ID = " , film)
                res.status(200).json(film)
            } 
        })
}

exports.createFilm = (req , res , next) => {
     console.log("REQ : " , req)
    FilmRepository.createFilm(req.body)
        .then(film => {
           
            res.status(201).json(film);
        })
        .catch (err => {
            if(!err.status) {
                err.statusCode(500);
            }
            next(err);
        })
}

exports.updateFilm = (req, res, next ) => {
    const filmId = req.params.id;
    FilmRepository.updateFilm(filmId , req.body)
        .then(result => {
            res.status(200).json({
                message : 'API : Film zaktualizowany!' , 
                result : result
            })
        })
            .catch(err => {
                if(!err.statusCode){
                    err.statusCode = 500;
                }
                next(err);
            })
        
}

exports.deleteFilm = (req, res , next) => {
    const filmId = req.params.id;
    FilmRepository.deleteFilm(filmId)
        .then(result => {
            res.status(200).json({
                message : `API : Usunięto film id = ${filmId}`
            })
        })
}