module.exports = {
    name: 'bulkDelete',
    async execute({ params, context }) {
        if (context.channel.isTextBased()) {
            await context.channel.bulkDelete(parseInt(params.limit, 10));
        }
    },
};
