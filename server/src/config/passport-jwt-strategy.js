import dotenv from 'dotenv';
dotenv.config();

import User from '../features/user/user.schema.js';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRETE_KEY;
passport.use(new Strategy(opts, async function (jwt_payload, done) {
    // console.log("=========email===========", jwt_payload);
    try {
        const user = await User.findById(jwt_payload._id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }

    } catch (error) {
        console.log("error in finding User");
        return;
    }

}))

// module.exports.passport;
export default passport;
