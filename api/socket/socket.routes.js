
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('beat update', beat => {
            console.log('**********', beat);
            io.to(socket.myTopic).emit('beat update', beat)
        })
        socket.on('add song', song => {
            io.to(socket.myTopic).emit('add song', song)
        })
        socket.on('chat newMsg', msg => {
            io.to(socket.myTopic).emit('chat addMsg', msg)
        })
        socket.on('beat topic', topic => {
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic;
        })
        socket.on('user typing', typing => {
            socket.broadcast.emit('typing', typing);
        })
    })
}
