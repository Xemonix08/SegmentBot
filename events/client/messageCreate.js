const { Events } = require('discord.js');
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

        const db = message.client.db;
        const recentlyChatted = message.client.recentlyChattedUsers;

        const user = (await db.User.findOrCreate({ where: { userId: message.author.id } }))[0];
        const userId = user.userId;
        if (!recentlyChatted.has(userId)) {
            console.log(`${message.author.tag} Earned 64KB PD`);
            db.User.increment('progressData', { by: 64, where: { userId: userId } });
            recentlyChatted.add(userId);
            setTimeout(() => {
                recentlyChatted.delete(userId);
            }, 2000);
        }
    }
};
