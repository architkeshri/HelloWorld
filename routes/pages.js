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
router.get('/questions-:id', checkToken,(req, res)=>{

    var id = req.params.id;
    console.log("Tag id is " + id);
    var query = `SELECT * FROM tag_details WHERE tag_id='${id}';`

    myConn.query(query,(err,category)=>{
        if(err){
            console.log(err);
        }
        else{

            var query2 = `SELECT * FROM question_details WHERE q_tag='${id}';`

            myConn.query(query2,(err,questionslist)=>{
                if(err){
                    console.log(err);
                }
                else{
                    var data = {category,questionslist};
                    console.log(data);
                   // console.log(category);
                   // console.log(questionslist);
                    res.render('questions',data);
                }
            });

        }
    });

   

});



router.post('/askquestion-:tag_id', checkToken,(req, res)=>{

    var tag_id = req.params.tag_id;
    var ques_text = req.body.ques_text;
    console.log(tag_id);

    var query = `INSERT INTO question_details SET user_id = '${req.user_id}', ques_text = '${ques_text}', q_tag = '${tag_id}';`

    myConn.query(query,(err,result) =>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect(`questions-${tag_id}`);
        }
    });
    
});

router.post('/profile-update-:id',(req,res)=>{

    var contact = req.body.phone;
    var fb_link = req.body.facebook;
    var git_link = req.body.github;
    var lin_link = req.body.linkedin;
    var id = req.params.id;

    var query = `UPDATE user_details SET contact = ?, fb_link = ?,git_link = ?, lin_link = ? WHERE user_id = ? `;

    myConn.query(query,[contact,fb_link,git_link,lin_link,id],(err,result)=>{

        if(err){
            console.log(err);
        }
        else{
            console.log(result);
            console.log(id);
  
            res.redirect('/dashboard');
        }
   });
    
});



router.get('/answers-:id', checkToken,(req, res)=>{

    var id = req.params.id;
    console.log("Ques id is " + id);
    var query = `SELECT * FROM question_details WHERE ques_id='${id}';`

    myConn.query(query,(err,questions)=>{
        if(err){
            console.log(err);
        }
        else{

            var query2 = `SELECT * FROM answer_details WHERE ques_id='${id}';`

            myConn.query(query2,(err,answerslist)=>{
                if(err){
                    console.log(err);
                }
                else{
                    // // var query3 = `SELECT * FROM user_details WHERE user_id='${ans_by}';`

                    // myConn.query(query3,(err,userdetails)=>{
                    //     if(err){
                    //         console.log(err);
                    //     }
                    //     else{
                    //         var data = {questions,answerslist, userdetails};
                    //         console.log(data);
                    //         console.log(questions);
                    //         console.log(answerslist);
                    //         console.log(userdetails);
                    //         res.render('answerthread',data);
                    //     }
                    // });
        
                    var data = {questions,answerslist};
                    console.log(data);
                    console.log(questions);
                    console.log(answerslist);
                    res.render('answerthread',data);
                }
            });

        }
    });

});


router.post('/addanswer-:ques_id', checkToken,(req, res)=>{

    var ques_id = req.params.ques_id;
    var ans_text = req.body.ans_text;
    console.log(ques_id);

    var query = `INSERT INTO answer_details SET ans_text = '${ans_text}', ques_id = '${ques_id}';`

    myConn.query(query,(err,result) =>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect(`answers-${ques_id}`);
        }
    });
    
});




router.get('/campustour',checkToken, (req, res) => {
    res.render('campustour');
});


module.exports = router;