module.exports = {
    name: 'createSticker',
    async execute({ params, context }) {
        await context.guild.stickers.create({ file: params.file_url, name: params.name, tags: params.tags });
    },
};
