module.exports = {
    name: 'addReaction',
    async execute({ params, context }) {
        const { getMessage } = require('./utils.js');
        const targetMessage = await getMessage(context, params.message_id);
        if (targetMessage) {
            await targetMessage.react(params.emoji);
        }
    },
};
