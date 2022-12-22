const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { overrideConsoleMethods } = require('./helpers.js');

console.log('Starting the bot.');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.db = require('./database.js');
client.recentlyChattedUsers = new Set();

require('./getFiles.js')(client).then(() => {
    overrideConsoleMethods();
});

client.login(token);

const exitHandler = () => {
    console.log('Shut down the bot.');
    client.destroy();
    process.exit(0);
};

process.on('SIGINT', exitHandler);
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);
process.on('exit', exitHandler);
