// here we will require sequelize
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Book extends Model {}

Book.init(
  {
    // ! id that WE assign
    // ? Used to perform server actions later
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // ! Field from api
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // ! Field from api
    first_sentence: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // ! Field from api
    first_publish_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    //  ! Field from api
    author_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // ! Field from api
    // ? Will be used to retrieve "Author Photos" later
    author_key: {
      type: DataTypes.STRING,
    },
    // ! FOREIGN KEY
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
    },
    // ! FOREIGN KEY
    shelf_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Shelf",
        key: "id",
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
