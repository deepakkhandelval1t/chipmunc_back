var nodemailer = require('nodemailer');
var config = require('../configs/config').config();
var commonService = require('../services/common.service');
const crypto = require("crypto");
var mysql = require('mysql');
exports.getregistrationEmailbody = function(content) {
  var fullName = content.fullName();
  return '<h2>Welcome to All Koin!</h2><p> Dear '+fullName+',</p><p>Thanks for signing up! Please use code '+content.confirmation_token+' to complete your registration process.</p>'+ 
  '<p>You can also use this <a href="'+ config.website +'/PreRegister/ConfirmEmail?code='+ content.confirmation_token +'&email='+ content.email+'">link</a> to complete registration.</p>'+
  '<hr/><p>If above link does not work, please copy and paste the URL below in a new browser window to complete registration</p>' +
  '<p>'+config.website +'/PreRegister/ConfirmEmail?code='+ content.confirmation_token +'&email='+ content.email+'</p>';
}

exports.getresetPassbody = function(content) {
  var fullName = content.fullName();
  return "<h2>Reset your account password</h2><p>Dear "+fullName+",</p>"+
  "<p>We received a request to reset your password. If you did not make the request, just ignore the mail. Otherwise, you can reset your password using this link:</p>"+
  "<p><a href='"+ config.website +"/ForgotPassword?code="+ content.reset_pass_token +"'>"+ config.website +"/ForgotPassword?code="+ content.reset_pass_token +"</a></p>";
}

exports.getRegistartionDoneBody = function(content) {
  return  '<h2>Registered for Pre-sale!</h2><p>Dear '+content.fullName()+',</p><p>You have been successfully registered for the pre-sale. Login to your account to complete the further procedures in order to send in your investments.</p>'+
  '<h4>Karma!!</h4><p>You can earn Karma by referring your friends. When they join the BullToken Community, Karma will be added to your account. To refer your friends and family please share the URL below and ask them to use while registering.</p><p><a href="'+config.website +'/PreRegister/Register?refCode='+ content.sharing_code+'">'+config.website +'/PreRegister/Register?refCode='+ content.sharing_code+'</a>.'+
  '<p style="font-size: 12px;line-height: 18px;">Feel free to download and use the BullToken web graphics found on the "Spread the word" section on your profile page.</p><p style="font-size: 12px;line-height: 0px;"><a href="https://bulltoken.tech/Profile">https://bulltoken.tech/Profile</a></p>'
}

exports.getServerExceptionBody = function(exception){
  return  '<h4>An error occured in the api</h4><br/>' + exception;
}

