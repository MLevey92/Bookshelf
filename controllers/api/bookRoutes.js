const router = require("express").Router();
const { Book } = require("../../models");

// ! Route to get all books
router.get("/", async (req, res) => {
  try {
    // Fetch all books from the database
    const allBooks = await Book.findAll();

    // Map the books to plain objects
    const books = allBooks.map((book) => book.get({ plain: true }));

    // Respond with the list of books
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ! Create a new Book
router.post("/", async (req, res) => {
  try {
    // Extract book data from the request body
    const {
      cover_edition_key,
      title,
      ratings_average,
      first_sentence,
      first_publish_year,
      author_name,
      author_key,
      user_id,
      shelf_id,
    } = req.body;

    // Create a new book in the database
    const newBook = await Book.create({
      cover_edition_key,
      title,
      ratings_average,
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

module.exports = router;

// ! Route to delete a book by its id
router.delete("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;

    // Use Sequelize to find the book by ID
    const bookToDelete = await Book.findByPk(bookId);

    // Check if the book exists
    if (!bookToDelete) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Delete the book
    await bookToDelete.destroy();

    // Send a success response
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
