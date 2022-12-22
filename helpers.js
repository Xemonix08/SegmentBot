const { WebhookClient, EmbedBuilder } = require('discord.js');
const { logsWebhookUrl } = require('./config.json');

String.prototype.truncate = String.prototype.truncate || function (n) {
    return (this.length > n) ? this.slice(0, n - 3) + '...' : this.toString();
};

function customWrite(data, prefix, webhookSettings) {
    try {
        if (logsWebhookUrl !== '') {
            const webhookClient = new WebhookClient({ url: logsWebhookUrl });

            const embed = new EmbedBuilder()
                .setAuthor({ name: webhookSettings.title, iconURL: webhookSettings.iconURL })
                .setDescription(webhookSettings.description)
                .addFields(webhookSettings.fields)
                .setColor(webhookSettings.embedColor);
            if (webhookSettings.content) {
                webhookClient.send({ content: webhookSettings.content, embeds: [embed] });
            } else {
                webhookClient.send({ embeds: [embed] });
            }
        }
    } catch (e) {
        process.stdout.write('❌ | Unable to redirect error to the webhook\n');
        process.stdout.write(`${e.name} : ${e.message}\n`);
    }
    process.stdout.write(`${prefix}${data}\n`);
}

module.exports = {
    linearConversion(oldMin, oldMax, newMin, newMax, oldValue) {
        return (((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;
    },
    overrideConsoleMethods() {
        console.log = (data) => {
            customWrite(data, '', {
                title: 'Info',
                iconURL: 'https://raw.githubusercontent.com/abrahammurciano/discord-lumberjack/main/images/info.png',
                description: data,
                embedColor: 0x1012AA,
                fields: []
            });
        };

        console.error = (data) => {
            const name = data.name ?? '-';
            const message = data.message ?? data;
            const stack = data.stack ?? '-';

            customWrite(`${name} : ${message}\n${stack}\n`, '[ERROR] ', {
                content: '<@&1055460954097319976> fix yo bot',
                title: 'Error',
                iconURL: 'https://raw.githubusercontent.com/abrahammurciano/discord-lumberjack/main/images/error.png',
                description: name,
                embedColor: 0xFF0000,
                fields: [
                    { name: 'Message', value: message.truncate(1024), inline: true },
                    { name: 'Stack', value: stack.truncate(1024), inline: true },
                ]
            });
        };
    },
    formatPdAmount(amount, addInKbs = false) {
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
};
