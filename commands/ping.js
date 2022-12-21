const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong! Returns bot\'s latency.'),
    async execute(interaction) {
        throw new Error('test error');
        const ping = interaction.client.ws.ping;
        const oldColorRange = 300 - 1;
        const newColorRange = 0xFF00 - 0x00FF;
        const color = Math.floor((((ping - 1) * newColorRange) / oldColorRange) + 0x00FF) * 0x100;

        const replyEmbed = new EmbedBuilder()
            .setDescription('Pong!')
            .setColor(color)
            .addFields({ name: 'Latency', value: `${ping}ms`, inline: true });
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
