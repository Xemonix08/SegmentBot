const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('item', {
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
    });
};
