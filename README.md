# 🤖 Custom Command Discord Bot Template

A powerful and flexible Discord bot template that allows you to create complex custom commands using a simple, JSON-based action system. This template is designed for easy expansion, allowing you to add new actions and functionality with minimal effort.

## 📚 Wiki & Documentation

For a comprehensive guide including installation, examples, and core concepts, please visit the **[Official Wiki Page](https://github.com/waikboidev/custom-cmds-template/wiki)**.

## ✨ Features

- **Dynamic Command Creation:** Create and delete commands on-the-fly without restarting the bot.
- **Action-Based System:** Chain together a series of actions to create complex command logic.
- **Highly Expandable:** Easily add new, custom actions to extend the bot's capabilities.
- **Simple Configuration:** Uses a `.env` file for easy setup of your bot's token and prefix.
- **Interactive Components:** Built-in support for buttons and select menus.

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/waikboidev/custom-cmds-template.git
    ```
2.  **Install dependencies:**
    ```bash
    npm install discord.js dotenv
    ```
3.  **Configure your bot:**
    - Rename `.env.example` to `.env`.
    - Open the `.env` file and add your Discord bot token and desired prefix.
    ```
    TOKEN=YOUR_DISCORD_BOT_TOKEN
    PREFIX=$
    ```
4.  **Run the bot:**
    ```bash
    node index.js
    ```

## 🛠️ Creating Custom Commands

You can create custom commands directly within Discord using the `$createcmd` and `$deletecmd` commands.

### `$createcmd <command_name> <json_logic>`

This command creates a new custom command. The `json_logic` is an array of action objects.

**Example:**

```
$createcmd hello [{"reply": "Hello, {user.username}!"}, {"wait": 2000}, {"editMessage": {"message_id": "last", "content": "Hope you are having a great day!"}}]
```

This creates a command named `hello` that replies with a greeting, waits 2 seconds, and then edits the message.

### `$deletecmd <command_name>`

This command deletes an existing custom command.

**Example:**

```
$deletecmd hello
```

## ⚡ Available Actions

Here is a list of all the available actions you can use in your custom commands:

| Action | Parameters | Description |
| :--- | :--- | :--- |
| `addReaction` | `message_id`, `emoji` | Adds a reaction to a message. |
| `addRole` | `user_id`, `role_id` | Adds a role to a member. |
| `archiveThread` | `channel_id`, `archived` (boolean) | Archives or unarchives a thread. |
| `banMember` | `user_id` (or the root parameter), `reason` | Bans a member from the server. |
| `bulkDelete` | `limit` (number) | Deletes a specified number of messages. |
| `createChannel` | The channel name as a string. | Creates a new text channel. |
| `createEmoji` | `image_url`, `name` | Creates a new emoji in the server. |
| `createInvite` | `channel_id`, `max_uses`, `max_age` | Creates an invite to a channel. |
| `createRole` | `name`, `color`, `permissions` (array of strings) | Creates a new role. |
| `createSticker` | `file_url`, `name`, `tags` | Creates a new sticker in the server. |
| `createThread` | `message_id`, `name`, `auto_archive_duration` | Creates a new thread from a message. |
| `delChannel` | The channel ID as a string. | Deletes a channel. |
| `deleteEmoji` | `emoji_id` | Deletes an emoji from the server. |
| `deleteMessage` | `message_id` | Deletes a message. |
| `deleteSticker` | `sticker_id` | Deletes a sticker from the server. |
| `delRole` | The role ID as a string. | Deletes a role. |
| `editMessage` | `message_id`, `content` | Edits a message. |
| `kickMember` | `user_id` (or the root parameter), `reason` | Kicks a member from the server. |
| `lockThread` | `channel_id`, `locked` (boolean) | Locks or unlocks a thread. |
| `moveMember` | `user_id`, `channel_id` | Moves a member to a different voice channel. |
| `pinMessage` | `message_id` | Pins a message in the channel. |
| `removeReaction` | `message_id`, `emoji` | Removes a reaction from a message. |
| `removeRole` | `user_id`, `role_id` | Removes a role from a member. |
| `reply` | `reply` (or the root parameter), `ephemeral` (boolean) | Replies to the command message. |
| `replyWithButtons` | `content`, `buttons` (array), `ephemeral` (boolean) | Replies with a message containing buttons. |
| `replyWithSelect` | `content`, `custom_id`, `placeholder`, `options`, `ephemeral` (boolean) | Replies with a message containing a select menu. |
| `sendDM` | `user_id`, `content` | Sends a direct message to a user. |
| `setPermissions` | `channel_id`, `target_id`, `allow` (array), `deny` (array) | Sets channel permissions for a user or role. |
| `timeoutMember` | `user_id`, `durationMs`, `reason` | Times out a member. |
| `unpinMessage` | `message_id` | Unpins a message in the channel. |
| `wait` | The duration in milliseconds as a number. | Waits for a specified duration.

## 🔧 Expandability and Modification

This bot is designed to be easily expanded. You can add your own custom actions by following these steps:

1.  **Create a new file** in the `Actions` directory (e.g., `myNewAction.js`).
2.  **Structure your action** file like this:

    ```javascript
    module.exports = {
        name: 'myNewAction',
        async execute({ params, context, messageOrInteraction }) {
            // Your action logic here
        },
    };
    ```

3.  **The bot will automatically load** your new action on startup. You can then use it in your custom commands.

## 👤 Created By

This template was created by **waikboidev** on GitHub.

- **GitHub Profile:** [https://github.com/waikboidev](https://github.com/waikboidev)
- **Website:** [https://waike.dev/](https://waike.dev/)
