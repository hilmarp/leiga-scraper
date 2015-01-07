// --------------- 
//Allt sem þarf til þess að appið virki
// --------------- 
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

// --------------- 
// Stillingar
// --------------- 
app.use(express.static(__dirname + '/public'));

// --------------- 
// Routes
// --------------- 
// Mbl.is leiguhúsnæði
app.get('/api/mbl', function(req, res) {
	// URLið sem við viljum scrapa
	url = 'http://www.mbl.is/leiga/';

	// Biða um gögn frá url
	// Fyrsti parameter er url
	// Næst er callback sem tekur error, response og html
	request(url, function(error, response, html) {
		if (error) {
			// Ef error, senda json með error
			return res.status(500).json({error: 'Síðan svarar ekki'})
		} else {
			// Ef ekkert error
			// Notum cheerio sem virkar svipað og jQuery
			try {
				var $ = cheerio.load(html);
			} catch (e) {
				return res.status(500).json({error: 'Get ekki hlaðið síðunni'});
			}

			// Geymum öll húsnæðin hérna
			var houses = {
				results: []
			};

			// Hvað ætlum við að geyma
			var address, price, house_info, house_text;

			$('.rental-itemlist-property').each(function(index) {
				// Ná í address
				address = $(this).find('.rental-itemlist-headline').text().trim();

				// Ná í price
				price = $(this).find('.rental-itemlist-price').text().trim();

				// Ná í info
				house_info = $(this).find('.rental-itemlist-maininfo').text().trim();

				// Ńá í lýsingu um hús
				house_text = $(this).find('.rental-itemlist-maintext').text().trim();

				// Bæta í arrayið
				houses.results.push({
					address: address,
					price: price,
					house_info: house_info,
					house_text: house_text
				});
			});

			return res.json(houses);
		}
	});
});

// --------------- 
// Keyra appið í gang
// --------------- 
app.listen('3000');
console.log('\nServer kominn i gang a porti 3000!');