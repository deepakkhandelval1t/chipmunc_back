var express = require('express');
var app = express();
var router = express.Router();
var userService = require("../services/userService");
var commonService = require("../services/common.service");

router.post('/insert', function (req, res) {
    userService.saveSpecialization(req,(err,items)=>{
        commonService.createResponse(req, res, err, items);   
    });
  });
  
router.get('/getspecialization', function (req, res) {
      userService.getSpecialization(req,(err,items)=>{
         commonService.createResponse(req, res, err, items);
      });
  });
  module.exports.specialization = router;
  