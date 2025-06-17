module.exports = {
    name: 'reply',
    async execute({ params, messageOrInteraction }) {
        const replyOptions = { content: String(params.reply || params) };
        if (params.ephemeral) replyOptions.ephemeral = true;

        if (messageOrInteraction.replied || messageOrInteraction.deferred) {
            return await messageOrInteraction.editReply(replyOptions);
        } else {
            return await messageOrInteraction.reply(replyOptions);
        }
    },
};
