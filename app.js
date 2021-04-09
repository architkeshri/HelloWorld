const express = require('express');
const myConn = require("./database");
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
 
const app = express();

const cookieParser = require('cookie-parser');

dotenv.config({path: './.env'});

const port = 5000;

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json())
//ROUTES
app.use('/',require('./routes/pages'));

app.use('/auth',require('./routes/auth'));






app.listen(port, () => {

    console.log(`Server is up and Running on localhost ${port}`);
});