const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Shelf extends Model {}

Shelf.init(
  {
    // ! id that WE give
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // ! name the USER will give
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // ! FOREIGN KEY
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "Shelf",
  }
);

module.exports = Shelf;
