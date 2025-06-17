module.exports = {
    name: 'removeReaction',
    async execute({ params, context }) {
        const { getMessage } = require('./utils.js');
        const targetMessage = await getMessage(context, params.message_id);
        const reaction = targetMessage?.reactions.cache.get(params.emoji);
        await reaction?.remove();
    },
};
