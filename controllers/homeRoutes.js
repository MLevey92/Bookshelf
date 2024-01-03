const { response } = require('express');

const router = require('express').Router();

router.get('/', async(req, res) => {
    res.render('homepage');
});

router.get('/login', async(req, res) => {
    res.render('loginpage');
});

// for user to get to bookshelf aka dashboard
router.get('/bookshelf', (req, res) => {
  // check if the user is logged in
  // if the login function response is good
  // send user to /bookshelf location as logged in
  });

module.exports = router;