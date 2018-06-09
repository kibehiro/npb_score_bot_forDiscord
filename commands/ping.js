module.exports = {
    name: 'ping', //コマンド名
    description: 'Ping!',
    execute(message, args){
        message.channel.send('Pong')
    }
}