const fs = require('fs');
const csv = require('csv');
const googleNewsClient = require('./../googleNewsClient.js');

const readCSV = function(filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, 'utf8', function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data.split(','));
            }
        });
    });
};

const positiveWords = readCSV('./csv/positive.csv');
const usuallyPositiveWords = readCSV('./csv/usuallypositive.csv');
const negativeWords = readCSV('./csv/negative.csv');
const sources = readCSV('./csv/sources.csv');

const loadCSVs = function() {
	Promise.all([sources, positiveWords, usuallyPositiveWords, negativeWords])
	.then(function(values) {
		for(let i=0; i<values.length; i++) {
			const sourceIDs = values[0];
			const positive = values[1];
			const usuallyPositive = values[2];
			const negative = values[3];
			googleNewsClient.fetchArticles(sourceIDs, positive, usuallyPositive, negative);
		}
	});
};

module.exports.loadCSVs = loadCSVs;