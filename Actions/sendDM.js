module.exports = {
    name: 'sendDM',
    async execute({ params, context }) {
        const user = await context.client.users.fetch(params.user_id);
        if (user) {
            await user.send(params.content);
        }
    },
};
