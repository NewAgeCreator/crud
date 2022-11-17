const express = require(`express`)
const router = express.Router();

const filmController = require(`../controllers/filmController`)


router.get(`/` , filmController.showFilmList);
router.get(`/add` , filmController.showAddFilmForm)
router.get(`/edit/:filmId` , filmController.showEditFilmForm)
router.get(`/details/:filmId` , filmController.showFilmDetails)

router.post(`/add` , filmController.addFilm)
router.post(`/edit` , filmController.updateFilm)
router.get(`/delete/:film_id` , filmController.deleteFilm)

module.exports = router;