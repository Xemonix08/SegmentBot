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

if (process.argv.indexOf('--delete') !== -1 || process.argv.indexOf('-d') !== -1) {
    const commandToDelete = process.argv[3];
    if (commandToDelete !== undefined) {
        rest.delete(Routes.applicationGuildCommand(clientId, guildId, commandToDelete))
            .then(() => {
                console.log('Successfully deleted a guild command');
            }).catch(console.error);
    }
} else {
    console.log('Refreshing application commands...');
    (async () => {
        try {
            console.log(`Started refreshing ${commands.length} commands.`);

            const data = await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );

            console.log(`✅ | Successfully refreshed ${data.length} commands!`);
        } catch (e) {
            console.log(`❌ | An error occurred while refreshing application commands! ${e.message}`);
        }
    })();
}
