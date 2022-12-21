const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('user', {
        userId: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        progressData: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        productKeys: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });
};
