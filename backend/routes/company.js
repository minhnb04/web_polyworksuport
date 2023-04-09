const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
// const auth = require('../middlewares/auth');

router.get('/', companyController.Load_List);
router.post('/', companyController.Insert);
router.put('/:id', companyController.Update);
router.delete('/:id', companyController.Delete);

module.exports = router;