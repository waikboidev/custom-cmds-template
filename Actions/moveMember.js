module.exports = {
    name: 'moveMember',
    async execute({ params, context }) {
        const member = await context.guild.members.fetch(params.user_id);
        if (member?.voice.channel) {
            await member.voice.setChannel(params.channel_id);
        }
    },
};
