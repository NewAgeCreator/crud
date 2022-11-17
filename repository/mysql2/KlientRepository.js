const db = require('../../config/mysql2/db');

exports.getKlients = () => {
    return db.promise().query('SELECT * FROM Klient')
        .then((result , fields) => {
            console.log("DB : " , result[0]);
            return  result[0]
        })
        .catch(err => {
            console.log(err)
            throw err;
        })
};

exports.getKlientById = (klient_id) => {
    const query = `SELECT k.klient_id , k.surename,
     k.country, k.code, k.city, 
     f.film_id , f.title , f.type, f.year , f.director ,
     w.wypozyczenie_id, w.startDate, w.endDate 
     FROM Klient k
     left join Wypozyczenie w on w.klient_id = k.klient_id
     left join Film f on f.film_id = w.film_id
     WHERE k.klient_id = ?`;

     return db.promise().query(query , [klient_id])
        .then((result, fields) => {
            const firstRow = result[0][0];
            if(!firstRow){
                return {};
            }
            const klient = {
                klient_id : klient_id, 
                surename : firstRow.surename,
                country : firstRow.country, 
                code : firstRow.code, 
                city : firstRow.city,
                wypozyczenia : []
            }

            for(let i = 0 ; i < result[0].length ; i++){
                const row = result[0][i];
                if(row.wypozyczenie_id){
                    const wypozyczenie = {
                        wypozyczenie_id : row.wypozyczenie_id,
                        startDate : row.startDate, 
                        endDate : row.endDate,
                        film : {
                            film_id : row.film_id,
                            title : row.title, 
                            type : row.type
                        }
                    }
                    klient.wypozyczenia.push(wypozyczenie)
                }
            }
            console.log(`DB : getKlientByID(${klient_id})`)
            console.log(klient)
            return klient;
        })
        .catch(err => {
            console.log("getKlientByIdError : ", err)
            throw err;
        })
};

exports.createKlient = (data) => { 
    console.log(`DB : createKlient`);
    console.log(data)
    

    const sql = `INSERT INTO Klient ( surename, country, code, city)
        VALUES ( ? , ? , ? , ?);`
    console.log("SQL =" , sql )
    return db.promise().execute(sql , [ data.surename, data.country,
        data.code, data.city])
}

exports.updateKlient = (klientId , data) => {
    const surename = data.surename
    const country = data.country
    const code = data.code
    const city = data.city
    const sql = `UPDATE Klient set surename = ? , country = ? , code = ? , city = ? 
    WHERE klient_id = ?;`

    return db.promise().query(sql, [surename, country, code, city, klientId]);

}

exports.deleteKlient = (kleintId) => {
    const sql1 = `DELETE FROM Wypozyczenie WHERE klient_id = ?`;
    const sql2 = `DELETE FROM Klient WHERE klient_id = ?`; 

    return db.promise().execute( sql1 , [kleintId])
    .then(() => {
        return db.promise().execute(sql2 , [kleintId]);
    })
};