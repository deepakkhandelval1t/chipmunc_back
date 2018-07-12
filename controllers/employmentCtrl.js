var express = require('express');
var app = express();
var router = express.Router();
var userService = require("../services/userService");
var commonService = require("../services/common.service");

router.post('/insert', function (req, res) {
    userService.saveProfessional(req,(err,items)=>{
        commonService.createResponse(req, res, err, items);   
    });
  });
  
router.get('/getdetails', function (req, res) {
      userService.getProfessional(req,(err,items)=>{
         commonService.createResponse(req, res, err, items);
      });
  });
  module.exports.employment = router;
  