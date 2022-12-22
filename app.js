const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { loadEventFiles, loadCommandFiles } = require('./getFiles.js');
const { overrideConsoleMethods } = require('./helpers.js');

console.log('Starting the bot.');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

loadEventFiles(client);
loadCommandFiles(client);

client.login(token);

overrideConsoleMethods();
