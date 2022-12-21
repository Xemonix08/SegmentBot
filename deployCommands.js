const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

console.log('╮ Refreshing application commands...');
(async () => {
    try {
        console.log('╰─╮');
        console.log(`  │ Started refreshing ${commands.length} commands.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`V │ Successfully refreshed ${data.length} commands!`);
    } catch (e) {
        console.log(`X │ An error occurred while refreshing application commands! ${e.message}`);
    }
    console.log('──╯');
})();
