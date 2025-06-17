module.exports = {
    name: 'delRole',
    async execute({ params, context }) {
        const role = await context.guild.roles.fetch(params);
        await role?.delete();
    },
};
