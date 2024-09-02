import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    participants: [{
        type: String
    }],
    isPrivate: {
        type: Boolean
    },
    isAllowDirectJoin: {
        type: Boolean
    }

}, {
    timestamps: true
});

const Room = mongoose.model('Room', RoomSchema);
export default Room;
