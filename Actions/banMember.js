module.exports = {
    name: 'banMember',
    async execute({ params, context }) {
        const member = await context.guild.members.fetch(params.user_id || params);
        if (member) {
            await member.ban({ reason: params.reason });
        }
    },
};
