// ! This file's GOOD to go
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const bookRoutes = require("./bookRoutes");
const shelfRoutes = require("./shelfRoutes");

// ? "/api/users"
router.use("/users", userRoutes);
// ? "/api/books"
router.use("/books", bookRoutes);
// ? "/api/shelves"
router.use("/shelves", shelfRoutes);

module.exports = router;
