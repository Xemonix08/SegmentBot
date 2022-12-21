const { Events } = require('discord.js');

module.exports = {
    event: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`✅ | Client ready! Signed in as ${client.user.tag}.`);
        if (client.user.username.toLowerCase().includes('dev')) {
            console.log('! DEVELOPMENT VERSION !');
        }
    }
};