exports.createEmailBody = function (body) {
  var htmlbody = '<html><head><meta name="viewport" content="width=device-width"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Bulltoken</title><style>a{text-decoration:none;color:#000;transition:all 0.4s}p{line-height:25px;letter-spacing:1px}body{color:#273f5b}@media only screen and (max-width:620px){table[class=body] h1{font-size:28px!important;margin-bottom:10px!important}table[class=body] a, table[class=body] ol, table[class=body] p, table[class=body] span, table[class=body] td, table[class=body] ul{font-size:16px!important}table[class=body] .article, table[class=body] .wrapper{padding:10px!important}table[class=body] .content{padding:0!important}table[class=body] .container{padding:0!important;width:100%!important}table[class=body] .main{border-left-width:0!important;border-radius:0!important;border-right-width:0!important}table[class=body] .btn a, table[class=body] .btn table{width:100%!important}table[class=body] .img-responsive{height:auto!important;max-width:100%!important;width:auto!important}}@media all{.ExternalClass{width:100%}.ExternalClass, .ExternalClass div, .ExternalClass font, .ExternalClass p, .ExternalClass span, .ExternalClass td{line-height:100%}.apple-link a{color:inherit!important;font-family:inherit!important;font-size:inherit!important;font-weight:inherit!important;line-height:inherit!important;text-decoration:none!important}}</style></head><style>@media only screen and (max-width:620px){table[class=body] h1{font-size:28px!important;margin-bottom:10px!important}table[class=body] a, table[class=body] ol, table[class=body] p, table[class=body] span, table[class=body] td, table[class=body] ul{font-size:16px!important}table[class=body] .article, table[class=body] .wrapper{padding:10px!important}table[class=body] .content{padding:0!important}table[class=body] .container{padding:0!important;width:100%!important}table[class=body] .main{border-left-width:0!important;border-radius:0!important;border-right-width:0!important}table[class=body] .btn a, table[class=body] .btn table{width:100%!important}table[class=body] .img-responsive{height:auto!important;max-width:100%!important;width:auto!important}}@media all{.ExternalClass{width:100%}.ExternalClass, .ExternalClass div, .ExternalClass font, .ExternalClass p, .ExternalClass span, .ExternalClass td{line-height:100%}.apple-link a{color:inherit!important;font-family:inherit!important;font-size:inherit!important;font-weight:inherit!important;line-height:inherit!important;text-decoration:none!important}}</style>' +
    '</head><body style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"><table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;"><tr><td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td><td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;"><div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;"><table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px 3px 0 0;"><tr><td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box;"><table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; border-bottom:1px solid rgba(0,0,0,0.05);padding: 20px 0 10px 0;"><tr><td><div class="logo" style="margin-bottom: 10px; text-align: center;"> <a target="_blank" href="https://bulltoken.tech/"> <img src="https://s1.postimg.org/122ffng2fj/logo_bulls.png" alt="logo - BullToken" width="220"> </a></div></td></tr></table></td></tr><tr><td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">' +
    '<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"><tr><td style="font-family: sans-serif; font-size: 14px; vertical-align: top;"><table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;"><tbody><tr><td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">' +
    body + '</td></tr></tbody></table><p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 5px;"> Best regards,</p><p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">BullToken Team</p></td></tr></table></td></tr></table><div class="footer" style="clear: both; border-radius: 0 0 3px 3px; text-align: center; width: 100%;"><table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;background: #dbe3ec;padding: 20px; border-radius: 0 0 3px 3px;"><tr><td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-top: 10px; font-size: 12px; color: #273f5b; text-align: center;"><p style="line-height: 18px;">Please do not reply to this email as it is a computer generated email and reply to this email id is not monitored. Services referred to herein are subject to the terms and conditions governing them as specified by BullToken from time to time at <a target="_blank" href="https://bulltoken.tech">https://bulltoken.tech</a>.</p><p style="margin-top: -15px;line-height: 30px;">For any query reach us at <a target="_blank" href="mailto:support@bulltoken.tech">support@bulltoken.tech</a></p></td></tr><tr><td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px;font-size: 12px; color: #273f5b; text-align: center;"><p>Copyright © 2017 <a href="https://bulltoken.tech/" style=" font-size: 12px; text-align: center; text-decoration: none;">BullToken</a>, All rights reserved.</p></td></tr></table></div></td><td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td></tr></table></body></html>';
  return htmlbody;
};

exports.sendEmail = function (emailData, toEmail, subject, next) {
  if (config.emailConfig.user && config.emailConfig.pass) {
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      // tls: {
      //   ciphers: "TLSv1.2"
      // },
      auth: {
        user: config.emailConfig.user,
        pass: config.emailConfig.pass
      }
    });

    var mailOptions = {
      from: config.emailConfig.fromDisplayname,
      to: config.emailConfig.test ? config.emailConfig.testRecepient : toEmail ,
      subject: subject,
      html: emailData
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        next(error, null);
      } else {
        next(null, 'Email sent');
      }
    });
  } else {
    next(null, 'UserName & Password not Available');
  }
};

exports.resendEmailConfirm = function (req, next) {
  reqEmail = req.params.email;
  req.models.users.find({email: reqEmail}, function (err, people) {
    if (people && people.length > 0) {
      if(!people[0].is_confirmed){
        var tokenToConfirm = commonService.randomInt(100000, 999999);
        people[0].save({is_confirmed: false, confirmation_token: tokenToConfirm}, function (err, people) {
          if (!err) {
            body = emailBody.getregistrationEmailbody(people);
            emailData = module.exports.createEmailBody(body);
            module.exports.sendEmail(emailData, reqEmail, "Account confirmation", function (err, data) {
              err ? next(err, null) : next(null, {success: true, data:{message:'email sent'}})
            });
          } else {
            next(err, null);
          }
        });
      }
      else next(null, {success: false, data:{message:'email already verified'}})
    } else {
      next(null, {success: false, data:{message:'email not exist'}})
    }
  });
};

exports.sendAccountVerificationEmail = function(userData, next){
  this.sendEmail(this.createEmailBody(this.getregistrationEmailbody(userData)), 
    userData.email, "All Koin - Account Verification", function(err, data){
      if(err)
        next(err, null);
      else
        next(null, data);
    });
}
exports.emailConfirm = function (req, res, next) {
  varifytoken = req.body.token;
  req.models.users.find({ verificationtoken: varifytoken }, function (err, people) {
    if (people.length > 0) {
      people[0].confirm = true;
      people[0].save(function (err) {
        if (err) {
        }
        else {
          next(null, { success: true, data: { message: 'token  found', name: "" } });
        }
      });
    }
    else {
      next(err, null);
    }
  });
}
