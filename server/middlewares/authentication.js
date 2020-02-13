const bcrypt = require("bcryptjs");
const debug = require("debug")("auth");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

module.exports = {
    configureAuth: (app, db) => {
        const collection = "users";

        passport.serializeUser((user, done) => {
            const { username, name, roles } = user;
            debug("serialising", user.username);
            done(null, JSON.stringify({ username, name, roles }));
        });

        passport.deserializeUser((payload, done) => {
            const user = JSON.parse(payload);
            debug("deserialising", user.username);
            done(null, user);
        });

        app.use(passport.initialize());
        app.use(passport.session());

        passport.use(
            new LocalStrategy((username, password, done) => {
                debug("logging in", username);
                db.collection(collection).findOne({ username }, (err, user) => {
                    bcrypt.compare(password, user ? user.password : "").then(match => {
                        if (user && match) {
                            const { username, name, roles } = user;
                            return done(null, { username, name, roles });
                        }
                        return done(null, false, { message: "Incorrect credentials." });
                    });
                });
            })
        );
    },
    ensureLoggedIn: (req, res, next) => {
        debug("ensuring", req.user ? req.user.username : "<unknown>");
        if (!req.user) {
            return res.sendStatus(401);
        }
        next();
    },
    ensureHasRole: roles => (req, res, next) => {
        debug("ensuring", req.user ? req.user.role : "<unknown>");
        if (req.user && !roles.some(r => req.user.role.indexOf(r))) {
            res.sendStatus(403);
            res.end();
            return res;
        }
        next();
    }
};
