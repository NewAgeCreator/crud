const WypozyczenieRepository = require(`../repository/mysql2/WypozyczenieRepository`)
const KlientRepository = require(`../repository/mysql2/KlientRepository`)
const FilmRepository = require(`../repository/mysql2/FilmRepository`)


exports.showWypozyczenieList = (req, res, next) => {
    WypozyczenieRepository.getWypozyczenie()
        .then(w =>{
            res.render(`wypozyczenie/list`, {
                wypozyczenia : w,
                navLocation : "wypozyczenie"
            })
            
        })
}

exports.showAddWypozyczenieForm = (req, res , next ) => {
    var allFilms , allKlients;

    FilmRepository.getFilms()
    .then(films => {
        allFilms = films;
        return KlientRepository.getKlients()
    })
    .then(klients => {
        allKlients = klients
        
        res.render(`wypozyczenie/form` , {
            wypozyczenie : {},
            formMode : 'createNew', 
            allFilms : allFilms,
            allKlients : allKlients,
            pageTitle : `Dodaj wypozyczenie`,
            btnLabel : `Dodaj`,
            formAction : `/wypozyczenie/add`,
            navLocation : "wypozyczenie",
            validationErrors : []
        });
        })
        
    }

exports.showEditWypozyczenieForm = (req, res , next ) => {
    wypozyczenieID = req.params.wypozyczenie_id;
    var allFilms , allKlients;

    FilmRepository.getFilms()
    .then(films => {
        allFilms = films;
        return KlientRepository.getKlients()
    })
    .then(klients => {
        allKlients = klients;
        return WypozyczenieRepository.getWypozyczenieById(wypozyczenieID)
    })
    .then(w => {

        console.log("WAZNE : " , w);
        res.render(`wypozyczenie/form` , {
            wypozyczenie : w,
            formMode : 'edit', 
            allFilms : allFilms,
            allKlients : allKlients,
            pageTitle : `Edytuj wypozyczenie`,
            btnLabel : `Edytuj`,
            formAction : `/wypozyczenie/edit`,
            navLocation : "wypozyczenie",
            validationErrors : []
        });
        })
}


exports.showWyporzyczenieDetails = (req, res , next ) => {
    wypozyczenieID = req.params.wypozyczenie_id;
    WypozyczenieRepository.getWypozyczenieById()
        .then(w => {
            res.render(`wypozyczenie/form` , {
                wypozyczenie : w,
                formMode : `showDetails` , 
                pageTitle : 'Szczegóły wypożyczenia',
                btnLabel : 'Edytuj',
                formAction : '/wypozyczenie/edit',
                navLocation : "wypozyczenie",
                validationErrors  : []
                
            });

        })
}

exports.addWypozyczenie = (req, res, next) => {
    const data = {... req.body};
    WypozyczenieRepository.createWypozyczenie(data)
        .then(result => {
            res.redirect(`/wypozyczenie`)
        })

}

exports.updateWypozyczenie = (req, res, next) => {
    const wypozyczenieID = req.body.wypozyczenie_id;
    const data = {... req.body};
    console.log(`EDYCJA Wypozyczenia  ${wypozyczenieID} , ${data}`)
    WypozyczenieRepository.updateWypozyczenie(wypozyczenieID , data)
        .then(result => {
            res.redirect(`/wypozyczenie`)
        });
}


exports.deleteWypozyczenie = (req, res, next) => {
    const wypozycznieID = req.params.wypozyczenie_id;
    WypozyczenieRepository.deleteWypozyczenie(wypozycznieID)
        .then( () => {
            res.redirect(`/wypozyczenie`)
        })
}