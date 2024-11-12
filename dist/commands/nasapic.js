import process from 'node:process';
import { EmbedBuilder } from 'discord.js';
export default {
    data: {
        name: 'nasapic',
        description: 'Shows the picture of the day from space',
    },
    async execute(interaction) {
        await interaction.deferReply();
        try {
            const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`;
            const res = await fetch(url);
            const json = await res.json();
            const imageUrl = json?.hdurl || json.url;
            const botAvatarURL = interaction.client.user?.displayAvatarURL() || 'https://example.com/default-avatar.png';
            const Embed = new EmbedBuilder()
                .setTitle(`${json?.title}`)
                .setDescription(`${json.explanation}`)
                .setImage(imageUrl)
                .setColor('#1a1a2e')
                .setFooter({
                text: `Requested on ${new Date().toLocaleString()}`,
                iconURL: botAvatarURL,
            })
                .setTimestamp()
                .setAuthor({
                name: 'NASA APOD',
                iconURL: 'https://api.nasa.gov/sites/all/themes/custom/nasa/nasa-logo.svg',
                url: 'https://www.nasa.gov/mission_pages/apod/index.html',
            })
                .setThumbnail(botAvatarURL);
            await interaction.editReply({ embeds: [Embed] });
        }
        catch (error) {
            console.error('Error fetching NASA APOD:', error);
            // Edit the reply to show an error message
            await interaction.editReply({
                embeds: [new EmbedBuilder().setColor('DarkRed').setTitle('Sorry, there was an error retrieving the picture.')],
            });
        }
    },
};
//# sourceMappingURL=nasapic.js.map