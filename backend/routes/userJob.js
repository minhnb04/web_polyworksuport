const express = require('express');
const router = express.Router();
const userJobController = require('../controllers/userJobController');
// const auth = require('../middlewares/auth');

router.get('/', userJobController.Load_List);
router.get('/getByCompany/:company_code', userJobController.Load_By_Company);
router.get('/getByJob/:job_id', userJobController.Load_By_Job);
router.post('/', userJobController.Insert);
router.put('/:id', userJobController.Update);
router.delete('/:id', userJobController.Delete);

module.exports = router;