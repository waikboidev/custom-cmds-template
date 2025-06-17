const { ChannelType } = require('discord.js');
module.exports = {
    name: 'createChannel',
    async execute({ params, context }) {
        await context.guild.channels.create({ name: String(params), type: ChannelType.GuildText });
    },
};
