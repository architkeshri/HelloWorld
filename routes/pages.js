const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const router = express.Router();
const jwt = require('jsonwebtoken');
const myConn = require('../database');

const authController = require('../controller/auth');
const checkToken = require('../middleware/token');



router.get('/',(req, res) =>{
    res.render('index');
}) ;


router.get('/register',(req, res) =>{
    res.render('login');
}) ;


router.get('/login', (req, res) => {
    res.render('login');
});


module.exports = router;