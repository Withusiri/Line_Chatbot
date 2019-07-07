const express = require('express');
const bodyParser = require('body-parser')
const myRoute = require('./routes/myRoute');

const app = express();

// Middleware
app.use(bodyParser.json());

// Run server
app.listen(9999, (req,res) => console.log('Server Listening on port 9999'));

// Route
app.use('/weather', myRoute);
