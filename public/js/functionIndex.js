const fetchData = require("./helpfulFunctions/fetchData");
const spacesToPlusesAndTrim = require("./helpfulFunctions/spacesToPlusesAndTrim");
const cleanupOLkey = require("./helpfulFunctions/cleanupOLkey");

module.exports = { fetchData, spacesToPlusesAndTrim, cleanupOLkey };

// forminput = "    the    lion the witch and the wardrobe      ";
// inputstring = spacesToPlusesAndTrim(forminput);
// const titleSearchUrl = `https://openlibrary.org/search.json?title=${inputstring}&fields=title,first_publish_year,author_key,author_name,first_sentence,person,place,key,ratings_average`;

// console.log(inputstring);
