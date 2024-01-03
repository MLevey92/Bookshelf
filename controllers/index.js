// ! This file's GOOD to go
const router = require("express").Router();
const apiRoutes = require("./api/index");
const homeRoutes = require("./homeRoutes");
const shelfRoutes = require('./shelfRoutes');


router.use("/api", apiRoutes);
router.use("/", homeRoutes);

module.exports = router;
