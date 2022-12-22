module.exports = {
    event: 'uncaughtException',
    async execute(e) {
        console.error(e);
    }
};
