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

const force = process.argv.includes('--force') || process.argv.includes('-f');

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

sequelize.sync({ force }).then(async () => {
    const itemCategories = [];

    await Promise.all(itemCategories);
}).then(async () => {
    const items = [];

    await Promise.all(items);
}).then(async () => {
    const shop = [];

    await Promise.all(shop);
}).catch(console.error);
