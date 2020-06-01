const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = "*";
const math = require('mathjs');
const r = "RANDOM";


bot.on('ready', () => {
    console.log(`${bot.user.tag} read!`)
    bot.user.setStatus("invisible")
    bot.user.setActivity('[*] THE SERVER', ({type: "WATCHING"}))



})
 
bot.on('message', message => {
    let msg = message;
    let args = msg.content.slice(prefix.length).split(/ +/);
    let command = args.shift().toLowerCase();
    let cmd = command;
 
    if (command === 'help') {
        const embed = new Discord.MessageEmbed()
        .setTitle('Commands')
        .addField('General', `${prefix}help - Shows this message.`)
        .addField('Info', `${prefix}dev - Shows info on who made this bot.`)
        .addField('Commands', `${prefix}kick - removes user from server (mut provide reason). \n${prefix}ban - bans user from server (must provide reason) \n${prefix}purge - clears messages. (1-100 only)`)
        .setColor(0xff0000);
        msg.channel.send(embed);
    }
if (command === 'dev') {
          const embed = new Discord.MessageEmbed()
          .setTitle('Author')
          .setDescription('Discord - nw#0001')
          .setColor("RANDOM")
          .setFooter("hi ily")
          .setTimestamp();
          msg.channel.send(embed)

}
    if (cmd === 'clear' || cmd === 'purge'){
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
            return msg.channel.send('I cannot ban someone that is mod/admin.');
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
 
bot.login("NzExMjYwOTY1ODk5MDc1NjM1.XtRK6w.EDq6o6qUERva-jG-23BW7Qe8oMc");