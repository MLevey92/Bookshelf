// this code is for the functionality of the bookshelf dashboard
// ideally would utilize flex box to organize book divs onto a shelf
// books are added via searching OpenLibrary API and then saving that book result

// TEST DATA
const books = [
  { title: 'Tao Te Ching', author: 'Laozi', coverEditionKey: 'OL698428M' },
  { title: 'Brave New World', author: 'Aldous Huxley', coverEditionKey: 'OL37076926M' },
];

document.addEventListener('DOMContentLoaded', () => {
  const bookshelfContainer = document.querySelector('.bookshelf-container');
// for creating the actual boxes for each book saved to bookshelf
  const createBookDiv = (book) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book-card');
    bookDiv.dataset.title = book.title;
    bookDiv.dataset.author = book.author;
    bookDiv.dataset.coverEditionKey = book.coverEditionKey;

    const bookCover = document.createElement('img');
    bookCover.src = `https://covers.openlibrary.org/b/olid/${book.coverEditionKey}-M.jpg`;
    bookCover.alt = `Book Cover for ${book.title}`;
    bookCover.classList.add('book-cover');
    bookDiv.appendChild(bookCover);

    bookshelfContainer.appendChild(bookDiv);

    // add a click event listener to each book div
    bookDiv.addEventListener('click', () => {
      showBookDetails(book);
    });
  };

  const showBookDetails = (book) => {
    const loggedIn = true; // I NEED HELP WITH THIS PART

    // will create item for book details we've already pulled from API
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('book-details-container');

    // Check if the user is logged in
    if (loggedIn) {
      // Create HTML structure similar to book.handlebars
      const bookCard = document.createElement('div');
      bookCard.classList.add('book-card');

      const bookCover = document.createElement('img');
      bookCover.src = `https://covers.openlibrary.org/b/olid/${book.coverEditionKey}-M.jpg`;
      bookCover.alt = `Book Cover for ${book.title}`;
      bookCover.classList.add('book-cover');

      const bookInfo = document.createElement('div');
      bookInfo.classList.add('book-info');

      const titleElement = document.createElement('h2');
      titleElement.textContent = book.title;

      const ratingElement = document.createElement('p');
      ratingElement.textContent = `Readers Rated this book: ${book.ratings_average} out of 5`;

      const authorElement = document.createElement('p');
      authorElement.textContent = `Author: ${book.author_name}`;

      const yearElement = document.createElement('p');
      yearElement.textContent = `First Published Year: ${book.first_publish_year}`;

      const introElement = document.createElement('p');
      introElement.textContent = `Book Intro: ${book.first_sentence}`;

      const addButton = document.createElement('button');
      addButton.classList.add('add-book-btn');
      addButton.textContent = 'Add to Bookshelf';
      addButton.onclick = () => addToBookshelf(book.title, book.author_name, book.coverEditionKey);

      bookInfo.appendChild(titleElement);
      bookInfo.appendChild(ratingElement);
      bookInfo.appendChild(authorElement);
      bookInfo.appendChild(yearElement);
      bookInfo.appendChild(introElement);

      bookCard.appendChild(bookCover);
      bookCard.appendChild(bookInfo);
      bookCard.appendChild(addButton);

      detailsContainer.appendChild(bookCard);
    } else {
      // make sure user has to be logged in to do this
      const loginLink = document.createElement('a');
      loginLink.href = '/';
      loginLink.textContent = 'You must login to build your bookshelf';
      detailsContainer.appendChild(loginLink);
    }

    // append the details container to the document body or another target element
    document.body.appendChild(detailsContainer);
  };

  // fetch user's books from the server and populate the bookshelf
  fetch('/api/bookshelf')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const savedBooks = data.books;
        savedBooks.forEach(book => {
          createBookDiv(book);
        });
      } else {
        console.error('Error; looks like we have misplaced your books:', data.error);
      }
    })
    .catch(error => {
      console.error('Error; looks like we have misplaced your books:', error);
    });
});

