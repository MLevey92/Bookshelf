const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Author extends Model {

}

Author.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'author'
    }
);

module.exports = Author;