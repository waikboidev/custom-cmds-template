module.exports = {
    name: 'timeoutMember',
    async execute({ params, context }) {
        const member = await context.guild.members.fetch(params.user_id);
        if (member) {
            await member.timeout(params.durationMs, params.reason);
        }
    },
};
