const { log } = require('console');
const express=require('express');
const path=require('path')
const app =express()
const PORT = process.env.PORT || 4000;
const server=app.listen(PORT,()=>console.log(`chat server on PORT ${PORT}`));
const io=require('socket.io')(server)

app.use(express.static(path.join(__dirname,'public')))

let socketConnected=new Set()
let usernames = new Map(); // To store socket IDs and their associated usernames


io.on('connection',onConnected)

const broadcastUsernames = () => {
    io.emit('usernames', Array.from(usernames.values()));
};

function onConnected(socket){
    console.log("id",socket.id)
    socketConnected.add(socket.id)

    io.emit('totalclients',socketConnected.size)

    socket.on('disconnect',()=>{
        console.log("Socket Disconnected",socket.id);
        socketConnected.delete(socket.id)
        io.emit('totalclients',socketConnected.size)
        
    })
    socket.on('message',(data)=>{
        console.log(data)
        socket.broadcast.emit('chatMessage',data)
    })

    socket.on('feedback',(data)=>{
        socket.broadcast.emit('feedback',data)
    })
    socket.on('setUsername', (username) => {
        console.log(`Username set for ${socket.id}: ${username}`);
        usernames.set(socket.id, username);
        broadcastUsernames();
    });
    

}


