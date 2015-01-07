// --------------- 
//Allt sem þarf til þess að appið virki
// --------------- 
var express   = require('express');
var request   = require('request');
var cheerio   = require('cheerio');
var app       = express();

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
	var url = 'http://www.mbl.is/leiga/';

	// Biða um gögn frá url
	// Fyrsti parameter er url
	// Næst er callback sem tekur error, response og html
	request(url, function(error, response, html) {
		if (error) {
			// Ef error, senda json með error
			return res.status(500).json({error: 'Síðan svarar ekki'});
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

			$('.rental-itemlist-property').each(function() {
				// Ná í address
				address = $(this).find('.rental-itemlist-headline').text().trim();

				// Ná í price
				price = $(this).find('.rental-itemlist-price').text().trim();

				// Ná í info
				house_info = $(this).find('.rental-itemlist-maininfo').text().trim();

				// Ńá í lýsingu um hús
				house_text = $(this).find('.rental-itemlist-maintext').text().trim();

				// Ná í myndir við hverja fasteign
				var images = [];
				$(this).find('.rental-itemlist-image').each(function() {
					var single_image = $(this).find('img').attr('src');
					images.push(single_image);
				});

				// Bæta í arrayið
				houses.results.push({
					address: address,
					price: price,
					house_info: house_info,
					house_text: house_text,
					images: images
				});
			});

			return res.json(houses);
		}
	});
});

// Visir.is leiguhúsnæði
app.get('/api/visir', function(req, res) {
	// URLið sem við viljum scrapa
	var url = 'http://fasteignir.visir.is/search/results/?stype=rent#/?timespan=7&stype=rent';

	// Biða um gögn frá url
	// Fyrsti parameter er url
	// Næst er callback sem tekur error, response og html
	request(url, function(error, response, html) {
		if (error) {
			// Ef error, senda json með error
			return res.status(500).json({error: 'Síðan svarar ekki'});
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
			var address, price, size, type, rooms;

			$('.b-products-item-list ').each(function() {
				// Ná í address
				// address = $(this).find('.b-products-item-details a').first().text().trim();

				// Bæta í arrayið
				houses.results.push({
					address: address
				});
			});

			return res.json(houses);
		}
	});
});

// Dv.is leiguhúsnæði
app.get('/api/dv', function(req, res) {
	// URLið sem við viljum scrapa
	var url = 'http://fasteignir.dv.is/list';

	request.get({
		headers: {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.66 Safari/535.11'},
		url: url
	}, function(error, response, html) {
		if (error) {
			// Ef error, senda json með error
			console.log(error);
			return res.status(500).json({error: 'Síðan svarar ekki'});
		} else {
			// Ef ekkert error
			// Notum cheerio sem virkar svipað og jQuery
			try {
				var $ = cheerio.load(html);
			} catch (e) {
				console.log(e);
				return res.status(500).json({error: 'Get ekki hlaðið síðunni'});
			}

			// Geymum öll húsnæðin hérna
			var houses = {
				results: []
			};

			// Hvað ætlum við að geyma
			var address, price, size, type, rooms;

			$('table tr td').each(function() {
				var house_size = $(this).text();
				console.log(house_size);
			});

			$('.webportal_property_list_row').each(function() {
				// Ná í address
				address = $(this).find('.webportal_tag_street').first().text();

				// Bæta í arrayið
				houses.results.push({
					address: address
				});
			});

			return res.json(houses);
		}
	});
});

// Tilleigu.is leiguhúsnæði
app.get('/api/tilleigu', function(req, res) {
	// URLið sem við viljum scrapa
	var url = 'http://www.tilleigu.is/ibudarhusnaedi/';

	// Biða um gögn frá url
	// Fyrsti parameter er url
	// Næst er callback sem tekur error, response og html
	request(url, function(error, response, html) {
		if (error) {
			// Ef error, senda json með error
			return res.status(500).json({error: 'Síðan svarar ekki'});
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
			var address, price, size, type, rooms;

			$('.PropertyListItem').each(function() {
				// Ná í address
				address = $(this).find('.Info h3').text().trim();

				// Bæta í arrayið
				houses.results.push({
					address: address
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