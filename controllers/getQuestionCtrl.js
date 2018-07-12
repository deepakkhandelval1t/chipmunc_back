var express = require('express');
var app = express();
var router = express.Router();
var userService = require("../services/userService");


router.get('/', function (req, res) {
    userService.getQuestion((err, question)=>{
       if(err){
         res.status(200).json(err)
       }
       else{
         res.status(200).json(question)
       }    
     })    
   });
 module.exports.ques = router;