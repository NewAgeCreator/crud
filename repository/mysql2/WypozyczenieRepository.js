const db = require('../../config/mysql2/db')

exports.getWypozyczenie = () =>{
    const query = `SELECT w.wypozyczenie_id, w.startDate, w.endDate, w.film_id, w.klient_id, f.title, f.type, f.year, f.director, k.surename, k.country, k.code, k.city
    FROM Wypozyczenie w 
    left join Film f on f.film_id = w.film_id
    left join Klient k on k.klient_id = w.klient_id`;

return db.promise().query(query)
    .then( (result , fields ) => {
        const wypozyczenia = [];

        for(let i = 0 ; i < result[0].length; i++){
            const row = result[0][i];
            const wypozyczenie = {
                wypozyczenie_id : row.wypozyczenie_id,
                startDate : row.startDate,
                endDate : row.endDate, 

                film : {
                    film_id : row.film_id,
                    title : row.title, 
                    type : row.type, 
                    year : row.year,
                    director : row.director
                },

                klient : {
                    klient_id : row.klient_id, 
                    surename : row.surename, 
                    country : row.country, 
                    code : row.code, 
                    city : row.city
                }
            }
            wypozyczenia.push(wypozyczenie)
        }
        console.log(wypozyczenia)
        return wypozyczenia;
    })
    .catch( err => {
        console.log(err)
    })
}

exports.getWypozyczenieById = (wypozyczenieID) => {
    const query =  `SELECT w.wypozyczenie_id, w.startDate, w.endDate, w.film_id, w.klient_id, f.title, f.type, f.year, f.director, k.surename, k.country, k.code, k.city
    FROM Wypozyczenie w 
    left join Film f on f.film_id = w.film_id
    left join Klient k on k.klient_id = w.klient_id
    WHERE w.wypozyczenie_id = ?`;

    return db.promise().query(query, [wypozyczenieID])
    .then( (result , fields ) => {
        const wypozyczenia = [];

        for(let i = 0 ; i < result[0].length; i++){
            const row = result[0][i];
            const wypozyczenie = {
                wypozyczenie_id : row.wypozyczenie_id,
                startDate : row.startDate,
                endDate : row.endDate, 

                film : {
                    film_id : row.film_id,
                    title : row.title, 
                    type : row.type, 
                    year : row.year,
                    director : row.director
                },

                klient : {
                    klient_id : row.klient_id, 
                    surename : row.surename, 
                    country : row.country, 
                    code : row.code, 
                    city : row.city
                }
            }
            wypozyczenia.push(wypozyczenie)
        }
        console.log(wypozyczenia)
        return wypozyczenia;
    })
    .catch( err => {
        console.log(err)
    })
}

exports.createWypozyczenie = (data) => {
    console.log('createWypozyczenie');
    console.log(data);

    const sql = `INSERT INTO Wypozyczenie (film_id, klient_id ,startDate, endDate) 
        VALUES (? , ? , ? , ?)`;

    const dstart = new Date(data.startDate);
    const dend = new Date(data.endDate);

    return db.promise().query(sql, [ data.film_id, data.klient_id,
        dstart, dend]);
}

exports.updateWypozyczenie = (wypozyczenieID , data) => {
    console.log('updateWypozyczenie');
    console.log(data);

    const sql = `UPDATE Wypozyczenie set wypozyczenie_id = ? , film_id = ? ,  klient_id = ? , startDate = ?, endDate = ?
    WHERE wypozyczenie_id = ?`;
    
    const dstart = new Date(data.startDate);
    const dend = new Date(data.endDate);

    return db.promise().query(sql , [wypozyczenieID, data.film_id , data.klient_id ,
          dstart, dend,wypozyczenieID]);
}

exports.deleteWypozyczenie = (wypozyczenieID) =>{
    const sql = `DELETE FROM Wypozyczenie WHERE wypozyczenie_id = ?`;
    console.log(`DELETE Wypozyczenie id =` , wypozyczenieID)

    return db.promise().execute(sql , [wypozyczenieID])

}