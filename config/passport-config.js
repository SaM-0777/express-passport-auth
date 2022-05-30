const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        // param-1 : error(server/system), param-2 : user, param-3 : error message
        // done(param-1, param-2, param-3)
        if (user == null) return done(null, false, { message: 'User not found!' })
        try {
            console.log(password, user.password)
            if (await bcrypt.compare(password, user.password)) return done(null, user)
            else return done(null, false, { message: 'Incorrect Password' })
        } catch (error) {
            return done(error)
        }
    }

    passport.use(new localStrategy({ usernameField: 'email' }, authenticateUser))
    // serialize user to store in session
    passport.serializeUser((user, done) => done(null, user.id))
    // deserialize user to single id
    passport.deserializeUser((id, done) => done(null, getUserById(id)))
}





module.exports = initialize;

