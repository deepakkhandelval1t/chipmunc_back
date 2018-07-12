var mongoData = require('./mongoLogService');

exports.createInfoLog = function(req, res){
    var reqIp = '';
    if(req)
        reqIp =  req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var copyBody = JSON.parse(JSON.stringify(req.body));
    if(copyBody.password){copyBody.password = ""};
    reqObject = {
        createdDate: new Date(),
        reqUrl: req.originalUrl,
        ip: reqIp,
        reqMethod: req.method,
        reqBody: copyBody,
        res:{
            statusCode: res.statusCode,
            body: res.body
        }
    }
    mongoData.insertInfoLog(reqObject);
}
exports.createErrorLog = function(req, res, err){
    var reqIp = '';
    if(req)
        reqIp =  req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if(err) {
        if(req){
            mongoData.insertErrorLog(
            {
                date: new Date(),
                url: req.originalUrl,
                method:  req.method,
                userEmail: req.user ? req.user.email : '',
                error: err
            });
        }
        else{
            mongoData.insertErrorLog(
            {
                date: new Date(),
                error: err
            });
        }
    }
}