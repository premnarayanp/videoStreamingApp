import User from './user.schema.js';
import jwt from 'jsonwebtoken';

//------------register the User--------------
export const create = async (body) => {
    try {
        const user = await User.findOne({ email: body.email });
        if (!user) {
            const user = await User.create(body);
            user.password = "XXXXX";
            return { success: true, msg: " You Successfully Registered", data: { user: user } }
        } else {
            return { success: false, msg: "User Already Exist", data: null };
        }
    } catch (error) {
        console.log('error in creating user while signing up', error);
        return { success: false, msg: "Internal Database Server Error", data: null };
    }
}

// sign in for user
export const createJWTSession = async (body) => {
    try {
        const user = await User.findOne({ email: body.email });
        if (!user || user.password != body.password) {
            return { success: false, msg: "Invalid Username and Password", data: null };
        } else {
            user.password = "XXXXX";
            return {
                success: true,
                msg: "Successfully SignIn,here is token,Please  keep it safe",
                data: {
                    token: jwt.sign(user.toJSON(), process.env.SECRETE_KEY, { expiresIn: 1000 * 60 * 60 }),
                    user: user
                }
            };
        }
    } catch (error) {
        console.log('error in creating user while signing up', error);
        return { success: false, msg: "Internal Database Server Error", data: null };
    }

}
