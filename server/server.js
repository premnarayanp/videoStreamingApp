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
    //console.log('New user connected: ', socket.id);

    socket.on("add-user", (user) => {
        emailToSocketIdMap.set(user.email, socket.id);
        socketIdToEmailMap.set(socket.id, user.email);
    });

    socket.on('call:join', (data) => {
        console.log(data);
        const { to, from, room } = data;
        // emailToSocketIdMap.set(from.email, socket.id);
        // socketIdToEmailMap.set(socket.id, from.email);
        const friendSocketId = emailToSocketIdMap.get(to.email);
        io.to(friendSocketId).emit("call:join", data);
    });

    socket.on("call:accepted", (data) => {
        const { to, from, room } = data;
        const friendSocketId = emailToSocketIdMap.get(to.email);
        io.to(friendSocketId).emit("call:accepted", data);
    });


    socket.on('disconnect', () => {
        console.log('User disconnected: ', socket.id);
        const email = socketIdToEmailMap.get(socket.id);
        emailToSocketIdMap.delete(email);
        socketIdToEmailMap.delete(socket.id);
    });
});