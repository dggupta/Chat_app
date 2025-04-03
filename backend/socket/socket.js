import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();
import path from "path"
// const _dirname = path.resolve()
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin:['http://localhost:5173'],
        methods:['GET', 'POST'],
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const userSocketMap = {}; // {userId->socketId}


io.on('connection', (socket)=>{
    const userId = socket.handshake.query.userId
    if(userId !== undefined){
        userSocketMap[userId] = socket.id;
    } 

    io.emit('getOnlineUsers',Object.keys(userSocketMap));

    socket.on('disconnect', ()=>{
        delete userSocketMap[userId];
        io.emit('getOnlineUsers',Object.keys(userSocketMap));
    })

})
// app.use(express.static(path.join(_dirname, "/frontend/dist")))
// app.get('*',(_,res)=>{
//     res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
// })
export {app, io, server};
