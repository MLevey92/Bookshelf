// this file is where you add the routes & router items
const router = require('express').Router();
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);

module.exports = router;