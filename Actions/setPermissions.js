const { PermissionsBitField } = require('discord.js');
module.exports = {
    name: 'setPermissions',
    async execute({ params, context }) {
        const channel = await context.guild.channels.fetch(params.channel_id);
        if (channel) {
            await channel.permissionOverwrites.edit(params.target_id, {
                ...Object.fromEntries(params.allow?.map(p => [PermissionsBitField.Flags[p], true]) || []),
                ...Object.fromEntries(params.deny?.map(p => [PermissionsBitField.Flags[p], false]) || [])
            });
        }
    },
};
