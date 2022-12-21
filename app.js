const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { loadAllFiles } = require('./getFiles.js');

console.log('╮ Starting the bot.');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

loadAllFiles(client);

client.login(token);
