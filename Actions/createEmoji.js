module.exports = {
    name: 'createEmoji',
    async execute({ params, context }) {
        await context.guild.emojis.create({ attachment: params.image_url, name: params.name });
    },
};
