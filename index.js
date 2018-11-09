const port = 8080;
const express = require('express');
const app = express();
const googleNewsClient = require('./googleNewsClient.js');
const keywordLoader = require('./parser/keywordLoader.js');

app.get('/', (request, response) => {
	googleNewsClient.getCache();
});

app.listen(port, (err) => {
	if(err) {
		return console.log('An error occured', err);
	}
});

console.log(keywordLoader.loadCSVs(), "this is the real output");