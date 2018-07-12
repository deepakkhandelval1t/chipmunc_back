var express = require('express');
var app = express();
var router = express.Router();
var userService = require("../services/userService");
var commonService = require("../services/common.service");

router.post('/insert', function (req, res) {
    userService.saveCourse(req,(err,items)=>{
        commonService.createResponse(req, res, err, items);   
    });
  });
  
router.get('/getcourse', function (req, res) {
      userService.getCourse(req,(err,items)=>{
         commonService.createResponse(req, res, err, items);
      });
  });
  module.exports.course = router;
  