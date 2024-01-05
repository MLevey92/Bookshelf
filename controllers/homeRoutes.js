const router = require("express").Router();
const { User, Book, Shelf } = require("../models");

router.get("/", async (req, res) => {
  res.render("homepage", {
    logged_in: req.session.logged_in,
  });
});

// ! Route to render loginpage. Simple.
router.get("/login", async (req, res) => {
  try {
    res.render("loginpage");
  } catch (err) {
    res.status(500).json(err);
  }
});

// ! Route to render bookshelf page with the logged-in user's EVERYTHING (their user data, shelves, and books)
router.get("/bookshelf", async (req, res) => {
  try {
    // Check if the user is logged in
    if (req.session.logged_in) {
      // If logged in, fetch user details, books, and shelves
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Book,
            attributes: ["id", "title", "cover_edition_key", "author_name"],
          },
          {
            model: Shelf,
            attributes: ["id", "name"],
            include: [
              {
                model: Book,
                attributes: ["id", "title", "cover_edition_key", "author_name"],
              },
            ],
          },
        ],
      });

      const user = userData.get({ plain: true });

      // Render the bookshelf page with user information, books, and shelves
      res.render("bookshelf", {
        user,
        books: user.Books,
        shelves: user.Shelves,
        logged_in: req.session.logged_in,
      });
    } else {
      // If not logged in, render the bookshelf without user information
      res.render("bookshelf", { logged_in: req.session.logged_in });
    }
  } catch (err) {
    console.error("Error fetching bookshelf data:", err);

    // Send the error message to the client for debugging (remove in production)
    res.status(500).send(`Internal Server Error: ${err.message}`);
  }
});

// TODO: CREATE ROUTE FOR /findbooks
router.get("/findbooks", async (req, res) => {
  res.render("findbooks", {
    logged_in: req.session.logged_in
  });
});

module.exports = router;
