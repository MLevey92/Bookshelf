const sequelize = require("../config/connection");
const { User, Shelf, Book } = require("../models");

const userData = require("./userData.json");
const shelfData = require("./shelfData.json");
const bookData = require("./bookData.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    const shelves = await Shelf.bulkCreate(shelfData);

    const books = await Book.bulkCreate(
      bookData.map((book) => {
        const user = users.find((user) => user.id === book.user_id);

        if (!user) {
          console.error(
            `User not found for book with user_id: ${book.user_id}`
          );
          return null;
        }

        return {
          ...book,
          user_id: user.id,
        };
      })
    );

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit(0);
  }
};

seedDatabase();

