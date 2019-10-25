const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// process.env.port might be here later
const PORT = 3000;

// require our database
require('./db/db.js');

// middleware
app.set('views', __dirname);
app.set('view engine', 'ejs');

// root route
app.get('/', (req, res) => {
    res.send('hello world!')
});

app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT); 
});