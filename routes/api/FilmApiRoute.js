const express = require('express')
const router = express.Router();

const filmApiController = require('../../api/FilmAPI')

router.get('/' , filmApiController.getFilms)
router.get('/:id' , filmApiController.getFilmById)
router.post('/' , filmApiController.createFilm)
router.put('/:id' , filmApiController.updateFilm)
router.delete('/:id' , filmApiController.deleteFilm)

module.exports = router;