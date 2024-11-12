/* eslint-disable no-restricted-globals */
/* eslint-disable n/prefer-global/buffer */
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { createCanvas, loadImage } from 'canvas';
import type { CommandInteraction } from 'discord.js';
import type { Command } from './index.js';

export default {
	data: {
		name: 'lovecalc',
		description: 'Calculate the love between two people',
		options: [
			{
				type: 6,
				name: 'person1',
				description: "First person's name",
				required: true,
			},
			{
				type: 6,
				name: 'person2',
				description: "Second person's name",
				required: true,
			},
		],
	},
	async execute(interaction: CommandInteraction) {
		await interaction.deferReply();

		const user1 = interaction.options.get('person1');
		const user2 = interaction.options.get('person2');
		if (!user1 || !user2) {
			await interaction.editReply({ content: 'Please mention both users!' });
			return;
		}

		const avatarURL1 = user1.user?.avatarURL({ size: 1_024, extension: 'png' });
		const avatarURL2 = user2.user?.avatarURL({ size: 1_024, extension: 'png' });

		if (!avatarURL1 || !avatarURL2) {
			await interaction.editReply({ content: 'Both users must have avatars!' });
			return;
		}

		const [avatar1, avatar2] = await Promise.all([
			axios.get(avatarURL1, { responseType: 'arraybuffer' }),
			axios.get(avatarURL2, { responseType: 'arraybuffer' }),
		]);

		const img1 = await loadImage(Buffer.from(avatar1.data));
		const img2 = await loadImage(Buffer.from(avatar2.data));

		const canvas = createCanvas(800, 400);
		const ctx = canvas.getContext('2d');

		ctx.drawImage(img1, 50, 100, 200, 200);

		ctx.font = '100px Arial';
		ctx.fillText('❤️', 300, 220);

		ctx.drawImage(img2, 500, 100, 200, 200);

		const buffer = canvas.toBuffer('image/png');
		let randomPoint = Math.floor(Math.random() * 10);
		if (user1.user?.id === user2.user?.id) {
			randomPoint = Math.floor(Math.random() * 4);
		}

		const percentage = Math.floor((randomPoint / 10) * 100);
		await interaction.editReply({
			files: [{ attachment: buffer, name: 'love_calc.png' }],
			content: `***${user1.user?.globalName ?? user1.user?.username}*** x ***${user2.user?.globalName ?? user2.user?.username}*** =  ___${percentage}%___ :heart_decoration:`,
		});
	},
} satisfies Command;
