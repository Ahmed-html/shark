const Discord = require("discord.js");
const fs = require("fs");
const config = require("../../config/config.json");

module.exports.run = async (client, msg, args) => {
	const notice3 = new Discord.MessageEmbed()
		.setDescription(`:x: I don't have permission to ban people!`)
		.setColor("RED");
	if (!msg.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
		return msg.channel.send(notice3).then(msg => msg.delete({ timeout: 5000 }));
	}

	const banusermentioned = msg.mentions.users.first();
	const banTaged =
		banusermentioned ||
		(args[0]
			? args[0].length == 18
				? msg.guild.members.cache.get(args[0]).user
				: false
			: false);

	// const banTaged = msg.mentions.users.first();
	let reason = args.slice(1).join(" ");

	const mmqembed = new Discord.MessageEmbed()
		.setDescription(
			`:x: ${msg.author.username}, Missing Permission!`
		)
		.setColor("BLUE");
	if (!msg.member.hasPermission("BAN_MEMBERS")) {
		return msg.channel
			.send(mmqembed)
			.then(msg => msg.delete({ timeout: 5000 }));
	}
	const kntlembed = new Discord.MessageEmbed()
		.setTitle("Command: !ban")
		.setDescription(
			":x: Wrong Usage! \n\n**Function:** Ban a member\n**Usage:** !ban [User] [Reason]\n**Example:** !ban @Duko Why not"
		)
		.setColor("RED");
	if (!banTaged) {
		return msg.channel
			.send(kntlembed)
			.then(msg => msg.delete({ timeout: 10000 }));
	}
	const notice2 = new Discord.MessageEmbed()
		.setDescription(`:x: You cannot ban yourself!`)
		.setColor("RED");

	if (banTaged.id === msg.author.id) {
		return msg.channel
			.send(notice2)
			.then(msg => msg.delete({ timeout: 10000 }));
	}

	const dsfdsfsdf = new Discord.MessageEmbed()
		.setDescription(
			`:x: That member has roles higher or equal to you!`
		)
		.setColor("RED");
	const sdfsdfsdfsd = new Discord.MessageEmbed()
		.setDescription(
			`:x: That member has roles higher or equal to me!`
		)
		.setColor("RED");
	const botRolePossition = msg.guild.member(client.user).roles.highest.position;
	const rolePosition = msg.guild.member(banTaged).roles.highest.position;
	const userRolePossition = msg.member.roles.highest.position;
	if (userRolePossition <= rolePosition) return msg.channel.send(dsfdsfsdf);
	if (botRolePossition <= rolePosition) return msg.channel.send(sdfsdfsdfsd);

	const sdfdfsdfsdfdfs = new Discord.MessageEmbed()
		.setDescription(
			`:x: An error occurred with baning that member!`
		)
		.setColor("RED");

	if (reason.length < 1) reason = "No reason given.";

	if (!msg.guild.member(banTaged).bannable) {
		return msg.channel.send(sdfdfsdfsdfdfs);
	}

	const banEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setAuthor("Action Ban")
		.addField("Target", `<@${banTaged.id}>`)
		.addField("User", `**<@${msg.author.id}>**`)
		.addField("Reason", `\`\`\`${reason}\`\`\``)
		.setTimestamp()
		.setFooter("• Ban User Information"); //
	const bsuembed = new Discord.MessageEmbed()
		.setDescription(
			`:white_check_mark: Banned **${banTaged.username}#${banTaged.discriminator}** | **${reason}**`
		)
		.setColor("BLUE");

	msg.delete();
	msg.channel.send(bsuembed);
	msg.guild.members.ban(banTaged.id, { reason });

	banTaged.send(
		`You are banned in **${msg.guild.name}**, Reason : **${reason}**.`
	);
};

module.exports.help = {
	name: "ban",
	description: "This command is used for banning the members you dont like.",
	usage: "!ban <mention> <reason>",
	accessableby: "Ban Members",
	aliases: []
};
