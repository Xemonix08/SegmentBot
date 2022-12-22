const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { formatPdAmount } = require('../helpers.js');
const stats = require('../functions/statistics.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('statistics')
        .setDescription('Get a user\'s statistics')
        .addUserOption(option => option
            .setName('user')
            .setRequired(false)
            .setDescription('The user whose statistics you want to check (defaults to yourself)')),
    async execute(interaction) {
        const user = interaction.options.getUser('user') ?? interaction.user;
        let title = '';
        if (user == interaction.user) {
            title = `Viewing your statistics (${user.tag})`;
        } else {
            title = `Viewing statistics for user **${user.tag}**`;
        }
        const pd = await stats(interaction.client, user.id);
        const replyEmbed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(`**ProgressData:** ${formatPdAmount(pd, true)}`)
            .setColor(Math.floor(Math.random() * 0xFFFFFF))
            .setTimestamp();
        const reply = { embeds: [replyEmbed] };
        return await interaction.reply(reply);
    }
};
