module.exports = {
    async getMessage(context, messageId) {
        if (messageId === 'last' && context.lastMessage) return context.lastMessage;
        if (messageId === 'initial' && context.initialMessage) return context.initialMessage;
        try {
            return await context.channel.messages.fetch(messageId);
        } catch {
            return null;
        }
    },
};
