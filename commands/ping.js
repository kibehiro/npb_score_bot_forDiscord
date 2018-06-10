module.exports = {
    name: 'ping', //コマンド名
    description: 'Ping!',
    execute(message){
        message.channel.send('Pong')
    }
};