const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    event: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            return this.executeChatInputCommand(interaction);
        }
    },
    async executeChatInputCommand(interaction) {
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            return;
        }

        try {
            await command.execute(interaction);
        } catch (e) {
            console.log('╰─╮');
            console.log(`X │ An error occurred while executing a slash command ${interaction.commandName}`);
            console.log('  ╰───────────────────────────────────────');
            console.error(e);
            console.log('╭─────────────────────────────────────────');

            const replyEmbed = new EmbedBuilder()
                .setTitle('❌ Uh-oh!')
                .setDescription('Something went wrong! But we\'ve tracked the issue and will get onto it soon.')
                .setColor(0xFF0000);
            const reply = { embeds: [replyEmbed], ephemeral: true };
            try {
                interaction.reply(reply);
            } catch (e) {
                interaction.editReply(reply);
            }
        }
    }
};
