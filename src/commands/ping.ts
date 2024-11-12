import { EmbedBuilder } from 'discord.js';
import type { Command } from './index.js';

export default {
	data: {
		name: 'ping',
		description: 'Ping!',
	},
	async execute(interaction) {
		await interaction.deferReply();
		const latency = Math.round(interaction.client.ws.ping);
		const responseEmbed = new EmbedBuilder()
			.setColor('Random')
			.setDescription(`🏓 Pong! Current latency :: **${latency}ms**`);

		await interaction.editReply({ embeds: [responseEmbed] });
	},
} satisfies Command;
