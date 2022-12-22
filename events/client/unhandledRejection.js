module.exports = {
    event: 'unhandledRejection',
    async execute(e) {
        console.error(e);
    }
};
