// ! This file's GOOD to go
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESSION_SECRET || "Super secret secret",
  cookie: {
    // Cookie times out after 12 Hours
    maxAge: 12 * 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening at http://localhost:${PORT}`)
  );
});

// ! Old server code, commenting out and keeping just in case...
// // require all npm packages here:
// // express
// // express-session
// // express handlebars
// const path = require('path');
// const express = require('express');
// const exphbs = require('express-handlebars');

// // const for:
// // routes (./controllers)
// // sequelize (./config/connection)
// // helpers (./utils)
// const routes = require('./controllers');
// const sequelize = require('./config/connection');

// // instance for express app here
// const app = express();

// // const PORT
// const PORT = process.env.PORT || 3001;

// // const sess object
// // express-session middleware for storing session cookies

// //import models? Got confused here. Can we import all our models at once through ./models/index, since that file exports them all?
// //seems to work so far ¯\_(ツ)_/¯
// const models = require('./models/index')

// // const hbs for helpers
// const hbs = exphbs.create();
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// // app.use for all above
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// // Define a route for the homepage
// app.get('/', async (req, res) => {
//   try {
//     const galleryItems = await processBooks();
//     res.render('homepage', { galleryItems });
//   } catch (error) {
//     console.error("Error rendering homepage", error.message);
//     res.status(500).send('Internal Server Error');
//   }
// });

// //app.use(routes);
// app.use(routes);

// //sequelize.sync and listening for PORT
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log('Now listening'));
// });
