const Discord = require('discord.js');
const client = new Discord.Client();
let fetch = require('node-fetch');
let jsonata = require('jsonata');
const {prefix, token, steam_key} = require('./config.json');

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

    const args = message.content.slice(prefix.length).trim().split(/ +/); //tokenize our entire message, get rid of excess spaces
    const command = args.shift().toLowerCase(); //take the first word out and use that as our 'command' word

    switch(command) {
        case "help":
            var msg = `Hello ${message.author.username}, I am a discord bot! You can use me to auto-tag your friends who own the same games on Steam or other platforms!`;
            message.channel.send(msg);
            break;

        case "play":
            determineSteamGame(args);
            break;

        case "who-owns":
            
            break;

        default: 
            message.channel.send(`"${command}" is not recognized... sorry! Try "${prefix}help" to see what I can do! `)
            break;
    }
});

/* 
    determineSteamGame:
        This function makes an API call to Steam to retrieve all apps, and interacts with the user
        to validate the game they want to play

    INPUT: args [String[]]: Received as arguments from the user 
    OUTPUT-SUCCESS: [int]: an Steam game AppID
    OUTPUT-FAILURE: [int]: -1
*/
function determineSteamGame(args) {
    console.log(`Got ${args}`);
    console.log("Getting Steam games...");

    //make our initial call to grab all games
    //TODO: Create an affinity/cache list (e.g. previously-confirmed games to make this lookup faster or auto-complete)
    fetch("http://api.steampowered.com/ISteamApps/GetAppList/v2/")
        .then(checkRESTStatus)
        .then(res => res.json())
        .then(json => {

            //with our successful response, parse out the data and query with our keyword strings
            //TODO: use our arguments to pull out matching games, determine relevance
            var expression = jsonata("");
            var result = expression.evaluate(json);
            console.log(result);
        });
}

/* 
    getOwnership:
        This function makes an API call to Steam to retrieve all apps, and interacts with the user
        to validate the game they want to play

    INPUT: gameID [int]: A valid Steam AppID  
    OUTPUT-SUCCESS: [int[]]: a list of discord user-uuids who own the game-id
    OUTPUT-FAILURE: [int]: -1
*/
function getOwnership(gameID) {

}

/* 
    generateTags:
        This function creates a tag/message for all players that own the game (except current player)
        to summon them for game playing

    INPUT: 
        currUser [int]: a discord user-uuid, the user who initiated the command
        list [int]: the list of players who own the game, to mention
        gameInfo [JSON Object]: the information of a specific game (info retrieved from the Steam API call)
    OUTPUT-SUCCESS: [int]: 1
    OUTPUT-FAILURE: [int]: -1
*/
function generateTags(currUser, userList, gameInfo) {

}


/* 
    getGameInfo:
        This function creates a tag/message for all players that own the game (except current player)
        to summon them for game playing

    INPUT: 
        appID [int]: a valid AppID for a steam application
    OUTPUT-SUCCESS: [JSON Object]: information about a Steam Game
    OUTPUT-FAILURE: [int]: -1
*/
function getGameInfo(appID) {

}

function checkRESTStatus(res) {
    if (res.ok) { // res.status >= 200 && res.status < 300
        return res;
    } else {
        throw IntegrationException(`Failed to retrieve data: ${res.statusText}`);
    }
}