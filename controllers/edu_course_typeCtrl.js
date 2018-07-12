var express = require('express');
var app = express();
var router = express.Router();
var userService = require("../services/userService");
var commonService = require("../services/common.service");

router.post('/insert', function (req, res) {
    userService.saveCourseType(req,(err,items)=>{
        commonService.createResponse(req, res, err, items);   
    });
  });
  
router.get('/getcoursetype', function (req, res) {
      userService.getCourseType(req,(err,items)=>{
         commonService.createResponse(req, res, err, items);
      });
  });
  module.exports.coursetype = router;
  