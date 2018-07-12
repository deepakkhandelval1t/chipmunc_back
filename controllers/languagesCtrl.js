var express = require('express');
var app = express();
var router = express.Router();
var userService = require("../services/userService");
var commonService = require("../services/common.service");

router.post('/insert', function (req, res) {
    userService.saveLanguages(req,(err,items)=>{
        commonService.createResponse(req, res, err, items);   
    });
  });
  
router.get('/getlanguages', function (req, res) {
      userService.getLanguages(req,(err,items)=>{
         commonService.createResponse(req, res, err, items);
      });
  });
  module.exports.languages = router;
  