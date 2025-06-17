module.exports = {
    name: 'deleteSticker',
    async execute({ params, context }) {
        const sticker = await context.guild.stickers.fetch(params.sticker_id);
        await sticker?.delete();
    },
};
