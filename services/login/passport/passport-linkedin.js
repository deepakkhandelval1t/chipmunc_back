var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var passport = require("passport");
var config = require('../../../configs/config').config();
const crypto = require("crypto");
//var IntercomService = require('../../user/intercomService');

exports.setup = function () {
    passport.use(new LinkedInStrategy({
        clientID: config.linkedinAuth.clientID,
        clientSecret: config.linkedinAuth.clientSecret,
        callbackURL: config.website + config.linkedinAuth.callbackURL,
        scope: ['r_emailaddress', 'r_basicprofile'],
        passReqToCallback : true // allows us to pass back the entire request to the callback
    }, function (req, accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect... 
        process.nextTick(function () {
            process.nextTick(function () {
                try {
                    req.models.socialId.find({social_id: profile.id, social_name: config.socialPlatforms.Linkedin}, function (err, people) {
                        if (err)
                            return done(err);
                        if (people && people.length > 0){
                                req.models.users.get(people[0].fk_user_id, function (err, person) {
                                    return done(null, {displayName: person.fullName(),id: person.id, email: person.email});
                                });
                            }
                        else  {
                            req.models.users.find({email: profile.emails[0].value}, function (err, people) {
                                if(people && people.length > 0){
                                    createSocialId(req, accessToken, refreshToken, people, profile, function(err, data){
                                        return err?done(err, null):done(null, data);
                                    }) 
                                }
                                else{
                                    createUserAndSocialId(req, accessToken, refreshToken, profile, function(err, data){
                                        userData = {
                                            "firstName": profile.name.givenName,
                                            "lastName": profile.name.familyName,
                                            "email": profile.emails[0].value,
                                          }
                                        IntercomService.onboarding1Tag(userData, config.intercom.onboardingRegistered, function(r){});
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
        });
    }));
};

exports.authenticate = function (req, res, next) {
  passport.authenticate('linkedin', function (err, user, info) {
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


var createUserAndSocialId = function(req,token, refreshToken, profile, next){

    var tokenToConfirm = crypto.randomBytes(16).toString("hex");
    var userSharingCode = crypto.randomBytes(10).toString("hex");
    var isUserConfirmed = true;
    var defaultRole = config.database.defaultRole;

    req.models.users.create([
    {
        username: profile.emails[0].value,
        role: defaultRole,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        confirmation_token: tokenToConfirm,
        is_confirmed: isUserConfirmed,
        sharing_code: userSharingCode,
        fk_status_id: 1

    }],function (err, user) {
        if(user[0]){
            createSocialId(req ,token, refreshToken, user, profile, function(err, data){
                err?next(err, null):next(null, data);
            })
        }
        else
        {
            next(err, null);
        }
    });
}

var createSocialId = function(req, token, refreshToken, user, profile, next){
    req.models.socialId.create([
        {
            social_name: config.socialPlatforms.Linkedin, 
            social_id: profile.id, 
            fk_user_id: user[0].id,
            token: token,
            refresh_token: refreshToken

        }],function (err, items) {
            if(err){
                next(err, null);
            }
            else
                next(null, {displayName: user[0].fullName(),id: user[0].id, email: user[0].email}); //if authentication unsuccessful, return error 
        });
}