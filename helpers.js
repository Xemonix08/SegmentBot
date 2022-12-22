const { User } = require('./database.js');

module.exports = {
    async getUser(id) {
        return await User.findOrCreate({
            where: { userId: id }
        });
    }
};
