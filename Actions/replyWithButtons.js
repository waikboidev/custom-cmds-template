const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
module.exports = {
    name: 'replyWithButtons',
    async execute({ params, messageOrInteraction }) {
        const row = new ActionRowBuilder();
        params.buttons.forEach(btn => {
            row.addComponents(new ButtonBuilder().setCustomId(btn.custom_id).setLabel(btn.label).setStyle(ButtonStyle[btn.style || 'Primary']));
        });
        return await messageOrInteraction.reply({ content: params.content, components: [row], ephemeral: !!params.ephemeral });
    },
};
