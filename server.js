// Allt sem þarf til þess að appið virki
var express = require('express'),
	fs      = require('fs'),
	request	= require('request'),
	cheerio = require('cheerio'),
	app     = express();

app.get('/leiga', function(req, res) {

	// Náum í fasteignir frá þessu URLi
	url = 'http://www.mbl.is/leiga/';

	// Keyrum request
	request(url, function(error, response, html) {

		if (!error) {

			// Notum Cheerio á HTML sem kemur til baka
			var $ = cheerio.load(html);

			// Upplýsingar sem við erum að ná í
			var address, price;
			var json = { address : "", price : "" };

			// Ná í address
			$('.rental-itemlist-property .rental-itemlist-headline').filter(function() {

				// Vista address
				address = $(this).text();

				// Bæta því í json object
				json.address = address;

			});

			// Ná í price
			$('.rental-itemlist-property .rental-itemlist-price').filter(function() {

				// Vista price
				price = $(this).text();

				// Bæta því í json object
				json.price = price;

			});

		}

		// Búa til json skrá með upplýsingunum af síðunni
		fs.writeFile('leiga.json', JSON.stringify(json, null, 4), function(err) {

			console.log('Skrá hefur verið búin til!');

		});

		res.send('Gáðu í console');

	});

});

app.listen('8080');

console.log('Server kominn i gang a porti 8080!');

exports = module.exports = app;