var request = require('request');

exports.sendOtp = function(user, next){
    var message = 'Please+use+'+user.phone_otp+'+as+one+time+password+%28OTP%29+to+proceed+on+your+All+Koin+account.';
    request({ url : "http://www.proactivesms.in/sendsms.jsp?user=prodemo&password=060c39c2a3XX&mobiles="+user.phone+"&sms="+message+"&senderid=abcdef" }, 
        function (error, response, body) {
            if(error)
                next(error, null);
            else
                next(null, response);
        }
    );   
}