module.exports = {
    name: 'kickMember',
    async execute({ params, context }) {
        const member = await context.guild.members.fetch(params.user_id || params);
        if (member) {
            await member.kick(params.reason);
        }
    },
};
