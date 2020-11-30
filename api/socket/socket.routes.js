
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('chat newMsg', msg => {
            console.log(msg)
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            io.to(socket.myTopic).emit('chat addMsg', msg)
        })
        socket.on('chat topic', topic => {
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic;
        })
        socket.on('user typing', typing => {
            console.log(typing);
            socket.broadcast.emit('typing', typing);
            // io.emit('typing', typing)
        })
    })
}
                                    // socket.on('add song', song =>{
                                    //     console.log('song',song)
                                    //     // io.to(socket.myTopic).emit('add song',song)
                                    // })