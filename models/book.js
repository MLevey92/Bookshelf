// here we will require sequelize
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
    },
    // ! Field from api
    first_publish_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // ! Field from api
    // ? Will be used to retrieve "Author Photos" later
    author_key: {
      type: DataTypes.INTEGER,
      references: {
        model: "Author",
        key: "author_key",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "Book",
  }
);

module.exports = Book;

// create object for each book's information as a Book.init function
// properties to include:
// id, title, author, publish date, # of pages, description, cover (?)
// dependent on Open Library API as well and what we want to pull from it
// what if we made the id in dewey decimal classification? (LOL)
