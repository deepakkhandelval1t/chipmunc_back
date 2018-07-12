var express = require('express');
var app = express();
var router = express.Router();
var userService = require("../services/userService");
var commonService = require("../services/common.service");

router.post('/insert', function (req, res) {
    userService.saveUserCertificates(req,(err,items)=>{
        commonService.createResponse(req, res, err, items);   
    });
  });
  
router.get('/getusercertificates', function (req, res) {
      userService.getUserCertificates(req,(err,items)=>{
         commonService.createResponse(req, res, err, items);
      });
  });
  module.exports.certifications = router;
  