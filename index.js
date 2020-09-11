const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

if(!config.token || config.token == undefined) {
    return console.log("Unable to load secure conf file: ");
}


client.once('ready', () => {
    console.log('Ready!');
});

client.login(config.token);

client.on('message', message => {
    if(message.content == "!ping")
    message.channel.send("Pong!");
});
