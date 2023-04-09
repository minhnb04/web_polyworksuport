const express = require('express');
const router = express.Router();
const documentCVController = require('../controllers/documentCVController');
// const auth = require('../middlewares/auth');

router.get('/', documentCVController.Load_List);
router.get('/:id', documentCVController.FindById);
router.post('/', documentCVController.Insert);
router.put('/:id', documentCVController.Update);
router.delete('/:id', documentCVController.Delete);
router.get('/findByUser/:user_id', documentCVController.FindByUser);

module.exports = router;