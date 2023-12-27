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



// app.use for all above
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//app.use(routes);

//sequelize.sync and listening for PORT
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});