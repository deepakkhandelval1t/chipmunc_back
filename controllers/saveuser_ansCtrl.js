var express = require('express');
var app = express();
var router = express.Router();


router.post('/',function(req,res){
    req.models.user_answer.create([
      
     { user_id:req.body.user_id ,
       user_answercol:req.body.user_answercol ,
       ques_id:req.body.ques_id }
     ],

      function(err,answers){
       if(err){
         res.status(200).json(err)
       }
       else{
         res.status(200).json(answers)
       }      
        })
    });
 module.exports.ans = router;