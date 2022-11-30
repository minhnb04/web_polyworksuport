const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const auth = require('../middlewares/auth');

router.get('/', userController.Load_List);
router.get('/:id', userController.Find_By_Id);
router.post('/login',userController.Login);
router.post('/register', userController.Register);
router.put('/:id', userController.Update);
router.post('/:id', userController.ChangePassword);
router.delete('/:id', userController.Delete);

module.exports = router;