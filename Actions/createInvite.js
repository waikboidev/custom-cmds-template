module.exports = {
    name: 'createInvite',
    async execute({ params, context, messageOrInteraction }) {
        const invite = await context.guild.invites.create(params.channel_id, { maxUses: params.max_uses, maxAge: params.max_age });
        await messageOrInteraction.reply(`Invite created: ${invite.url}`);
    },
};
