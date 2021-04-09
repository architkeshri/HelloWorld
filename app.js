const express = require('express');
const app = express();

const port = 5000;

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);



app.get('/',(req,res)=>{
    res.render("index.ejs");
});

app.listen(port, () => {

    console.log(`Server is up and Running on localhost ${port}`);
});