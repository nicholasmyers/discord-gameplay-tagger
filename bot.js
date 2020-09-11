const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, token} = require('./config.json');

if(!token || token == undefined) {
    return console.log("Unable to load secure conf file: ");
}


client.once('ready', () => {
    console.log('Ready!');
});

client.login(token);

client.on('message', message => {

    //we don't care about messages from bots or not aimed at us
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' '); //tokenize our entire message
    const command = args.shift().toLowerCase(); //take the first word out and use that as our 'command' word

    switch(command) {
        case "help":
            var msg = `Hello ${message.author.username}, I am a discord bot! You can use me to auto-tag your friends who own the same games on Steam or other platforms!`;
            message.channel.send(msg);
            break;

        default: 
            message.channel.send(`"${command}" is not a recognized command... sorry! Try the "${prefix}help" command. `)
            break;
    }
});
