// Import the discord.js module
const fs = require('fs');
const Discord = require('discord.js');
const {prefix, token, channel_id} = require('./config.json');


// Create an instance of a Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
    console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {

    if (message.author.bot) return;

    const baseball = client.channels.get(channel_id);//対象チャンネルのIDを登録

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(!client.commands.has(command)) return;

    try{
        client.commands.get(command).execute(message, args, baseball);
    }catch (e) {
        console.error(error);
        message.reply('error!');
    }

});

// Log our bot in
client.login(token);