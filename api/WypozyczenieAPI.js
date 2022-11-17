const WypozyczenieRepository = require('../repository/mysql2/WypozyczenieRepository');

exports.getWypozyczenie = (req, res , next) => {
    WypozyczenieRepository.getWypozyczenie()
        .then(wypozyczenie => {
            console.log('API : getWypozyczenie()');
            res.status(200).json(wypozyczenie);
        })
        .catch(err => {
            console.log(`ERR API : getWypozyczenie()` , err)
        })
}

exports.getWypozyczenieById = (req , res , next) => {
    const wypozyczenieID = req.params.id;
    WypozyczenieRepository.getWypozyczenieById(wypozyczenieID)
        .then(wypozyczenie => {
            if(!wypozyczenie){
                res.status(404).json({
                    message: `API : Klient o id: ${wypozyczenieID} nie znaleziony`
                })
            } else {
                    res.status(200).json(wypozyczenie)
                }
        })
}

exports.updateWypozyczenie = (req, res , next) => {
    const wypozyczenieID = req.params.id;
    WypozyczenieRepository.updateWypozyczenie(wypozyczenieID , req.body)
        .then(result => { 
            res.status(200).json({
                message: "API : Zaktualizowano wypozyczenie",
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

exports.createWypozyczenie = (req, res, next) => {
    WypozyczenieRepository.createWypozyczenie(req.body)
        .then(wypozyczenie => {
            res.status(201).json(wypozyczenie)    
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.deleteWypozyczenie = (req, res , next) => {
    const wypozyczenieID = req.params.id;
    WypozyczenieRepository.deleteWypozyczenie(wypozyczenieID)
        .then(result => {
            res.status(200).json({
                message : `API : Usunięto wypozyczenie id = ${wypozyczenieID}`
            })
        })
}