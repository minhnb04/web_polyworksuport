const express = require('express');
const router = express.Router();
const userJobController = require('../controllers/userJobController');
// const auth = require('../middlewares/auth');

router.get('/', userJobController.Load_List);
router.post('/', userJobController.Insert);
router.put('/:id', userJobController.Update);
router.delete('/:id', userJobController.Delete);

module.exports = router;