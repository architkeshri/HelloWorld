const myConn = require("../database");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { use } = require("../routes/pages");



// Register Function
exports.register = (req, res) =>{
  
    const {userName, dept, password, confirmPassword, email, contact,regNo, yr} = req.body;

    
    var checkEmail = email.split('@');
    console.log(checkEmail);
    if(checkEmail[1] != 'mnnit.ac.in'){
        return res.render('login',{message : 'Please Enter Valid Gusite ID'});
    }

    var query = `SELECT email FROM user_details WHERE email = "${email}" or reg_no = "${regNo}";`;
    myConn.query(query, async  (err, results) => {

        if(err){
            console.log(err);
        }
        
            
        if(results.length > 0){
            return res.render('login',{
                message: 'User already exists!'

            });
        }
        else if(password != confirmPassword){
            return res.render('login',{
                message: 'Passwords did not match!'
            });


        }
        



        let hashedPassword = await bcrypt.hash(password,8);
        var query = `INSERT INTO user_details set username = ?, email = ?, pswd = ?, reg_no = ?, dept = ?, yr = ?, contact = ?`;

        myConn.query(query,[userName, email, hashedPassword, regNo, dept, yr, contact],(err, results) =>{

            if(err){
                console.log(err);
            }
           
            else{
            
                return res.render('login',{
                    message: 'User registered!'
                });
            }

        });
        
    });

}


exports.login = async (req,res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).render('login', {
                message : 'Please provide an email and password!'
            })
        }

        myConn.query('SELECT * FROM user_details WHERE email = ?', [email], async (error,results) => {
           
            console.log(results);

            if(error){
                console.log(error);
            }
        
            if(!results || !(await bcrypt.compare(password, results[0].pswd)) ) {
                res.status(401).render('login', {
                    password: 'Invalid Credentials!'
                })
            }

            else {
                const user_id = results[0].user_id;
                //console.log(results[0].user_id);
                const token = jwt.sign({user_id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPRIES_IN
                });
                
               

                // Setting token to cookie
                const cookiename = {
                    expires: new Date(
                        Date.now() + (process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000)
                    ),
                    
                    httpOnly: true  
                }

                 res.cookie('authcookie', token, cookiename) ; 

                res.redirect('/home');
               
            }
        });

    } catch (error) {
        console.log(error);
    }
}

exports.logout = (req, res) =>{

    res.cookie('authcookie','',{maxAge : 1});
    res.redirect('/');
}