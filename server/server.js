import app from "./index.js";
import connectDB from './src/config/mongoose.js';
import { Server as socket } from 'socket.io';

const port = process.env.PORT || 5000;

const server = app.listen(port, async function (error) {
    await connectDB();
    if (error) {
        console.log(`Error in running the server:${error}`);
    }
    console.log(`Server is running on port: ${port}`);
});

///Create a socket over the express server
const io = new socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
});



// Socket.io Maps
const emailToSocketIdMap = new Map();
const socketIdToEmailMap = new Map();

io.on('connection', (socket) => {
    console.log('New user connected: ', socket.id);


    //======================Single one to one call sockets===========================================
    //if any user open the website/URL then add-user request come here over socket.
    socket.on("add-user", (user) => {
        emailToSocketIdMap.set(user.email, socket.id);
        socketIdToEmailMap.set(socket.id, user.email);
        //console.log('add-user: ', user);
    });

    // any user doing single call  req for any particular single friend over socket
    socket.on('call:join', (data) => {
        //console.log(data);
        const { to, from } = data;
        const friendSocketId = emailToSocketIdMap.get(to.email);
        //send  join call for that friend
        io.to(friendSocketId).emit("call:join", data);
    });

    //Any friend accept call
    socket.on("call:accepted", (data) => {
        const { to, from } = data;
        const friendSocketId = emailToSocketIdMap.get(to.email);
        io.to(friendSocketId).emit("call:accepted", data);
    });


    //======================Group/Room  call sockets==============================
    //Join room By host
    socket.on('room:join', (data) => {
        //console.log(data);
        const { room, email } = data;
        io.to(room.id).emit("user:joined", { email, id: socket.id });
        socket.join(room.id);
        io.to(socket.id).emit("room:join", data);
    });


    socket.on('room-user:call', (data) => {
        console.log("room-user:call-", data);
        const { to, offer } = data;
        io.to(to).emit("room:incoming:call", { from: socket.id, offer: offer });
    });

    socket.on('room-user-call:excepted', (data) => {
        console.log(" room-user-call:excepted==", data);
        const { to, ans } = data;
        io.to(to).emit("room-user-call:excepted", { from: socket.id, ans });
    });


    socket.on('user:join', (data) => {
        console.log("=============user:join=============", data);
        const { room, email } = data;
        io.to(socket.id).emit("room:join", data);
    });


    socket.on('disconnect', () => {
        console.log('User disconnected: ', socket.id);
        const email = socketIdToEmailMap.get(socket.id);
        emailToSocketIdMap.delete(email);
        socketIdToEmailMap.delete(socket.id);
    });
});