var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var passport = require("passport");
var config = require('../../../configs/config').config();
const crypto = require("crypto");
var userService =  require('../../userService');
exports.setup = function () {
    passport.use(new GoogleStrategy({
        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret,
        callbackURL: config.website + config.googleAuth.callbackURL,
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function (req, token, refreshToken, profile, done) {
        process.nextTick(function () {
            try {
                req.models.sociallogin.find({token: profile.id, social_name: config.socialPlatforms.Google}, function (err, people) {
                    if (err)
                        return done(err);
                    if (people && people.length > 0) {
                        req.models.users.get(people[0].fk_user_id, function (err, person) {
                            return done(null, { displayName: person.fullName(),id: person.id, email: person.email});
                        });
                    }
                    else{
                        req.models.users.find({email: profile.emails[0].value}, function (err, people) {
                            if(people && people.length > 0){
                                userService.createSocialId(req, token, refreshToken, people, profile, function(err, data){
                                    return err?done(err, null):done(null, data);
                                }) 
                            }
                            else{
                               userService.createUserAndSocialId(req, token, refreshToken, profile, function(err, data){
                                    userData = {
                                        "firstName": profile.name.givenName,
                                        "lastName":  profile.name.familyName,
                                        "email":     profile.emails[0].value,
                                      }
                                    return err?done(err, null):done(null, data);
                                }) 
                            }
                        });
                    }
                });
                
            } catch (error) {
                return done(error, null);
            }
         
        });
    }));
};

exports.authenticate = function (req, res, next) {
  passport.authenticate('google', function (err, user, info) {
    if (err) {
      next(err, null);
    }
    else if (!user) {
      next(info, null);
    }
    else {
      next(null, user);
    }
  })(req, next);
};

