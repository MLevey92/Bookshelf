// require all npm packages here:
// express
// express-session
// express handlebars
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');


// const for:
// routes (./controllers)
// sequelize (./config/connection)
// helpers (./utils)
const routes = require('./controllers');
const sequelize = require('./config/connection');


// instance for express app here
const app = express();

// const PORT
const PORT = process.env.PORT || 3001;


// const sess object
// express-session middleware for storing session cookies

//import models? Got confused here. Can we import all our models at once through ./models/index, since that file exports them all?
//seems to work so far ¯\_(ツ)_/¯
const models = require('./models/index')



// const hbs for helpers
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


// app.use for all above
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// to show a gallery of our favorite books on the homepage
const galleryItems = [
  {
    imageUrl: 'https://covers.openlibrary.org/b/olid/OL20931086M-M.jpg',
    caption: 'Redwall',
  },
  {
    imageUrl: 'https://covers.openlibrary.org/b/olid/OL6152917M-M.jpg',
    caption: 'The Doors of Perception',
  },
  {
    imageUrl: 'https://covers.openlibrary.org/b/olid/OL36188337M-M.jpg',
    caption: 'The Odyssey',
  },
  {
    imageUrl: 'https://covers.openlibrary.org/b/olid/OL26451897M-M.jpg',
    caption: 'The Fellowship of the Ring',
  },
];

// Define a route for the homepage which has the gallery sample
app.get('/', (req, res) => {
  res.render('homepage', { galleryItems });
});

//app.use(routes);
app.use(routes);

//sequelize.sync and listening for PORT
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});