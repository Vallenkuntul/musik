const { MessageEmbed } = require("discord.js");
module.exports = async (client, queue, song) => {

    let duration = song.duration * 1000;

    if (song.playlist) {
        let thing = new MessageEmbed()
            .setColor(client.color)
            .setDescription(`š¶ | Start playing playlist \n[${song.playlist.name}](${song.playlist.url}) \`[${song.playlist.songs.length} songs]\`\n\nšµ | Start playing \n[${song.name}](${song.url}) - \`[${song.formattedDuration}]\``)
            .setThumbnail(song.thumbnail)
            .setFooter({ text: `Request by ${song.user.tag}`, iconURL: song.user.displayAvatarURL() });
        queue.textChannel.send({ embeds: [thing] }).then(message => setTimeout(() => { message.delete() }, duration));

    } else {
        let thing = new MessageEmbed()
            .setColor(client.color)
            .setDescription(`šµ | Start playing \n[${song.name}](${song.url}) - \`[${song.formattedDuration}]\``)
            .setThumbnail(song.thumbnail)
            .setFooter({ text: `Request by ${song.user.tag}`, iconURL: song.user.displayAvatarURL() });
        queue.textChannel.send({ embeds: [thing] }).then(message => setTimeout(() => { message.delete() }, duration));
    }

    

}