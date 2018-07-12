var express = require('express');
var passport = require("passport");
var router = express.Router();
var userService = require("../services/userService");
var passportLocal = require("../services/login/passport/passport-local");
var passportGoogle = require("../services/login/passport/passport-google");
var passportFacebook = require("../services/login/passport/passport-facebook");
const crypto = require("crypto");
var commonService = require("../services/common.service");
var emailservice = require("../services/emailService");
 // Username password login
router.post("/login", (req, res) => {
  passportLocal.authenticate(req, res, (err, data) => {
    commonService.createJwtResponse(req, res, err, data);
  });
});
// Google login
router.get('/login/google', passport.authenticate('google', {scope: ['profile', 'email']}), (req, res) => {
  });
router.get("/login/google/callback", (req, res) => {
  passportGoogle.authenticate(req, res, (err, data) => {
    commonService.createJwtResponse(req, res, err, data);
  });
});

// Linkedin login
router.get('/login/linkedin', passport.authenticate('linkedin'), (req, res) => {});
router.get("/login/linkedin/callback", (req, res) => {
  passportLinkedin.authenticate(req, res, (err, data) => {
    commonService.createJwtResponse(req, res, err, data);
  });
});

// Facebook login
router.get('/login/facebook', passport.authenticate('facebook', {scope: ['email']}), (req, res) => {});
router.get("/login/facebook/callback", (req, res) => {
  passportFacebook.authenticate(req, res, (err, data) => {
    commonService.createJwtResponse(req, res, err, data);
  });
});

// Register user
router.post("/register", (req, res) => {
  verifytoken = crypto.randomBytes(64).toString('hex');
  req.body.verificationtoken = verifytoken;
  userService.registerUser(req, (err, data) => {
    if(err)
    {
       commonService.createResponse(req, res, err, data);
    }
    else
    {
    link = " Please click on the link for verification of your email " +"          " + req.headers.origin + "/verify?token=" + verifytoken;
    emailservice.sendEmail(link, req.body.email, "You have succefully signed up", (err, data) => {
    commonService.createResponse(req, res, err, data);
    });
   }});
});

// Email verification
router.post("/verify", (req, res) => {
emailservice.emailConfirm( req , res , (err, data) => {
commonService.createJwtResponse(req, res, err, data);
  });
});
//All details
router.get("/information", (req, res) => {
userService.getData(req, (err, data) => {
commonService.createJwtResponse(req, res, err, data);
  });
});

module.exports.user = router;