const { Message } = require('discord.js');

const replacePlaceholders = (data, context) => {
    if (typeof data !== 'string') {
        if (Array.isArray(data)) return data.map(item => replacePlaceholders(item, context));
        if (typeof data === 'object' && data !== null) {
            return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, replacePlaceholders(value, context)]));
        }
        return data;
    }
    
    let replaced = data;

    // This regex now handles all placeholder types in one pass to avoid ordering issues.
    const placeholderRegex = /\{([a-zA-Z0-9\._\(\)]+)\}/g;
    
    return replaced.replace(placeholderRegex, (match, placeholder) => {
        try {
            // Handle args.from(N)
            if (placeholder.startsWith('args.from(')) {
                const startIndex = parseInt(placeholder.substring(10, placeholder.length - 1), 10) - 1;
                if (context.args && !isNaN(startIndex) && startIndex >= 0 && startIndex < context.args.length) {
                    return context.args.slice(startIndex).join(' ');
                }
                return ''; // Return empty if index is invalid
            }
            
            // Handle argN
            if (placeholder.startsWith('arg')) {
                const index = parseInt(placeholder.slice(3), 10) - 1;
                if (context.args && context.args[index]) {
                    return String(context.args[index]).replace(/[<@!&#>]/g, '');
                }
            }

            // Handle args
            if (placeholder === 'args') {
                return context.args.join(' ');
            }

            // Handle path-based placeholders like user.id
            const keys = placeholder.split(/[\.\[\]]+/).filter(Boolean);
            let value = context;
            for (const key of keys) {
                if (value && typeof value === 'object' && key in value) {
                    value = value[key];
                } else {
                    return match; // Path not found
                }
            }
            return value;
        } catch { 
            return match; // Error during replacement
        }
    });
};


const executeActions = async (actions, messageOrInteraction, context) => {
    let lastMessage = null;
    const initialMessage = messageOrInteraction instanceof Message ? messageOrInteraction : messageOrInteraction.message;
    context.lastMessage = null;
    context.initialMessage = initialMessage;

    for (const actionDef of actions) {
        try {
            const actionType = Object.keys(actionDef)[0];
            const action = context.client.customActions.get(actionType);
            
            if (!action) {
                console.warn(`Unknown action type: ${actionType}`);
                continue;
            }

            const rawParams = actionDef[actionType];
            const processedParams = replacePlaceholders(JSON.parse(JSON.stringify(rawParams)), context);

            const result = await action.execute({
                params: processedParams,
                context,
                messageOrInteraction
            });
            
            if(result) {
                lastMessage = result;
                context.lastMessage = lastMessage;
            }

        } catch (error) {
            console.error(`Error executing action:`, error);
            const errorMessage = `An error occurred. Error: \`${error.message}\``;
            if (messageOrInteraction.replied || messageOrInteraction.deferred) {
                await messageOrInteraction.followUp({ content: errorMessage, ephemeral: true }).catch(e => console.error("Follow-up error:", e));
            } else {
                 await messageOrInteraction.reply({ content: errorMessage, ephemeral: true }).catch(e => console.error("Reply error:", e));
            }
            break;
        }
    }
};

module.exports = { executeActions, replacePlaceholders };