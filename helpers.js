const { WebhookClient, EmbedBuilder } = require('discord.js');
const { User } = require('./database.js');
const { logsWebhookUrl } = require('./config.json');

String.prototype.truncate = String.prototype.truncate || function (n) {
    return (this.length > n) ? this.slice(0, n - 3) + '...' : this.toString();
};

console.error = (data) => {
    const name = data.name ?? '-';
    const message = data.message ?? data;
    const stack = data.stack ?? '-';

    try {
        if (logsWebhookUrl !== '') {
            const webhookClient = new WebhookClient({ url: logsWebhookUrl });

            const embed = new EmbedBuilder()
                .setAuthor({ name: 'Error', iconURL: 'https://raw.githubusercontent.com/abrahammurciano/discord-lumberjack/main/images/error.png' })
                .setDescription(name)
                .addFields([
                    { name: 'Message', value: message.truncate(1024), inline: true },
                    { name: 'Stack', value: stack.truncate(1024), inline: true }
                ])
                .setColor(0xFF0000);
            webhookClient.send({ embeds: [embed] });
        }
    } catch (e) {
        process.stdout.write('❌ | Unable to redirect error to the webhook\n');
        console.log(e);
    }
    process.stdout.write(`[ERROR] ${name} : ${message}\n`);
    process.stdout.write(stack);
};

module.exports = {
    async getUser(id) {
        return await User.findOrCreate({
            where: { userId: id }
        });
    },
    linearConversion(oldMin, oldMax, newMin, newMax, oldValue) {
        return (((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin;
    }
};
