const User = require("./User");
const Book = require("./Book");
const Shelf = require("./Shelf");

// User associations
User.hasMany(Book, {
  foreignKey: "user_id",
});

User.hasMany(Shelf, {
  foreignKey: "user_id",
});

// Book associations
Book.belongsTo(User, {
  foreignKey: "user_id",
});

Book.belongsTo(Shelf, {
  foreignKey: "shelf_id",
});

// Shelf associations
Shelf.belongsTo(User, {
  foreignKey: "user_id",
});

Shelf.hasMany(Book, {
  foreignKey: "shelf_id",
});

module.exports = { User, Book, Shelf };
