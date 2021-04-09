const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const router = express.Router();
const jwt = require('jsonwebtoken');

function checkToken(req, res, next){
    const authcookie = req.cookies.authcookie;

    jwt.verify(authcookie,process.env.JWT_SECRET,(err,data)=>{
        //console.log(data);
        if(err){
            res.redirect('/login');
        }
        else if(data.user_id){
            req.user_id = data.user_id;
            next();
        }

    });


}

module.exports = checkToken;