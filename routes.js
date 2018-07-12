var jwt = require("./services/login/jwt/jwtService").jwtProfile;
var config = require("./configs/config").config();
var expressJwt = require("express-jwt");
var pathToRegexp = require('path-to-regexp');

module.exports = function (app) {
  var unprotected = [
    pathToRegexp('/api/account/login'),
    pathToRegexp('/api/account/login/google'),
    pathToRegexp('/api/account/login/google/callback'),
    pathToRegexp('/api/account/login/facebook'),
    pathToRegexp('/api/account/login/facebook/callback'),
    pathToRegexp('/api/account/register'),
    pathToRegexp('/api/account/verify'),
    pathToRegexp('/api/account/verify/*'),
    pathToRegexp('/api/user/subscribe/*'),
    pathToRegexp('/api/user/reconfirm/*'),
    pathToRegexp('/api/user/resetpassword/*'),
    pathToRegexp('/api/find'),
    pathToRegexp('/api/saveans')
   ];
  app.use("/api", expressJwt({ secret: jwtCallBack }).unless({ path: unprotected }));
  app.use('/api/account', require('./controllers/accountCtrl').user);
  app.use('/api/find', require('./controllers/getQuestionCtrl').ques);
  app.use('/api/saveans', require('./controllers/saveuser_ansCtrl').ans);
  app.use('/api/profile', require('./controllers/profileCtrl').profile);
  app.use('/api/certificates', require('./controllers/certificationsCtrl').certifications);
  app.use('/api/education',require('./controllers/educationCtrl').educations);
  app.use('/api/employment', require('./controllers/employmentCtrl').employment);
  app.use('/api/coursetype', require('./controllers/edu_course_typeCtrl').coursetype);
  app.use('/api/course', require('./controllers/edu_coursesCtrl').course);
  app.use('/api/eduspecialization', require('./controllers/edu_specializationCtrl').specialization);
  app.use('/api/languages', require('./controllers/languagesCtrl').languages);
};
var jwtCallBack = function (req, payload, done) {
  //Generate new token for a authenticated request
  if (payload) {
    var token = jwt.generateToken({ username: payload.username });
    // Set the session details for the request in the request header
    // Add the new token to request header
    req.headers.session = { username: payload.username };
    req.headers['x-token'] = token;
    //Fetch and return the secrect key for the tenant of the request
    var sect = config.jwt.secret;
    done(null, sect);
  }
  else
    done(null, null);
};