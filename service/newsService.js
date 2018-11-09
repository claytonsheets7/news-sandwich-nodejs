const processArticles = function(articles, positive, usuallyPositive, negative) {
	return sortArticles(filterArticles(articles, positive, usuallyPositive, negative));
};

const filterArticles = function(articles, positive, usuallyPositive, negative){
	const positiveWords = new Set(positive);
	const usuallyPositiveWords = new Set(usuallyPositive);
	const negativeWords = new Set(negative);
	
	let filteredArticles = [];
	
	for(let i=0; i<articles.length; i++) {
		let article = articles[i];
		article.weight = 0;
		let words = article.title.split(' ');
		let descriptionWords = article.description.split(' ');
		
		for(var word in descriptionWords) {
			words.push(word);
		}
		
		for(var word in words) {
			if(negativeWords.has(word)) {
				break;
			} else if(positiveWords.has(word)) {
				article.weight += 3;
			} else if(usuallyPositiveWords.has(word)) {
				article.weight++;
			}
		}
		
		if(article.weight !== 0) {
			filteredArticles.push(article);
		}
	}
	return filteredArticles;
};

const sortArticles = function(articles) {
	articles.sort(function(a, b) {
		return a.weight - b.weight;
	});
	return articles;
};

module.exports.processArticles = processArticles;