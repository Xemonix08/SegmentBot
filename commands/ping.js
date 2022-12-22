const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { linearConversion } = require('../helpers.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong! Returns bot\'s latency.'),
    async execute(interaction) {
        const ping = interaction.client.ws.ping;
        const color = Math.floor(linearConversion(1, 300, 0xFF00, 0x00FF, ping)) * 0x100;

        const replyEmbed = new EmbedBuilder()
            .setDescription('Pong!')
            .setColor(color)
            .addFields({ name: 'Latency', value: `${ping}ms`, inline: true })
            .setTimestamp();
        const reply = {
            embeds: [replyEmbed],
            ephemeral: true,
            fetchReply: true,
        };
        const sentReply = await interaction.reply(reply);
        replyEmbed.addFields({ name: 'Roundtrip', value: `${sentReply.createdTimestamp - interaction.createdTimestamp}ms`, inline: true });
        return await interaction.editReply(reply);
    }
};
