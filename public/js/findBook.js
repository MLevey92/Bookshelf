const formEl = document.getElementById("searchForm");
const resultsEl = document.getElementById("results");
const inputEl = document.getElementById("input");
const searchResults = document.querySelector("#results");

function formHandler(event) {
  event.preventDefault();

  searchResults.innerHTML = "";

  const searchBy = getRadioValue();
  const queryURL = `https://openlibrary.org/search.json?${searchBy}=${spacesToPlusesAndTrim(
    inputEl.value
  )}&subject=book&fields=title,cover_edition_key,author_name,author_key,first_sentence,first_publish_year,ratings_average&limit=10`;

  appendResults(queryURL);
}

//simply gets the data and returns it
async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let data = await response.json();
    data = data.docs;

    return data;
  } catch (error) {
    console.error("Error during fetch:", error.message);
  }
}

//Calls fetch data, formats result, and creates search result section
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

    //create and append to searchResults
    for (let i = 0; i < resultArray.length; i++) {
      var searchCard = document.createElement("div");
      searchCard.classList.add("search-card");

      var titleEl = document.createElement("h4");
      titleEl.textContent = resultArray[i].title;
      searchCard.appendChild(titleEl);

      var imgEl = document.createElement("img");
      imgEl.src =
        src = `https:covers.openlibrary.org/b/olid/${resultArray[i].cover_edition_key}-M.jpg`;
      searchCard.appendChild(imgEl);

      var yearEl = document.createElement("p");
      yearEl.textContent = `Year: ${resultArray[i].first_publish_year}`;
      searchCard.appendChild(yearEl);

      var ratingEl = document.createElement("p");
      ratingEl.textContent = `Rating: ${resultArray[i].ratings_average}`;
      searchCard.appendChild(ratingEl);

      var authorEl = document.createElement("p");
      authorEl.textContent = `Author: ${resultArray[i].author_name}`;
      searchCard.appendChild(authorEl);

      //this button will call postBook with book info corresponding to the pressed button
      var addButton = document.createElement("button");
      addButton.textContent = "Add to Shelf";
      addButton.classList.add("text-white", "text-white", "bg-green-800", "hover:bg-green-900", "focus:ring-4", "focus:ring-blue-300", "font-medium", "rounded-lg", "text-sm", "px-5", "py-2.5", "me-2", "mb-2", "dark:bg-blue-600", "dark:hover:bg-blue-700", "focus:outline-none", "dark:focus:ring-blue-800", "col-span-2");

      //These add properties to each button corresponding to it's book info
      addButton.title = resultArray[i].title;
      addButton.cek = resultArray[i].cover_edition_key;
      addButton.ratingAvg = resultArray[i].ratings_average;
      addButton.first_s = resultArray[i].first_sentence;
      addButton.year = resultArray[i].first_publish_year;
      addButton.a_name = resultArray[i].author_name;
      addButton.a_key = resultArray[i].author_key;
      addButton.addEventListener("click", function (e) {
        postBook(
          e.target.cek,
          e.target.title,
          e.target.ratingAvg,
          e.target.first_s,
          e.target.year,
          e.target.a_name,
          e.target.a_key
        );
      });
      searchCard.appendChild(addButton);

      searchResults.appendChild(searchCard);
    }
  } catch (error) {
    console.error("Error getting books", error.message);
    return []; // Return an empty array in case of an error
  }
}

function postBook(cek, title, rating, first_s, year, a_name, a_key) {
  //log just checks the info. TODO: change this to a POST request

  console.log(`Posting a new book with info:
                    cover_edition_key: ${cek}
                    title: ${title},
                    ratings_average: ${rating},
                    first_sentence: ${first_s},
                    first_publish_year: ${year},
                    author_name: ${a_name},
                    author_key: ${a_key}`);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cover_edition_key: cek,
      title: title,
      ratings_average: rating,
      first_sentence: "",
      first_publish_year: year,
      author_name: a_name,
      author_key: a_key,
    }),
  };

  fetch("/api/books", requestOptions)
    .then((response) => {
      if (response.ok) {
        console.log("Book saved successfully!");
      } else {
        console.error("Failed to save book: ", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error saving book: ", error.message);
    });
}

//Get value of checked radio button, used in query
function getRadioValue() {
  const radios = document.getElementsByName("searchBy");

  for (i = 0; i < radios.length; i++) {
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

//form submit handler
formEl.addEventListener("submit", formHandler);
