require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { executeActions } = require('./Actions/actionHandler');

// --- Configuration ---
const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;

// You can change the path to your commands.json file if needed
const COMMANDS_FILE_PATH = path.join(__dirname, 'commands.json');

// --- Bot Client Initialization ---
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

client.customCommands = new Map();
client.customActions = new Collection();

// Load Action Files
const actionsPath = path.join(__dirname, 'Actions');
const actionFiles = fs.readdirSync(actionsPath).filter(file => file.endsWith('.js'));

for (const file of actionFiles) {
    const filePath = path.join(actionsPath, file);
    const action = require(filePath);
    if ('name' in action && 'execute' in action) {
        client.customActions.set(action.name, action);
        console.log(`Loaded action: ${action.name}`);
    } else if (file !== 'utils.js' && file !== 'actionHandler.js') {
        console.warn(`[WARNING] The action at ${filePath} is missing a required "name" or "execute" property.`);
    }
}

// --- Helper Functions ---
const loadCommands = () => {
    try {
        if (fs.existsSync(COMMANDS_FILE_PATH)) {
            const data = fs.readFileSync(COMMANDS_FILE_PATH, 'utf8');
            client.customCommands = new Map(Object.entries(JSON.parse(data)));
            console.log(`Successfully loaded ${client.customCommands.size} custom commands.`);
        } else {
            fs.writeFileSync(COMMANDS_FILE_PATH, JSON.stringify({}));
            client.customCommands = new Map();
            console.log('commands.json not found. Created a new empty file.');
        }
    } catch (error) {
        console.error('Failed to load commands.json:', error);
    }
};

const saveCommands = async () => {
    try {
        const commandsToSave = Object.fromEntries(client.customCommands);
        fs.writeFileSync(COMMANDS_FILE_PATH, JSON.stringify(commandsToSave, null, 4));
    } catch (error) {
        console.error('Failed to save commands:', error);
    }
};

const hasManagementPermission = (member) => {
    const { PermissionsBitField } = require('discord.js');
    return member.permissions.has(PermissionsBitField.Flags.ManageChannels) ||
           member.permissions.has(PermissionsBitField.Flags.ManageRoles);
};

// --- Bot Event Handlers ---
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    loadCommands();
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.content.startsWith(PREFIX) || !message.guild) return;

    const content = message.content.slice(PREFIX.length).trim();
    const args = content.split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    // --- Core Commands ---
    if (commandName === 'createcmd') {
        if (!hasManagementPermission(message.member)) return message.reply('You need Manage Channels/Roles permission.');
        const newCmdName = args[0];
        const logicString = content.substring(content.indexOf(newCmdName) + newCmdName.length).trim();
        if (!newCmdName || !logicString) return message.reply('Usage: `$createcmd <name> <json_logic>`');
        try {
            const logic = JSON.parse(logicString);
            client.customCommands.set(newCmdName, logic);
            await saveCommands();
            return message.reply(`Successfully created/updated custom command: \`${PREFIX}${newCmdName}\``);
        } catch (e) { return message.reply(`Invalid JSON logic. Error: ${e.message}`); }
    }
    if (commandName === 'deletecmd') {
        if (!hasManagementPermission(message.member)) return message.reply('You need Manage Channels/Roles permission.');
        const cmdToDelete = args[0];
        if (!client.customCommands.has(cmdToDelete)) return message.reply(`Command \`${cmdToDelete}\` not found.`);
        client.customCommands.delete(cmdToDelete);
        await saveCommands();
        return message.reply(`Successfully deleted \`${PREFIX}${cmdToDelete}\``);
    }

    // --- Custom Command Execution ---
    if (client.customCommands.has(commandName)) {
        const commandLogic = client.customCommands.get(commandName);
        const actions = Array.isArray(commandLogic) ? commandLogic : commandLogic.actions;
        if (!actions) return;

        const context = { args, member: message.member, user: message.author, channel: message.channel, guild: message.guild, client };
        await executeActions(actions, message, context);
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton() && !interaction.isStringSelectMenu()) return;

    const commandMessage = interaction.message;
    const originalCommand = commandMessage.reference ? await commandMessage.channel.messages.fetch(commandMessage.reference.messageId).catch(() => null) : null;
    if (!originalCommand || !originalCommand.content.startsWith(PREFIX)) return;

    const commandName = originalCommand.content.slice(PREFIX.length).trim().split(/ +/)[0].toLowerCase();
    if (!client.customCommands.has(commandName)) return;

    const commandLogic = client.customCommands.get(commandName);
    if (typeof commandLogic !== 'object' || !commandLogic.interactions) return;

    const interactionLogic = commandLogic.interactions[interaction.customId];
    if (!interactionLogic) return;

    await interaction.deferUpdate();

    const context = {
        interaction,
        member: interaction.member,
        user: interaction.user,
        channel: interaction.channel,
        guild: interaction.guild,
        values: interaction.isStringSelectMenu() ? interaction.values : null,
        client
    };

    await executeActions(interactionLogic, interaction, context);
});

// --- Bot Login ---
if (!TOKEN) {
    console.error("CRITICAL: Bot token is missing. Please create a .env file and add TOKEN=YOUR_BOT_TOKEN");
} else {
    client.login(TOKEN).catch(error => {
        console.error("Failed to log in:", error);
    });
}
