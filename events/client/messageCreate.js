const { Events } = require('discord.js');
const { User } = require('../../database.js');
const { getUser } = require('../../helpers.js');
const { guildId } = require('../../config.json');

const recentlyChattedUsers = new Set();

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
        if (!recentlyChattedUsers.has(message.author.id)) {
            console.log(`${message.author.tag} Earned 64KB PD`);
            User.increment('progressData', { by: 64, where: { userId: user.userId } });
            recentlyChattedUsers.add(message.author.id);
            setTimeout(() => {
                recentlyChattedUsers.delete(message.author.id);
            }, 2000);
        }
    }
};
