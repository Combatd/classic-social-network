const express = require('express');
const app = express();
const mongoose = require('mongoose');

// process.env.port might be here later
const PORT = 3000;

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