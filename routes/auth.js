const express = require('express');

const router = express.Router();

const authController = require('../controller/auth');
const checkToken = require('../middleware/token');


router.post('/register', authController.register);

router.post('/login',authController.login);




module.exports = router;