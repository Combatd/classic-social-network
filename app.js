const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

// process.env.port might be here later
const PORT = 3000;

// require our database
require('./db/db.js');

// session control
app.use(session({
    secret: "this is a random secret string", // is the key that opens up our session
    // which is always stored on the server
    resave: false, // only save our session when we add/or mutate
    // a property
    saveUninitialized: false // only save the cookie when
    // we add a property to it, When the user logs in or registers
    // we only really want to add stuff to our session after user
    // logs in or registers to comply with the law
}));


// middleware
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(methodOverride('_method'));//must come before our routes
app.use(bodyParser.urlencoded({ extended: false }));



const usersController = require('./controllers/users.js');
app.use('/auth', usersController)


// root route
app.get('/', (req, res) => {
    res.render('index');
});

// register show (GET) route
app.get('/register', (req, res) => {

    res.render('register.ejs', {

    });
            

});

app.get('/login', (req, res) => {
    

    res.render('login.ejs', {
        
    });

});

app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT); 
});