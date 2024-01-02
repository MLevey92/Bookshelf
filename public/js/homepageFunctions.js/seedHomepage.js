const { spacesToPlusesAndTrim, fetchData } = require("../functionIndex");

const apiUrl = "https://openlibrary.org/search.json?q=&subject=book&fields=title,key,author_name,author_key,first_sentence,ratings_average&limit=50&sort=rating desc";
fetchData(apiUrl);