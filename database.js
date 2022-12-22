const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', '', '', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite'
});

const ItemCategory = require('./models/itemCategory.js')(sequelize);
const Item = require('./models/item.js')(sequelize);
const Shop = require('./models/shop.js')(sequelize);
const User = require('./models/user.js')(sequelize);
const Inventory = require('./models/inventory.js')(sequelize);

ItemCategory.hasMany(Item, {
    foreignKey: 'categoryId'
});
Item.belongsTo(ItemCategory, {
    foreignKey: 'categoryId'
});

Shop.hasOne(Item);
Item.belongsTo(Shop);

Inventory.belongsTo(Item, { as: 'item' });
Inventory.belongsTo(User, { as: 'user' });

module.exports = { ItemCategory, Item, Shop, User, Inventory };
