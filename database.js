//database connestion goes here
// database connection code

const mysql = require("mysql");

const dotenv = require('dotenv');


dotenv.config({path: './.env'});

// endpoints for the database connecting to the app
const conn = mysql.createConnection({
  
    host : process.env.DATABASE_HOST,
    database : process.env.DATABASE,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    multipleStatements: true
});

conn.connect( (err) =>{
    if(err){
        console.log("Databse connectionn Error ..!!!!! ");
    }
    else
        console.log("Database Connected Successfully ... !!! ");
});

module.exports = conn;
