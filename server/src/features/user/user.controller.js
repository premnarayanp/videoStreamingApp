import { createJWTSession, create } from './user.repository.js';

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

export default { login, signUp };