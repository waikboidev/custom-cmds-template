module.exports = {
    name: 'createThread',
    async execute({ params, context }) {
        const { getMessage } = require('./utils.js');
        const parentMessage = await getMessage(context, params.message_id);
        if (parentMessage) {
            await parentMessage.startThread({ name: params.name, autoArchiveDuration: params.auto_archive_duration || 1440 });
        }
    },
};
