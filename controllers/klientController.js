const KlientRepository = require(`../repository/mysql2/KlientRepository`)

exports.showKlientList = (req, res , next ) => {
    KlientRepository.getKlients()
        .then(klients => {
            res.render(`klient/list` , {
                klients : klients,
                navLocation : "klient"
            })
        })
    
}

exports.showAddKlientForm = (req , res , next) => {
    res.render(`klient/form` , {
        klient : {},
        pageTitle : 'Nowy Klient', 
        formMode : 'createNew', 
        btnLabel : 'Dodaj Klienta', 
        formAction :'/klient/add',
        navLocation : "klient",
        validationErrors : []
    });
}

exports.showEditKlientFrom = (req, res, next) => {
    const klientID = req.params.klientId
    KlientRepository.getKlientById(klientID)
        .then(klient => {
            res.render(`klient/form` , {
                klient : klient,
                formMode : 'edit',
                pageTitle : 'Edycja Klienta',
                btnLabel : 'Edytuj!',
                formAction : '/klient/edit',
                navLocation : 'klient',
                validationErrors : []
            })
        }) 
}

exports.showKlientDetails = (req, res , next) => {
    const klientID = req.params.klientId;
    KlientRepository.getKlientById(klientID)
        .then(klient =>{
            res.render(`klient/form` , {
                klient : klient, 
                formMode : 'showDetails',
                pageTitle : 'Szczegóły Klienta', 
                formAction : '',
                navLocation : "klient",
                validationErrors : []
            })
        })
    
}

exports.addKlient = (req, res, next) => {
    const data = {... req.body};
    KlientRepository.createKlient(data)
        .then(result => {
            res.redirect(`/klient`)
        })
        
}

exports.updateKlient = (req, res, next) => {
    const data = {... req.body}
    const klientID = req.body.klient_id;
    console.log(`EDYCJA KLIENTA ${klientID} , ${data}`)
    KlientRepository.updateKlient(klientID , data)
        .then(result =>{
            res.redirect(`/klient`)
        });
}

exports.deleteKlient = (req, res , next) => {
    const klientID = req.params.klientId;
    console.log("USUWAMY KLIENT " , klientID)
    KlientRepository.deleteKlient(klientID)
        .then( () => {
            res.redirect(`/klient`)
        });
}