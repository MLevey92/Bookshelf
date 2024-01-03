const router = require('express').Router();

router.get('/', async(req, res) => {
    res.render('homepage');
});

router.get('/login', async(req, res) => {
    res.render('loginpage');
});

module.exports = router;