import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    roomId: String,
    creator: String,
    participants: [String]
});

const Room = mongoose.model('Room', RoomSchema);
export default Room;
