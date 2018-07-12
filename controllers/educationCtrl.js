var express = require('express');
var app = express();
var router = express.Router();
var userService = require("../services/userService");
var commonService = require("../services/common.service");

router.post('/insert', function (req, res) {
    userService.saveUserEducation(req,(err,items)=>{
        commonService.createResponse(req, res, err, items);           
    });
  });
  
router.get('/getusereducation', function (req, res) {
      userService.getUserEducation(req,(err,items)=>{
         commonService.createResponse(req, res, err, items);
      });
  });
  module.exports.educations = router;
  