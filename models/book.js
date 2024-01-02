const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Book extends Model {}

Book.init(
  {
    // ! id that WE assign automatically
    // ? Used to perform server actions later
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // ! Field from api
    // ? Will need to run raw response through function 'cleanupOLkey' before creating a Book
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // ! Field from api
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // ! Field from api
    // ? Will need to round it to a clean number before creating a Book (ex 4.6)
    ratings_average: {
      type: DataTypes.FLOAT,
      allowNull: true,
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
    // ? Will need to grab ONLY the first one from each book's array
    // ? Will be used to retrieve "Author Photos" later
    author_key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // ! FOREIGN KEY
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

// properties to include:
// id, title, author, publish date, # of pages, description, cover (?)
// dependent on Open Library API as well and what we want to pull from it
// what if we made the id in dewey decimal classification? (LOL)
