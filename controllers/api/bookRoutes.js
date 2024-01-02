const router = require("express").Router();
const { Book } = require("../../models");

// ! Create a new Book
router.post("/books", async (req, res) => {
  try {
    // Extract book data from the request body
    const {
      title,
      first_sentence,
      first_publish_year,
      author_name,
      author_key,
      user_id,
      shelf_id,
    } = req.body;

    // Create a new book in the database
    const newBook = await Book.create({
      title,
      first_sentence,
      first_publish_year,
      author_name,
      author_key,
      user_id,
      shelf_id,
    });

    // Respond with the newly created book
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
