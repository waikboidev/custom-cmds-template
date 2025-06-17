module.exports = {
    name: 'delChannel',
    async execute({ params, context }) {
        const channel = await context.guild.channels.fetch(params);
        await channel?.delete();
    },
};
