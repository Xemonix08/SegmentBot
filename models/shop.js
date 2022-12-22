const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('shopItem', {
        cost: DataTypes.INTEGER,
        percentOff: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });
};
