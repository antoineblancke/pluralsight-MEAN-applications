var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    User = mongoose.model('User');


module.exports = function(){
    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.findOne({username: username}).exec(function (err, user) {
                if (user && user.authenticate(password)) {

                    var fakeUser = {
                        username:user.username,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        roles: user.roles
                    };

                    return done(null, fakeUser);
                } else {
                    return done(null, false);
                }
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        if (user) {
            done(null, user.username);
        }
    });

    passport.deserializeUser(function (username, done) {
        User.findOne({username: username}).exec(function (err, user) {
            if (user) {
                var fakeUser = {
                    username:user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    roles: user.roles
                };
                return done(null, fakeUser);
            } else {
                return done(null, false);
            }
        })
    });
}



