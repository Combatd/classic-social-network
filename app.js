const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const User = require('./models/users');

// process.env.port might be here later
const PORT = 3000;

// require our database
require('./db/db.js');

// set up pug
// const pug = require('pug');

// const fn = pug.compile('string of pug', options);
// const html = fn(locals);



// middleware
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(methodOverride('_method'));//must come before our routes
app.use(bodyParser.urlencoded({ extended: false }));

// root route
app.get('/', (req, res) => {
    res.render('index');
});

// register show (GET) route
app.get('/register', (req, res) => {
    console.log(req.body);

    res.render('register.ejs', {

    });
            

});

app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT); 
});