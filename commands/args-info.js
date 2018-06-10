module.exports = {
    name: 'args', //こっちがコマンド名
    description: 'test command : args',
    execute(message, args) {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }

        message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    }
};