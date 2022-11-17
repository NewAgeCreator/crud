const express = require('express')
const router = express.Router();

const klientApiController = require('../../api/KlientAPI')

router.get('/' , klientApiController.getKlients)
router.get('/:id' , klientApiController.getKlientById) 
router.post('/' , klientApiController.createKlient)
router.put('/:id' , klientApiController.updateKlient)
router.get('/:id' , klientApiController.deleteKlient)

module.exports = router;