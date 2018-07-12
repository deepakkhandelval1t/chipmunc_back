var localAuthSetup = require("./passport-local").setup;
var googleAuthSetup = require("./passport-google").setup;
var linkedinAuthSetup = require("./passport-linkedin").setup;
var facebookAuthSetup = require("./passport-facebook").setup;

exports.setup = function () {
  localAuthSetup();
  googleAuthSetup();
  linkedinAuthSetup();
  facebookAuthSetup();
};