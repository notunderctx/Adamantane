import { Events, ActivityType } from 'discord.js';
import type { Event } from './index.js';

export default {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Logged in as ${client.user.tag}`);

		if (client.guilds.cache.size >= 2_000) {
			client.user.setPresence({
				activities: [
					{
						name: `${client.guilds.cache.size} servers`,
						type: ActivityType.Watching,
					},
				],
			});
		} else {
			client.user.setPresence({
				status: 'idle',
				activities: [
					{
						name: 'a cool video',
						type: ActivityType.Watching,
						url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
					},
				],
			});
		}
	},
} satisfies Event<Events.ClientReady>;
