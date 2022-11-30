const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
// const auth = require('../middlewares/auth');

router.get('/', jobController.Load_List);
router.post('/', jobController.Insert);
router.put('/:id', jobController.Update);
router.delete('/:id', jobController.Delete);

module.exports = router;