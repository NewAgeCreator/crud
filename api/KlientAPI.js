const KlientRepository = require('../repository/mysql2/KlientRepository');

exports.getKlients = (req, res , next) => {
    KlientRepository.getKlients()
        .then(klients => {
            console.log('API : getKlients()');
            res.status(200).json(klients);
        })
        .catch(err => {
            console.log(`ERR API : getFilms()` , err)
        })
}

exports.getKlientById = (req , res , next) => {
    const klientID = req.params.id;
    KlientRepository.getKlientById(klientID)
        .then(klient => {
            if(!klient){
                res.status(404).json({
                    message: `API : Klient o id: ${klientID} nie znaleziony`
                })
            } else {
                res.status(200).json(klient)
                }
        })
}

exports.updateKlient = (req, res , next) => {
    const klientID = req.params.id;
    KlientRepository.updateKlient(klientID , req.body)
        .then(result => { 
            res.status(200).json({
                message: "API : Zaktualizowano klienta",
                result : result
            })
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500
            }
            next(err);
        })
}

exports.createKlient = (req, res, next) => {
    
    KlientRepository.createKlient(req.body)
        .then(klient => {
            res.status(201).json(klient)    
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.deleteKlient = (req, res , next) => {
    const klientID = req.params.id;
    KlientRepository.deleteKlient(klientID)
        .then(result => {
            res.status(200).json({
                message : `API : Usunięto klienta id = ${klientID}`
            })
        })
}