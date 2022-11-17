const FilmRepository = require('../repository/mysql2/FilmRepository');


exports.showFilmList = (req , res , next) => {
    FilmRepository.getFilms()
        .then(films => {
            res.render(`film/list` , {
                films : films,
                navLocation : "film"
            })
            
        })
   }

exports.showAddFilmForm = (req , res , next) => {
    res.render(`film/form` , {
        film : {},
        pageTitle : 'Nowy Film',
        formMode : 'createNew',
        btnLabel : 'Dodaj Film',
        formAction : '/film/add',
        navLocation : "film",
        validationErrors : []
    });
}

exports.showEditFilmForm = (req, res, next) => {
    const filmID = req.params.filmId;
    FilmRepository.getFilmById(filmID)
        .then(film => {
            res.render('film/form' , {
                film : film, 
                formMode : 'edit', 
                pageTitle : 'Edycja Filmu', 
                btnLabel : 'Edytuj!',
                formAction : '/film/edit',
                navLocation : 'film',
                validationErrors : []
            })
        })
}

exports.showFilmDetails = (req , res , next) => {
    const filmID = req.params.filmId;
    FilmRepository.getFilmById(filmID)
        .then(film => {
            res.render(`film/form` , {
                film : film,
                formMode : 'showDetails',
                pageTitle : 'Szczegóły filmu',
                formAction : '',
                navLocation : "film",
                validationErrors : []
            })
        })
}

exports.addFilm = (req, res, next) => {
    const data ={... req.body};
    FilmRepository.createFilm(data)
        .then( result => {
            res.redirect('/film');
        })
        .catch(err=>{
            res.render(`film/form` , {
                film: data,
                pageTitle : `Dodanie filmu`,
                formMode : 'createNew',
                btnLabel : `Dodaj film`,
                formAction : '/film/add',
                navLocation : 'film',
                validationErrors : err.details
            })
        })
};

exports.updateFilm = (req, res, next) => {
    const filmID = req.body.film_id;
    const data = { ...req.body };
    FilmRepository.updateFilm(filmID , data)
        .then(result => {
            res.redirect(`/film`)
        })
        .catch(err=>{
            res.render(`film/form` , {
                film: data,
                pageTitle : `Edycja filmu`,
                formMode : 'edit',
                btnLabel : `Edytuj Film`,
                formAction : '/film/edit',
                navLocation : 'film',
                validationErrors : err.details
            })
        });

};

exports.deleteFilm = (req, res, next) =>{
    const filmID = req.params.film_id;
    console.log("DELETE " , filmID)
    FilmRepository.deleteFilm(filmID)
        .then( () =>{
            res.redirect(`/film`)
        })  
};