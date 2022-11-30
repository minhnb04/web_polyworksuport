const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');
// const auth = require('../middlewares/auth');

// router.post('/send-email', auth, emailController.SendEmail);
router.post('/send-email', emailController.SendEmail);
router.post('/find-password', emailController.FindPassword);

module.exports = router;