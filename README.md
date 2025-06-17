# 🤖 Custom Command Discord Bot Template

A powerful and flexible Discord bot template that allows you to create complex custom commands using a simple, JSON-based action system. This template is designed for easy expansion, allowing you to add new actions and functionality with minimal effort.

## ✨ Features

- **Dynamic Command Creation:** Create and delete commands on-the-fly without restarting the bot.
- **Action-Based System:** Chain together a series of actions to create complex command logic.
- **Highly Expandable:** Easily add new, custom actions to extend the bot's capabilities.
- **Simple Configuration:** Uses a `.env` file for easy setup of your bot's token and prefix.
- **Interactive Components:** Built-in support for buttons and select menus.

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
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

| Action | Description |
| :--- | :--- |
| `addReaction` | Adds a reaction to a message. |
| `addRole` | Adds a role to a member. |
| `archiveThread` | Archives or unarchives a thread. |
| `banMember` | Bans a member from the server. |
| `bulkDelete` | Deletes a specified number of messages. |
| `createChannel` | Creates a new text channel. |
| `createEmoji` | Creates a new emoji in the server. |
| `createInvite` | Creates an invite to a channel. |
| `createRole` | Creates a new role. |
| `createSticker` | Creates a new sticker in the server. |
| `createThread` | Creates a new thread from a message. |
| `delChannel` | Deletes a channel. |
| `deleteEmoji` | Deletes an emoji from the server. |
| `deleteMessage` | Deletes a message. |
| `deleteSticker` | Deletes a sticker from the server. |
| `delRole` | Deletes a role. |
| `editMessage` | Edits a message. |
| `kickMember` | Kicks a member from the server. |
| `lockThread` | Locks or unlocks a thread. |
| `moveMember` | Moves a member to a different voice channel. |
| `pinMessage` | Pins a message in the channel. |
| `removeReaction` | Removes a reaction from a message. |
| `removeRole` | Removes a role from a member. |
| `reply` | Replies to the command message. |
| `replyWithButtons` | Replies with a message containing buttons. |
| `replyWithSelect` | Replies with a message containing a select menu. |
| `sendDM` | Sends a direct message to a user. |
| `setPermissions` | Sets channel permissions for a user or role. |
| `timeoutMember` | Times out a member. |
| `unpinMessage` | Unpins a message in the channel. |
| `wait` | Waits for a specified duration. |

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
