import type { CommandInteraction } from 'discord.js';
// import { EmbedBuilder } from 'discord.js';
import type { Command } from './index.js';

export default {
	data: {
		name: 'agify',
		description: 'Guesses the age of someone from their name',
		options: [
			{
				type: 3,
				name: 'name',
				description: 'The name of the person',
				required: true,
			},
		],
	},

	async execute(interaction: CommandInteraction) {
		await interaction.deferReply();

		const name = interaction.options.get('name')?.value as string;

		let age: number;

		try {
			const res = await fetch(`https://api.agify.io/?name=${name}`);
			const json: any = await res.json();
			age = json?.age ?? Math.floor(Math.random() * 74);
		} catch {
			age = Math.floor(Math.random() * 74);
		}

		// const embed = new EmbedBuilder().setTitle(`Maybe **${name}** is around **${age}** years old!`).setColor(0x00ae86);

		await interaction.editReply({ content: `Maybe **${name}** is around ___**${age}**___ years old!` });
	},
} satisfies Command;
