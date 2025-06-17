const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
module.exports = {
    name: 'replyWithSelect',
    async execute({ params, messageOrInteraction }) {
        const row = new ActionRowBuilder();
        row.addComponents(new StringSelectMenuBuilder().setCustomId(params.custom_id).setPlaceholder(params.placeholder || 'Select an option').addOptions(params.options));
        return await messageOrInteraction.reply({ content: params.content, components: [row], ephemeral: !!params.ephemeral });
    },
};
