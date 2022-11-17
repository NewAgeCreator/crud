const express = require('express');
const router = express.Router();

const WypozyczenieApiController = require('../../api/WypozyczenieAPI');

router.get('/' , WypozyczenieApiController.getWypozyczenie);
router.get('/:id' , WypozyczenieApiController.getWypozyczenieById)
router.post('/' , WypozyczenieApiController.createWypozyczenie)
router.put('/:id' , WypozyczenieApiController.updateWypozyczenie)
router.delete('/:id' , WypozyczenieApiController.deleteWypozyczenie)

module.exports = router;