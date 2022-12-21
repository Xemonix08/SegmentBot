const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('inventory', {
        user_id: DataTypes.STRING,
        item_id: DataTypes.INTEGER,
        amount: {
            type: DataTypes.INTEGER,
            default: 0
        }
    });
};
