
// --------------------------------------------------------------------------------------

const apiUrl =
  "https://openlibrary.org/search.json?q=&subject=book&fields=title,cover_edition_key,author_name,author_key,first_sentence,first_publish_year,ratings_average&limit=20&sort=rating desc";

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
      first_sentence: getFirstEnglishSentence(book.first_sentence),
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
          <button class="save-button">Save this!</button>
        </div>`;

      cardFormats += cardFormat;
    }

    const featuredBooks = document.querySelector("#featured-books");
    featuredBooks.innerHTML = cardFormats; // Update innerHTML once

    const saveButtons = document.querySelectorAll(".save-button");
    saveButtons.forEach((button, index) => {
      button.addEventListener("click", async () => {
        // Access the corresponding book information using the resultArray
        const selectedBook = resultArray[index];
        handleSaveButtonClick(selectedBook, index);

        // ? Log the information to the console (you can replace this with your actual save logic)
        // console.log("Save this book:", selectedBook);
      });
    });

    // ? Console logging the already clean array
    // console.log(resultArray);
  } catch (error) {
    console.error("Error getting books", error.message);
    return []; // Return an empty array in case of an error
  }
}

document.addEventListener("DOMContentLoaded", () => {
  processBooks();
});
