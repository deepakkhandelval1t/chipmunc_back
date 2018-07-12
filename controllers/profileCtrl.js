var express = require('express');
var app = express();
var router = express.Router();
var userService = require("../services/userService");
var commonService = require("../services/common.service");

router.post('/insert', function (req, res) {
    userService.saveUserProfile(req,(err,items)=>{
        commonService.createResponse(req, res, err, items);   
    });
  });
  
router.get('/getUserData', function (req, res) {
      userService.getUserProfile(req,(err,items)=>{
         commonService.createResponse(req, res, err, items);
      });
  });
  module.exports.profile = router;
  