module.exports = async (client, userId) => {
    const user = await client.db.User.findByPk(userId);
    return user.progressData;
};
