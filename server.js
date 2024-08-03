const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser'); 
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); // Move on to the next phase
}
app.use(logRequest);


//add auth file
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false})

app.get('/',localAuthMiddleware,function (req, res) {
    res.send('Welcome to our Hotel');
})

// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuRouters');

// Use the routers (add middleware for check hashpasword)
app.use('/', personRoutes);
app.use('/', menuItemRoutes);


// Serve static files from the 'uploads' folder
app.use('/uploads', express.static('uploads'));
  
app.listen(PORT, ()=>{
    console.log('listening on port 3000');
})