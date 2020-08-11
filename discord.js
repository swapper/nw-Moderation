const Discord = require('discord.js');
const bot = new Discord.Client();
var moment = require(`moment`);
const prefix = "*";
const math = require('mathjs');
const r = "RANDOM";
const map = require(`map`);
const fs = require("fs");

bot.on('ready', () => {
    console.log(`Logged in as Moderation Bot!`)
    bot.user.setStatus("invisible")
    bot.user.setActivity(`[*] @JRZ on IG`, ({type: "WATCHING"}))



})
 
bot.on('message', message => {
    let msg = message;
    let args = msg.content.slice(prefix.length).split(/ +/);
    let command = args.shift().toLowerCase();
    let cmd = command;

    
    
if (command === `user`) {
    let user = message.mentions.users.first() || message.author; // You can do it by mentioning the user, or not.

    function game() {
        let game;
        if (user.presence.activities.length >= 1) game = `${user.presence.activities[0].type} ${user.presence.activities[0].name}`;
        else if (user.presence.activities.length < 1) game = "Nothing"; // This will check if the user doesn't playing anything.
        return game; // Return the result.
}

    let x = Date.now() - user.createdAt; // Since the user created their account.
    let y = Date.now() - message.guild.members.cache.get(user.id).joinedAt; // Since the user joined the server.
    let created = Math.floor(x / 86400000); // 5 digits-zero.
    let joined = Math.floor(y / 86400000);

    const member = message.guild.member(user);
    let nickname = member.nickname !== undefined && member.nickname !== null ? member.nickname : "None"; // Nickname
    let createdate = moment.utc(user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss"); // User Created Date
    let joindate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss"); // User Joined the Server Date
    let status = user.presence.status; // DND, IDLE, OFFLINE, ONLINE
    let avatar = user.avatarURL({size: 2048}); // Use 2048 for high quality avatar.
    const embed = new Discord.MessageEmbed()
    .setAuthor(user.username) 
    .setThumbnail(avatar)
    .setDescription("This is the user's info!")
    .setColor("RANDOM")
    .addField("Full Username:", `${user.username}#${user.discriminator}`)
    .addField("Status:", user.presence.status)
    .addField("ID:", user.id)
    .addField("Created At:", moment.utc(user.createdAt).format("dddd, MMMM Do YYYY, HH:mm"))
    .addField("Joined At:", moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm"))
    .addField("Playing:", game(), true)
    .setTimestamp()
    
    msg.channel.send(embed);
};




    if (command === 'help') {
        const embed = new Discord.MessageEmbed()
        .setTitle('Commands')
        .addField('General', `${prefix}help - Shows this message.`)
        .addField('Info', `${prefix}dev - Shows info on who made this bot.`)
        .addField('Commands', `${prefix}kick - Removes user from server (must provide reason). \n${prefix}ban - Bans user from server (must provide reason) \n${prefix}purge - clears messages. (1-100 only)`)
        .addField('Userinfo', `${prefix}user - This command displays your user info`)
        .setColor(0xff0000);
        msg.channel.send(embed);
}
    if (command === 'dev') {
          const embed = new Discord.MessageEmbed()
          .setTitle('Author')
          .setDescription('Discord - nw#0001\n Instagram - @JRZ')
          .setColor("RANDOM")
          .setTimestamp();
          msg.channel.send(embed)

}
    if (cmd === 'purge'){
        if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("You can't use this command!");
        if(!args[0]) return msg.channel.send("Specify how many messages you want to delete.");
        msg.delete();
        msg.channel.bulkDelete(args[0]).catch(e => { msg.channel.send("You can only delete 100 messages at once.")});
        msg.channel.send(`Successfully deleted \`${args[0]} messages\``).then(m => m.delete({ timeout: 5000 }));
}
    if(cmd === 'kick'){
        if(!msg.member.hasPermission('KICK_MEMBERS')) return msg.channel.send("You don't have permission to kick members.");
        let toKick = msg.mentions.members.first();
        let reason = args.slice(1).join(" ");
        if(!args[0]) return msg.channel.send('Please mention someone to kick!');
        if(!toKick) return msg.channel.send(`${args[0]} is not a member.`);
        if(!reason) return msg.channel.send('Specify a reason.');
 
    if(!toKick.kickable){
        return msg.channel.send('I cannot kick someone that is mod/admin.');
}
 
    if(toKick.kickable){
        let x = new Discord.MessageEmbed()
        .setTitle('Kick')
        .addField('Member Kicked', toKick)
        .addField('Kicked by', msg.author)
        .addField('Reason', reason)
        .addField('Date', msg.createdAt)
        .setColor(r);
 
    msg.channel.send(x);
         toKick.kick();
}
}
    if(cmd === 'ban'){
        if(!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send("You don't have permission to ban members.");
        let toBan = msg.mentions.members.first();
        let reason = args.slice(1).join(" ");
        if(!args[0]) return msg.channel.send('Please mention someone to ban!');
        if(!toBan) return msg.channel.send(`${args[0]} is not a member.`);
        if(!reason) return msg.channel.send('Specify a reason.');
 
    if(!toBan.bannable){
         return msg.channel.send('I cannot ban someone that is Mod/Admin.');
}
 
    if(toBan.bannable){
        let x = new Discord.MessageEmbed()
        .setTitle('Ban')
        .addField('Member Banned', toBan)
        .addField('Banned by', msg.author)
        .addField('Reason', reason)
        .addField('Date', msg.createdAt)
        .setColor(r);
 
        msg.channel.send(x);
        toBan.ban();
}
       
        
}

}

);
 
bot.login("");
