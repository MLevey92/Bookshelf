const formEl = document.getElementById("searchForm");
const resultsEl = document.getElementById("results");
const inputEl = document.getElementById("input");


function formHandler(event) {
    event.preventDefault();

    const searchBy = getRadioValue();
    const queryURL = `https://openlibrary.org/search.json?${searchBy}=${spacesToPlusesAndTrim(inputEl.value)}&subject=book&fields=title,cover_edition_key,author_name,author_key,first_sentence,first_publish_year,ratings_average`;
    
    appendResults(queryURL);
}

async function fetchData(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        
        let data = await response.json();
        data = data.docs;

        return data;
    } catch (error) {
        console.error("Error during fetch:", error.message);
    }

}

async function appendResults(queryURL) {
  try {
    const results = await fetchData(queryURL);

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
          <!-- cutting first sentence to make search sleeker
          ${
            book.first_sentence !== null
              ? `<p>First Sentence: ${book.first_sentence}</p>`
              : ""
          }
          -->
          <p>Author: ${book.author_name}</p>
          {{#if logged_in}}
            <p>add book</p>
          {{else}}
            <p>login to add book</p>
          {{/if}}
        </div>`;

      cardFormats += cardFormat;
    }

    const featuredBooks = document.querySelector("#results");
    featuredBooks.innerHTML = cardFormats; // Update innerHTML once

    // Console logging the already clean array
    console.log(resultArray);
  } catch (error) {
    console.error("Error getting books", error.message);
    return []; // Return an empty array in case of an error
  }
}

//Get value of checked radio button, used in query
function getRadioValue() {
    const radios = document.getElementsByName("searchBy");

    for (i=0;i<radios.length;i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}


//helper functions
function spacesToPlusesAndTrim(inputString) {
  // Trimming whitespace from both ends first
  inputString = inputString.trim();
  // Use the replace method with a regular expression to replace all spaces with '+'
  const resultString = inputString.replace(/ +/g, "+");
  return resultString;
}

// ! Lil function to turn 4.7619047 into 4.8
function roundToTenths(number) {
  return Number(number.toFixed(1));
}

formEl.addEventListener("submit", formHandler)