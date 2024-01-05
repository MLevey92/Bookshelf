// this code is for the functionality of the bookshelf dashboard
// ideally would utilize flex box to organize book divs onto a shelf
// books are added via searching OpenLibrary API and then saving that book result

/* TEST DATA
const books = [
  { title: 'Tao Te Ching', author: 'Laozi', coverEditionKey: 'OL698428M' },
  { title: 'Brave New World', author: 'Aldous Huxley', coverEditionKey: 'OL37076926M' },
];
*/

document.addEventListener('DOMContentLoaded', () => {
  const bookshelfContainer = document.querySelector('.bookshelf-container');
  const loggedIn = localStorage.getItem('token') !== null;

  const createBookDiv = (book) => {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book-card', 'box'); // box class is used in Bulma
    bookDiv.dataset.title = book.title;
    bookDiv.dataset.author = book.author;
    bookDiv.dataset.coverEditionKey = book.coverEditionKey;

    const bookCover = document.createElement('img');
    bookCover.src = `https://covers.openlibrary.org/b/olid/${book.coverEditionKey}-M.jpg`;
    bookCover.alt = `Book Cover for ${book.title}`;
    bookCover.classList.add('book-cover', 'is-180x290'); // size class is used in Bulma
    bookDiv.appendChild(bookCover);

    bookshelfContainer.appendChild(bookDiv);

    bookDiv.addEventListener('click', () => {
      showBookDetails(book);
    });
  };

  const showBookDetails = (book) => {
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('book-details-container');

    if (loggedIn) {
      // pull the same component/card layout as book.handlebars
      fetch('./views/book.handlebars')
        .then(response => response.text())
        .then(template => {
          // compile the template from the handlebars file
          const compiledTemplate = Handlebars.compile(template);
          const context = { Book: book, loggedIn: loggedIn };
          const renderedHtml = compiledTemplate(context);

          // append this data to the container
          detailsContainer.innerHTML = renderedHtml;
        })
        .catch(error => {
          console.error('Error fetching BookDetails.handlebars:', error);
        });
    } else {
      const loginLink = document.createElement('a');
      loginLink.href = '/';
      loginLink.textContent = 'You must login to build your bookshelf';
      detailsContainer.appendChild(loginLink);
    }

    document.body.appendChild(detailsContainer);
  };

  fetch('/api/bookshelf')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const savedBooks = data.books;
        savedBooks.forEach(book => {
          createBookDiv(book);
        });
      } else {
        console.error('Error fetching saved books:', data.error);
      }
    })
    .catch(error => {
      console.error('Error fetching saved books:', error);
    });
});
