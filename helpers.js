const { WebhookClient, EmbedBuilder } = require('discord.js');
const { logsWebhookUrl } = require('./config.json');

String.prototype.truncate = String.prototype.truncate || function (n) {
    return (this.length > n) ? this.slice(0, n - 3) + '...' : this.toString();
};

function linearConversion(oldMin, oldMax, newMin, newMax, oldValue) {
    return (((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;
}

function writeToConsoleAndWebhook(consoleData, webhookMessageObject) {
    try {
        if (logsWebhookUrl !== '') {
            const webhookClient = new WebhookClient({ url: logsWebhookUrl });

            webhookClient.send(webhookMessageObject);
        }
    } catch (e) {
        process.stdout.write('❌ | Unable to redirect a message to the webhook\n');
        process.stdout.write(`${e.name} : ${e.message}\n`);
    }
    process.stdout.write(`${consoleData}\n`);
}

function overrideConsoleMethods() {
    console.log = (data) => {
        writeToConsoleAndWebhook(`ℹ️ | ${data}`, {
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: 'Info', iconURL: 'https://raw.githubusercontent.com/abrahammurciano/discord-lumberjack/main/images/info.png' })
                    .setDescription(data)
                    .setColor(0x527DFF)
                    .setTimestamp()
            ]
        });
    };

    console.error = (data, noPing = false) => {
        const name = data.name ?? '-';
        const message = data.message ?? data;
        const stack = data.stack ?? '-';

        writeToConsoleAndWebhook(`❌ | ${name}: ${message}\n${stack}\n`, {
            content: !noPing ? '**An error occurred!** Get onto it as soon as possible ||<@&1055460954097319976>||' : undefined,
            embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: 'Error', iconURL: 'https://raw.githubusercontent.com/abrahammurciano/discord-lumberjack/main/images/error.png' })
                    .setDescription(name)
                    .addFields([
                        { name: 'Message', value: message.truncate(1024), inline: true },
                        { name: 'Stack', value: stack.truncate(1024), inline: true },
                    ])
                    .setColor(0xFF0000)
                    .setTimestamp()
            ],
        });
    };
}

function formatPdAmount(amount, addInKbs = false) {
    const emoji = '<:pd:1055485138898800760>';
    const kbs = `${amount} kB`;
    if (amount < 1024) {
        return `${kbs} ${emoji}`;
    } else if (amount < 1024 ** 2) {
        return `${(amount / 1024).toFixed(2)} MB` + (addInKbs ? ` (${kbs}) ` : '') + emoji;
    } else if (amount < 1024 ** 3) {
        return `${(amount / 1024 ** 2).toFixed(2)} GB` + (addInKbs ? ` (${kbs}) ` : '') + emoji;
    } else {
        return `${(amount / 1024 ** 3).toFixed(2)} TB` + (addInKbs ? ` (${kbs}) ` : '') + emoji;
    }
}

module.exports = { linearConversion, customWrite: writeToConsoleAndWebhook, overrideConsoleMethods, formatPdAmount };
