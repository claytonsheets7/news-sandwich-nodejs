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
		let words = [];
		if (typeof article.title != 'undefined' && article.title != null) {
			words = article.title.split(' ');
		}
		let descriptionWords = [];
		if (typeof article.description != 'undefined' && article.description != null) {
			descriptionWords = article.description.split(' ');
		}
		
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
		return b.weight - a.weight;
	});
	return articles;
};

module.exports.processArticles = processArticles;