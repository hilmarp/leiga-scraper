// Allt sem þarf til þess að appið virki
var express = require('express'),
	app     = express();

// Public skrárnar
app.use(express.static(__dirname + '/public'));

// Routes
require('./app/routes')(app);

// Keyra appið í gang
app.listen('8080');

console.log('\nServer kominn i gang a porti 8080!');

exports = module.exports = app;