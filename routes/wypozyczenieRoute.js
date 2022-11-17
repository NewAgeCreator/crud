const express = require(`express`);
const router = express.Router();

const wypozyczenieController = require(`../controllers/wypozyczenieController`)

router.get('/' , wypozyczenieController.showWypozyczenieList)
router.get(`/add` , wypozyczenieController.showAddWypozyczenieForm)
router.get(`/edit/:wypozyczenie_id` , wypozyczenieController.showEditWypozyczenieForm) 
router.get(`/details/:wypozyczenie_id` , wypozyczenieController.showWyporzyczenieDetails)

router.post(`/add` , wypozyczenieController.addWypozyczenie)
router.post(`/edit` , wypozyczenieController.updateWypozyczenie)
router.get(`/delete/:wypozyczenie_id` , wypozyczenieController.deleteWypozyczenie)

module.exports = router