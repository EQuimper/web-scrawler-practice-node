const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

request("https://news.ycombinator.com/news", function(err, resp, body) {
	if(err) {
		console.log(`ERROR: ${err}`);
	}
	console.log(`STATUS CODE: ${resp.statusCode}`);

	const $ = cheerio.load(body);

	const arr = [];

	$('tr.athing:has(td.votelinks)').each(function( index ) {
		const title = $(this).find('td.title > a').text().trim();
		const link = $(this).find('td.title > a').attr('href');

		const obj = { title,link};

		arr.push(obj);
	});
	fs.appendFileSync('hackernews.json', JSON.stringify(arr, null, 4), 'utf8', err => {
		if (err) console.log(err);
	});
});