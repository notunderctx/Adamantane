import type { CommandInteraction } from 'discord.js';
import type { Command } from './index.js';

export default {
	data: {
		name: 'help',
		description: 'Lists all available commands and their descriptions.',
	},
	async execute(interaction: CommandInteraction) {
		const commands = [
			{ name: '/8ball', description: 'Ask the magic 8-ball a question and get an answer.' },
			{ name: '/lovecalc', description: 'Calculate the love compatibility between two people.' },
			{ name: '/help', description: 'Lists all available commands and their descriptions.' },
			{ name: 'agify', description: 'Guesses the age of someone from their name' },
			{ name: 'nasapic', description: 'Shows the picture of the day from space' },
			{ name: 'numberfact', description: 'Get a random fact about a number between 1 and 1000' },
			{ name: 'ping', description: 'Ping!' },
			{
				name: 'trivia',
				description: 'start a trivia',
			},
		];

		let helpMessage = '**Available Commands:**\n\n';
		for (const cmd of commands) {
			helpMessage += `**${cmd.name}** - ${cmd.description}\n`;
		}

		await interaction.reply({ content: helpMessage });
	},
} satisfies Command;
