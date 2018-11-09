const { attributes } = require('structure');

const Article = attributes({
	title: String,
	description: String,
	url: String,
	urlToImage: String,
	sourceID: String,
	weight: Number
});

module.exports = Article;