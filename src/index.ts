import process from 'node:process';
import { URL } from 'node:url';
import { Client, GatewayIntentBits } from 'discord.js';
import { configDotenv } from 'dotenv';
// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import { loadCommands, loadEvents } from './util/loaders.js';
import { registerEvents } from './util/registerEvents.js';

// for replit + UptimeRobot hosting
const app = express();
const PORT = process.env.PORT ?? 3_000;

app.get('/', (req: any, res: any) => res.send(`bot's running ${req}`));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

configDotenv();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const events = await loadEvents(new URL('events/', import.meta.url));
const commands = await loadCommands(new URL('commands/', import.meta.url));

registerEvents(commands, events, client);
// console.log(process.env.DISCORD_TOKEN);

void client.login(process.env.DISCORD_TOKEN);
