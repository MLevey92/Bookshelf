// ! This function cleans form inputs before fetching data with them
// ? Turns this: "   the  lion   the   witch  and  the  wardrobe  " Into this: "the+lion+the+witch+and+the+wardrobe"
function spacesToPlusesAndTrim(inputString) {
  // Trimming whitespace from both ends first
  inputString = inputString.trim();
  // Use the replace method with a regular expression to replace all spaces with '+'
  const resultString = inputString.replace(/ +/g, "+");
  return resultString;
}

// ! function to make a fetch request (GET) with a given URL
async function fetchData(url) {
  try {
    // Step 1: Use fetch to make the request
    const response = await fetch(url);

    // Step 2: Wait for the response
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Step 3: Parse the JSON data
    let data = await response.json();
    // each Book is nestled in the 'docs' array from the api
    data = data.docs;

    // You can now work with the 'data' object
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error during fetch:", error.message);
  }
}

// ! Lil function to turn 4.7619047 into 4.8
function roundToTenths(number) {
  return Number(number.toFixed(1));
}

// --------------------------------------------------------------------------------------

const apiUrl =
  "https://openlibrary.org/search.json?q=&subject=book&fields=title,cover_edition_key,author_name,author_key,first_sentence,first_publish_year,ratings_average&limit=8&sort=rating desc";

async function processBooks() {
  try {
    const results = await fetchData(apiUrl);

    const resultArray = results.map((book) => ({
      title: book.title,
      cover_edition_key: book.cover_edition_key,
      first_publish_year: book.first_publish_year,
      ratings_average: book.ratings_average
        ? roundToTenths(book.ratings_average)
        : null,
      first_sentence: book.first_sentence ?? null,
      author_key: book.author_key ? book.author_key[0] : null,
      author_name: book.author_name
        ? book.author_name[0] === "n/a"
          ? null
          : book.author_name[0]
        : null,
    }));

    let cardFormats = "";

    for (const book of resultArray) {
      // TODO: give the stuff in cardFormat classes that you can style in the CSS
      const cardFormat = `
        <div class="seed-card">
          <h4>Title: ${book.title}</h4>
          <img src="https:covers.openlibrary.org/b/olid/${
            book.cover_edition_key
          }-M.jpg"/>
          <p>Year: ${book.first_publish_year}</p>
          <p>Rating: ${book.ratings_average}</p>
          ${
            book.first_sentence !== null
              ? `<p>First Sentence: ${book.first_sentence}</p>`
              : ""
          }
          <p>Author: ${book.author_name}</p>
        </div>`;

      cardFormats += cardFormat;
    }

    const featuredBooks = document.querySelector("#featured-books");
    featuredBooks.innerHTML = cardFormats; // Update innerHTML once

    // Console logging the already clean array
    console.log(resultArray);
  } catch (error) {
    console.error("Error getting books", error.message);
    return []; // Return an empty array in case of an error
  }
}

document.addEventListener("DOMContentLoaded", () => {
  processBooks();
});
