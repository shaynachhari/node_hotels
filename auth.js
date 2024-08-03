const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person')

//authentication logic here
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        // console.log('Received credentials:', username, password);
        const user = await Person.findOne({ username });
        if (!user)
            return done(null, false, { message: 'Incorrect username.' });
        
        // add here comprePasword for hash-pasword
        // const isPasswordMatch = user.password === password;
        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch)
            return done(null, user);
        else
            return done(null, false, { message: 'Incorrect password.' })
    } catch (error) {
        return done(error);
    }
}));

module.exports = passport;