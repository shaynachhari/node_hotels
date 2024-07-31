const express = require('express');
const app = express();
const db = require('./db');                 
const bodyParser = require('body-parser');       
app.use(bodyParser.json());

app.get("/home", (req,res)=>{
    res.send("WELCOME TO OUR HOTELS!!!")
})

//import the router file for person
const personRoutes = require('./routes/personRoutes')
const menuRouters = require('./routes/menuRouters')
// use the routers
app.use('/', personRoutes)
app.use('/', menuRouters)

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
