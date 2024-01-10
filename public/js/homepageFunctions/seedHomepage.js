

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

    let cardFormats = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">`;

    for (const book of resultArray) {
      const cardFormat = `
        <div class="saved-books border p-4 mb-2 mt-8 flex flex-col items-center">
          <img src="https:covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg" class="mb-1" />
          <h3 class="text-xl mb-2"><strong>${book.title}</strong></h3>${book.first_sentence !== null? `<p><em>"${book.first_sentence}"</em></p>`: ""}
          <p><em>(First published in ${book.first_publish_year})</em></p>
          <p><strong>Avg. Rating: </strong>${book.ratings_average} out of 5</p>
          <p><strong>Author: </strong> ${book.author_name}</p>
          <button class="show-add-to-shelf-form-button bg-green-800 text-white py-2 px-4 rounded hover:bg-green-900 hover:text-gray-100"
            data-book-id="${book.id}">Add to Bookshelf</button>
        </div>`;

      cardFormats += cardFormat;
    }

    cardFormats += `</div>`;

    const featuredBooks = document.querySelector("#featured-books");
    featuredBooks.innerHTML = cardFormats;

    const saveButtons = document.querySelectorAll(".show-add-to-shelf-form-button");
    saveButtons.forEach((button, index) => {
      button.addEventListener("click", async () => {
        const selectedBook = resultArray[index];
        handleSaveButtonClick(selectedBook, index);
      });
    });
  } catch (error) {
    console.error("Error getting books", error.message);
    return [];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  processBooks();
});
