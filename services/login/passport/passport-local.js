var LocalStrategy = require('passport-local').Strategy;
var passport = require("passport");
var bcrypt = require('bcrypt-nodejs');

exports.setup = function () {
  passport.use(new LocalStrategy({
        passReqToCallback : true // allows us to pass back the entire request to the callback
      },
      function (req, username, password, done) {
        
        try {
          req.models.users.find({email: username , confirm : true }, (err, people) => {
            if(err){
              done(null, false, {message: err});
            } else if(people && people.length > 0){
              if(people[0].status == 1){
                bcrypt.compare(password, people[0].password, (err, res) => {
                  if(res){
                    if((people[0].is_deleted==false)&&(people[0].is_blocked==false)){
                      return done(null, {id: people[0].id, email: people[0].email, role: people[0].role , name : "" });
                    }
                    else{
                      if(people[0].is_blocked==true)
                        return done(null, false, {message: "Your account has been blocked please contact to support team"}); 
                      else
                        return done(null, false, {message: "Your account is inactive please contact to support team"}); 
                    }
                   }
                  return done(null, false, {message: "Invalid credentials"}); 
                });
              }
              else{
                  return done(null, false, {message: "Email is not verified yet"});
              }
            }
            else
              return done(null, false, {message: "User doesn't exist"});     
          });
          
        } catch (error) {
          return done(null, false, {message: error}); 
        }
   
    }
  ));

  passport.serializeUser(function (user, done) {
    if (user) {
      done(null, user); // nothing is required
    }
  });

  passport.deserializeUser(function (user, done) {
    return done(null, user); // nothing is required
  });
};

exports.authenticate = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      next({log_err: err, user_msg: 'An error occured while login'}, null);
    }
    else if (!user) {
      next({log_err: info, user_msg: info}, null);
    }
    else {
      next(null, user);
    }
  })(req, next);
};
