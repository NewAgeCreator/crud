const express = require(`express`)
const router = express.Router()


const klientCotroller = require(`../controllers/klientController`)

router.get(`/` , klientCotroller.showKlientList)
router.get(`/add` , klientCotroller.showAddKlientForm)
router.get('/edit/:klientId' , klientCotroller.showEditKlientFrom)
router.get(`/details/:klientId` , klientCotroller.showKlientDetails)


router.post(`/add` , klientCotroller.addKlient)
router.post('/edit' , klientCotroller.updateKlient)
router.get(`/delete/:klientId` , klientCotroller.deleteKlient)

module.exports = router;
