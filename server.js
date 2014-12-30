// Allt sem þarf til þess að appið virki
var express = require('express'),
	fs      = require('fs'),
	request	= require('request'),
	cheerio = require('cheerio'),
	app     = express();

app.get('/scrape', function(req, res) {



});

app.listen('8080');

console.log('Server kominn i gang a porti 8080!');

exports = module.exports = app;