module.exports = {
    name: 'removeRole',
    async execute({ params, context }) {
        const member = await context.guild.members.fetch(params.user_id);
        if (member) {
            await member.roles.remove(params.role_id);
        }
    },
};
