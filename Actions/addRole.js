module.exports = {
    name: 'addRole',
    async execute({ params, context }) {
        const member = await context.guild.members.fetch(params.user_id);
        if (member) {
            await member.roles.add(params.role_id);
        }
    },
};
