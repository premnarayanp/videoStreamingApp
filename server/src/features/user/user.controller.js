import { createJWTSession, create, getAllFriends } from './user.repository.js';

//register the User
const signUp = async (req, res) => {
    const body = req.body;
    console.log(body);

    if (!body.name || !body.email || !body.password || !body.confirmPassword) {
        return res.json({ success: false, msg: "please fill all fields..", data: null });
    }

    if (body.password != body.confirmPassword) {
        return res.json({ success: false, msg: "Confirm Password Not matched!", data: null });
    }

    try {
        const response = await create(body);
        return res.json(response);
    } catch (error) {
        return res.json({ success: false, msg: "Internal Server Error", data: null });
    }

}

// sign in for user
const login = async function (req, res) {
    const body = req.body;
    //console.log(body);
    try {
        const response = await createJWTSession(body);
        if (!response.success && !response.data) {
            return res.json(500, response)
        }
        return res.json(response);
    } catch (error) {
        //console.log('error in creating user while signing up', error);
        return res.json(500, { success: false, msg: "Internal Server Error", data: null });
    }

}


//Get all user from DB
const getFriends = async (req, res) => {
    try {
        const friends = await getAllFriends(req.params.id);
        if (friends) {
            return res.json({ success: true, msg: "All friends loaded successfully", data: { allFriends: friends } });
        } else {
            return res.json({ success: false, msg: "User Not found", data: null });
        }
    } catch (error) {

    }
}

const getUserIsOnline = async (req, res) => {
    try {
        const sendUserSocket = global.onlineUsers_Over_UserId.get(req.params.userId);
        const statusData = {
            chatStatus: sendUserSocket ? "Online" : "Offline",
            from: req.params.userId,
        }

        return res.json({ success: true, msg: " ", data: statusData });
    } catch (error) {
        return res.json(500, { success: false, msg: "Internal Server Error", data: null });
    }
}

export default { login, signUp, getUserIsOnline, getFriends };