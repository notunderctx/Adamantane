import { Events } from 'discord.js';
export function registerEvents(commands, events, client) {
    // Create an event to handle command interactions
    const interactionCreateEvent = {
        name: Events.InteractionCreate,
        async execute(interaction) {
            if (interaction.isCommand()) {
                const command = commands.get(interaction.commandName);
                if (!command) {
                    throw new Error(`Command '${interaction.commandName}' not found.`);
                }
                await command.execute(interaction);
            }
        },
    };
    for (const event of [...events, interactionCreateEvent]) {
        client[event.once ? 'once' : 'on'](event.name, async (...args) => event.execute(...args));
    }
}
//# sourceMappingURL=registerEvents.js.map