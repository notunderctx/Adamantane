import type { CommandInteraction } from 'discord.js';
import type { Command } from './index.js';

export default {
	data: {
		name: '8ball',
		description: 'Ask the magic 8-ball a question and get an answer.',
		options: [
			{
				type: 3,
				name: 'question',
				description: 'Your question for the magic 8-ball',
				required: true,
			},
		],
	},
	async execute(interaction: CommandInteraction) {
		const responses = [
			'Yes, definitely.',
			'Without a doubt.',
			'Ask again later.',
			'OK :thumbsup: ',
			'No ',
			'My sources say no.',
			'Y',
			'Most likely.',
			'Maybe :man_shrugging: ',
			'Outlook not so good.',
		];

		const response = responses[Math.floor(Math.random() * responses.length)];

		await interaction.reply({
			content: `🎱 ___${response}___`,
		});
	},
} satisfies Command;
