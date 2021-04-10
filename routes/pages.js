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


router.get('/club',checkToken, (req, res) => {
    res.render('club');
});


router.get('/home',checkToken, (req, res) => {
    var query = 'SELECT * FROM tag_details;'

    myConn.query(query,(err,category)=>{
        if(err){
            console.log(err);
        }
        else{
           
            res.render('home',{category});

        }
    });

});

router.get('/dashboard',checkToken, (req, res) => {

    var query = `SELECT * FROM user_details WHERE user_id = ${req.user_id}`;

    myConn.query(query,(err,userData) => {
        if(err){
            console.log(err);
        }
        else{
            res.render('dashboard',{userData});

        }
    });
});

module.exports = router;