/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "skipto",
    category: "Music",
    aliases: [ "jump" ],
    description: "Skip Music",
    args: false,
    usage: [],
    examples: [],
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES" ],
    owner: false,
    async execute(client, message, args) {
        const memberVC = message.member.voice.channel;
        if (!memberVC) return message.reply(`❌ | You must be in a voice channel!`);

        const clientVC = message.guild.me.voice.channel;
        if (!clientVC) return message.reply(`❌ | I'm not on any voice channel!`);

        if (memberVC !== clientVC) return message.reply(`❌ | You must be in the same channel as ${message.client.user}!`);

        const queue = message.client.distube.getQueue(message);
        if (!queue) return message.reply(`❌ | There is no music playing!`);

        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setFooter({ text: `Request by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() });

        let target = parseInt(args[0]);
        if (isNaN(target)) return message.reply(`❌ | Please enter a valid number!`)

        message.client.distube.jump(message, parseInt(args[0]))
            .then(queue => {
                embed.setDescription(`⏩ | Successfully **Skipped** ${args[0]} songs.`);
                message.channel.send({ embeds: [embed] });
            })
            .catch(error => {
                return message.channel.send("❌ | An error occurred while skip the song."); 
            });
    }
}