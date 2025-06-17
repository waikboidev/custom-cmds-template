module.exports = {
    name: 'lockThread',
    async execute({ params, context }) {
        const thread = await context.guild.channels.fetch(params.channel_id);
        if (thread?.isThread()) {
            await thread.setLocked(!!params.locked);
        }
    },
};
