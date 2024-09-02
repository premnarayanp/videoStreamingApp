import Room from './room.schema.js';

//------------register the User--------------
const createRoom = async (req, res) => {
    const body = req.body;
    // console.log("body==", body);
    body.isPrivate = Boolean(body.isPrivate);
    body.isAllowDirectJoin = Boolean(body.isAllowDirectJoin);

    try {
        const room = await Room.findOne({ roomId: body.roomId });
        if (!room) {
            const myRoom = await Room.create(body);
            return res.json({ success: true, msg: "Successfully created Room", data: { myRoom: myRoom } });
        } else {
            return res.json({ success: false, msg: "roomId Already Exist", data: null });
        }
    } catch (error) {
        console.log('error in creating Room ', error);
        return res.json({ success: false, msg: "Internal Server Error", data: null });
    }
}

//Get allRoom from DB
const getMyRooms = async (req, res) => {
    try {
        //console.log("--------- req.user._id-------------", req.user);
        const myRooms = await Room.find({ user: req.user._id });
        //console.log("myRooms=", myRooms);
        if (myRooms) {
            return res.json({ success: true, msg: "Successfully got Rooms", data: { myRooms: myRooms } });
        } else {
            return res.json({ success: true, msg: "Successfully got Rooms", data: { myRooms: [] } });
        }

    } catch (error) {
        return res.json({ success: false, msg: "Internal Server Error", data: null });
    }
}

export default { createRoom, getMyRooms }
