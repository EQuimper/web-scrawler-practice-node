const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const URL_TO_CRAWL = 'https://www.reddit.com';
const FILE_TO_CREATE = 'reddit.json';

request(URL_TO_CRAWL, (err, resp, body) => {
	if (err) {
		console.log(`ERROR: ${err}`);
	}
	console.log(`Status code: ${resp.statusCode}`);

	const $ = cheerio.load(body);

	const arr = [];

	$('div#siteTable > div.link').each(function(index) {
		const title = $(this).find('p.title > a.title').text().trim();
		const score = $(this).find('div.score.unvoted').text().trim();
		const user = $(this).find('a.author').text().trim();

		const obj = { title, score, user };

		return arr.push(obj);
	});
	fs.appendFileSync('reddit.json', JSON.stringify(arr, null, 4), 'utf8', err => {
		if (err) {
			console.log(`ERROR on the file : ${err}`);
		}
	});
});