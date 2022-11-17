const db = require('../../config/mysql2/db');


exports.getFilms = () => {
    return db.promise().query(`SELECT * FROM Film`)
    .then( (results , fields) => {
        console.log("Wszystkie filmy : " , results[0])
        return results[0];
    })
    .catch(err => {
        console.log(err);
        throw err; 
    })
};

exports.getFilmById = (filmId) => {
  const query = `SELECT f.film_id , f.title , f.type, f.year , f.director ,
    w.wypozyczenie_id, w.startDate, w.endDate, 
    k.surename , k.country , k.klient_id, w.wypozyczenie_id
    FROM Film f
    left join Wypozyczenie w on w.film_id = f.film_id
    left join Klient k on k.klient_id = w.klient_id  
    WHERE f.film_id =  ? `;


  return db.promise().query(query , [filmId])
  .then((results , fields) => {
      const firstRow = results[0][0];
      if(!firstRow){
          return {};
      }
      const film = {
          film_id : parseInt(filmId),
          title : firstRow.title, 
          type : firstRow.type,
          year : firstRow.year,
          director : firstRow.director,
          wypozyczenia: []
      }
        for(let i = 0 ; i < results[0].length; i++){
          const row = results[0][i];
            if(row.wypozyczenie_id){
                const wypozyczenie = {
                    wypozyczenie_id : row.wypozyczenie_id,
                    startDate : row.startDate,
                    endDate : row.endDate,
                    klient : {
                        klient_id : row.klient_id,
                        surename : row.surename,
                        country : row.country, 
                    }
                }
                film.wypozyczenia.push(wypozyczenie)
            }
        }
        console.log(`DB : getFilmById(${filmId})`)
        console.log(film)
        return film;
  })
  .catch(err => {
      console.log("getFilmByIdError : " , err)
      throw err;
  })
};


exports.createFilm = (data) => {

    console.log('DB : createFilm()')
    console.log(data)
    const sql = 'INSERT into Film (title, type, year, director) VALUES (?, ?, ?, ?);'
    return db.promise().execute(sql, [data.title , data.type , data.year , data.director])
};

exports.updateFilm = (filmId , filmData) =>{
    
    const tiltle = filmData.title;
    const type = filmData.type;
    const year = filmData.year;
    const director = filmData.director;
    console.log("FILM DATA  = , ", filmData)
    const sql = `UPDATE Film set title = ? , type = ? , year = ? , director = ? where film_id = ?`;
    return db.promise().query(sql, [tiltle , type , year , director , filmId]);

};

exports.deleteFilm = (filmId) => {
    const sql1 = `DELETE FROM Wypozyczenie WHERE film_id = ?`;
    const sql2 = `DELETE FROM Film WHERE film_id = ?`;

    return db.promise().execute(sql1 , [filmId])
    .then( () => {
        return db.promise().execute(sql2 , [filmId]);
    })
};
