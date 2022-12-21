const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('itemCategory', {
        name: DataTypes.STRING
    });
};
