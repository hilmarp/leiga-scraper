// Ná í modules sem þarf að nota
var request = require('request'),
	cheerio = require('cheerio'),
	path    = require('path');


module.exports = function(app) {

	// Server routes
	app.get('/api/mbl-leiga', function(req, res) {

		// Náum í fasteignir frá þessu URLi
		url = 'http://www.mbl.is/leiga/';

		// Keyrum request
		request(url, function(error, response, html) {

			if (!error) {

				// Notum Cheerio á HTML sem kemur til baka
				var $ = cheerio.load(html);

				// Array til að geyma upplýsingar
				var houses = {};

				// Hvað eru margar fasteignir?
				// var house_count = $('.rental-itemlist-property').length;

				// Upplýsingar sem við erum að ná í
				var address, price, house_info;

				// Upplýsingar um öll húsnæði í array
				$('.rental-itemlist-property').each(function(index) {

					// Ná í address
					address = $(this).find('.rental-itemlist-headline').text();

					// Ná í price
					price = $(this).find('.rental-itemlist-price').text();

					// Ná í info um húsnæði
					house_info = $(this).find('.rental-itemlist-maininfo').text();

					// Setja í array object
					houses[index] = {address: address, price: price, info: house_info};

				});

				// Breyta array object í json
				// var json = JSON.stringify(houses);

			}

			// Senda til baka húsin sem json
			res.json(houses);

		});

	});

	// Frontend routes, Angular höndlar þær
	app.get('*', function(req, res) {

		res.sendFile(path.join(__dirname, '../public/views', 'index.html'));

	});

};