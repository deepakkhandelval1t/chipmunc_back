// BASE SE5TUP
// =============================================================================
// call the packages we need
var http = require("http");
var express = require('express');    
var app = express();               
var bodyParser = require('body-parser');
var config = require('./configs/config').config(); // get our config file
var passport = require("passport");
var orm = require('orm');
var logger = require("./services/logger");
var express_validator=require('express-validator');
const validatorOption={};
var port = process.env.PORT || 8080;
var io = require('socket.io')(server);


// Add headers
app.use(function (req, res, next) {
    if(config.allowedOrigins.indexOf(req.headers.origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    }
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Load models
app.use(orm.express(config.database.mySqlConnection, {
    define: (db, models, next) => {
      db.load("./models/models", (err) => {
          if (err) {
              console.log(err)
          } else {
            models.users = db.models.users;
            models.options = db.models.options;
            models.ques_answer = db.models.ques_answer;
            models.questions = db.models.questions;
            models.user_answer = db.models.user_answer;
            models.score = db.models.score;
            models.user_details = db.models.user_details;
            models.sociallogin = db.models.sociallogin;
            models.user_certifications = db.models.user_certifications;
            models.user_educations = db.models.user_educations;
            models.user_employments = db.models.user_employments;
            models.user_languages = db.models.user_languages;
            models.user_logins = db.models.user_logins;
            models.user_prof_skills = db.models.user_prof_skills;
            models.edu_course_types = db.models.edu_course_types;
            models.edu_courses = db.models.edu_courses;
            models.edu_specializations = db.models.edu_specializations;
            models.user_languages = db.models.user_languages;

            global.globalQuestions = models.questions;
            global.globalOptions = models.options;

            models.user_educations.hasOne('edu_course_type', models.edu_course_types, 
              {autoFetch : true, autoFetchLimit: 3}
            )
            models.user_educations.hasOne('edu_course', models.edu_courses, 
                  {autoFetch : true, autoFetchLimit: 3}
                )
            models.user_educations.hasOne('edu_specialization', models.edu_specializations, 
                  {autoFetch : true, autoFetchLimit: 3}
                )

            models.user_details.hasOne('user', models.users , {
            reverse: 'user_details',
            autoFetch : true,
            autoFetchLimit: 3
          })
            models.user_educations.hasOne('user', models.users, {
            reverse: 'user_educations',
            autoFetch : true,
            autoFetchLimit: 3
          })
          models.user_certifications.hasOne('user', models.users, {
            reverse: 'user_certifications',
            autoFetch : true
          })
        models.user_prof_skills.hasOne('user', models.users, {
            reverse: 'user_prof_skills',
            autoFetch : true
          })
          models.user_logins.hasOne('user', models.users, {
            reverse: 'user_logins',
            autoFetch : true
          })
     models.user_languages.hasOne('user', models.users, {
            reverse: 'user_languages',
            autoFetch : true
          })
 models.user_employments.hasOne('user', models.users, {
            reverse: 'user_employments',
            autoFetch : true
          })
 models.user_details.hasOne('user', models.sociallogin, {
            reverse: 'sociallogin',
            autoFetch : true
          })
    
       }
      });
      next();
    }
}));


// Load Passport
app.use(passport.initialize());
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express_validator(validatorOption));

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

// REGISTER OUR ROUTES -------------------------------
require('./routes')(app);

//setup passport authentication
require("./services/login/passport/setup").setup();

// START THE SERVER
var server = http.createServer(app).listen(port);
server.timeout = 10 * 60 * 1000;
console.log("server has been started at " + port);

process.on('uncaughtException', function (err) {
  console.log("Something went wrong: ", err);
});

io.sockets.on('connection', function (socket) {
  console.log('a user connected');
  setInterval(() => {
    userService.getQuestion((err, question) => {
      if(err) {
      } else {
        socket.emit('question',question);
      }
    });
  }, 30000);
});

