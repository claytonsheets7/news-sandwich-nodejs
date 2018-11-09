const article = require('./Article.js');
const keywordLoader = require('./parser/keywordLoader.js');
const newsService = require('./service/newsService.js');
const baseURL = 'https://newsapi.org/v2';
const googleAPIKey = 'edd0276dc8344c2abaeb40a3f6fb439f';
const request = require('request');

let cachedArticles = [];

const fetchSources = function() {
	return new Promise(function(resolve, reject){
		const URL =  baseURL + '/sources?apiKey=' + googleAPIKey + '&language=en';
		request(URL, function (error, response, body) {
	        try {
	            resolve(body);
	        } catch(e) {
	            reject(e);
	        }
	    });
	});
};

const fetchHeadlines = function() {
	return new Promise(function(resolve, reject){
		const URL = baseUrl + '/top-headlines?sources=google-news&apiKey=' + apiKey + '&language=en';
		request(URL, function (error, response, body) {
	        try {
	            resolve(body);
	        } catch(e) {
	            reject(e);
	        }
	    });
	});
};

const parseSources = function(sources) {
	sources = JSON.parse(sources).sources;
	let sourceIDs = [];
	for(let i=0; i<sources.length; i++) {
		sourceIDs.push(sources[i].id);
	}
	return sourceIDs;
};

const extractArticles = function(response) {
	const json = JSON.parse(response).articles;
	let articles = [];
	
	for(let i=0; i<json.length; i++) {
		let article = {};
		article.title = json[i].title;
		article.description = json[i].description;
		article.url = json[i].url;
		article.urlToImage = json[i].urlToImage;
		articles.push(article);
	}
	return articles;
};

const fetchHeadlineArticles = function(sourceID) {
	return new Promise(function(resolve, reject){
		const URL =  baseURL + '/top-headlines?sources=' + sourceID + '&apiKey=' + googleAPIKey + '&language=en';
		request(URL, function (error, response, body) {
	        try {
	            resolve(body);
	        } catch(e) {
	            reject(e);
	        }
	    });
	});
};

const fetchArticles = function(sourceIDs, positive, usuallyPositive, negative) {
	let promises =[];
	let articles = [];

	for(let i=0; i<2; i++) {
		promises.push(fetchHeadlineArticles(sourceIDs[i]));
	}

	Promise.all(promises).then((responses) => {
		
		for(let i=0; i<responses.length; i++) {
			let extractedArticles = extractArticles(responses[i]);
			for(let j=0; j<extractedArticles.length; j++) {
				articles.push(extractedArticles[j]);
			}
		}
		console.log(articles, "all of those articles");
		console.log(articles.length, "length of the article list");
//		cachedArticles = articles;
		cachedArticles = newsService.processArticles(articles, positive, usuallyPositive, negative)
	}).catch(err => console.log(err));
};

const getCache = function() {
	console.log(cachedArticles);
	return cachedArticles;
};

module.exports.fetchArticles = fetchArticles;
module.exports.getCache = getCache;