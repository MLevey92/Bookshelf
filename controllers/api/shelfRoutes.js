const router = require("express").Router();
const { Shelf } = require("../../models");

// ! Get all shelves
router.get("/", async (req, res) => {
  try {
    const shelves = await Shelf.findAll();
    res.json(shelves);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ! Create a new shelf
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const newShelf = await Shelf.create({ name, user_id: req.session.user_id });
    res.status(201).json(newShelf);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ! Update a shelf's name by its id
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const updatedShelf = await Shelf.update(
      { name },
      { where: { id: req.params.id } }
    );
    res.json(updatedShelf);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ! Delete a shelf by its id
router.delete("/:id", async (req, res) => {
  try {
    const deletedShelfCount = await Shelf.destroy({
      where: { id: req.params.id },
    });
    res.json({ deletedShelfCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
