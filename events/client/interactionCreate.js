const { Events } = require('discord.js');

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
        }
    }
};
