const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
// const auth = require('../middlewares/auth');

router.get('/', roleController.Load_List);
router.post('/', roleController.Insert);
router.put('/:id', roleController.Update);
router.delete('/:id', roleController.Delete);

module.exports = router;