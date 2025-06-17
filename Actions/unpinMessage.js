module.exports = {
    name: 'unpinMessage',
    async execute({ params, context }) {
        const { getMessage } = require('./utils.js');
        const targetMessage = await getMessage(context, params.message_id);
        await targetMessage?.unpin();
    },
};
