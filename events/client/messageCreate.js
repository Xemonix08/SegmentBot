const { Events } = require('discord.js');
const { User } = require('../../database.js');
const { getUser } = require('../../helpers.js');
const { guildId } = require('../../config.json');

module.exports = {
    event: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) {
            return;
        }
        if (message.guild.id !== guildId) {
            return;
        }

        const user = (await getUser(message.author.id))[0];
        User.increment('progressData', { by: 10, where: { userId: user.userId } });
    }
};
