const { PermissionsBitField } = require('discord.js');
module.exports = {
    name: 'createRole',
    async execute({ params, context }) {
        await context.guild.roles.create({
            name: params.name,
            color: params.color,
            permissions: params.permissions?.map(p => PermissionsBitField.Flags[p]) || []
        });
    },
};
