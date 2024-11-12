// eslint-disable-next-line import/no-extraneous-dependencies
import { GameManager } from 'discord-trivia';
export default {
    data: {
        name: 'trivia',
        description: 'start a trivia',
    },
    async execute(interaction) {
        const manager = new GameManager();
        const game = manager.createGame(interaction.channel);
        try {
            await game.startQueue(interaction);
            game.on('queue', async () => {
                await interaction.channel.send('this is easyyyyy');
            });
        }
        catch (error) {
            console.log(`there was an error ${error}`);
            await interaction.reply('there was an error sorry maybe next time ');
        }
    },
};
//# sourceMappingURL=trivia.js.map