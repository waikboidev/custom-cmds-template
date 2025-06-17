module.exports = {
    name: 'deleteEmoji',
    async execute({ params, context }) {
        const emoji = await context.guild.emojis.fetch(params.emoji_id);
        await emoji?.delete();
    },
};
