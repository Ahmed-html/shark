const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
	const embed = new Discord.MessageEmbed()
		.setAuthor(`Unfortunately, we are a private bot`, client.user.displayAvatarURL())
		.setColor("#3498DB")
		.setDescription(
			`This bot was made specifically for the ShvrkBait discord server, we recomend other alternatives, such as Dyno or MEE6.`
		)
	message.channel.send(embed);
};

module.exports.help = {
	name: "invite",
	description: "This command is used for inviting the bot",
	usage: "!invite",
	accessableby: "Members",
	aliases: []
};