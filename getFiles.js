const fs = require('node:fs');
const path = require('node:path');
const { Collection } = require('discord.js');

module.exports = {
    async loadAllFiles(client) {
        await this.loadEventFiles(client);
        await this.loadCommandFiles(client);
    },
    async loadEventFiles(client) {
        console.log('│ Loading event files...');
        const eventsDir = path.join(__dirname, 'events');

        // Client events
        const clientEventsDir = path.join(eventsDir, 'client');
        const clientEventFiles = fs.readdirSync(clientEventsDir).filter(file => file.endsWith('.js'));

        console.log('╰─╮');
        for (const file of clientEventFiles) {
            const filePath = path.join(clientEventsDir, file);
            const event = require(filePath);

            if (!('event' in event && 'execute' in event)) {
                console.error(`X │ Could not load the event from '${file}': missing properties 'event' and/or 'execute'.`);
                continue;
            }

            if (event.once) {
                client.once(event.event, (...args) => event.execute(...args));
            } else {
                client.on(event.event, (...args) => event.execute(...args));
            }

            console.log(`V │ Successfully loaded the event from '${file}' for client.`);
        }

        console.log('╭─╯');
        console.log('│ Finished loading event files.');
    },
    async loadCommandFiles(client) {
        console.log('│ Loading command files...');

        client.commands = new Collection();

        const commandsDir = path.join(__dirname, 'commands');
        const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));

        console.log('╰─╮');
        for (const file of commandFiles) {
            const filePath = path.join(commandsDir, file);
            const command = require(filePath);

            if (!('data' in command && 'execute' in command)) {
                console.log(`X | Could not load the command from '${file}': missing properties 'data' and/or 'execute'`);
                continue;
            }

            client.commands.set(command.data.name, command);

            console.log(`V | Successfully loaded the command from '${file}'.`);
        }
        console.log('╭─╯');
        console.log('│ Finished loading command files.');
    }
};
