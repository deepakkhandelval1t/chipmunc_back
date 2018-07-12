var jwt = require("../services/login/jwt/jwtService").jwtProfile;
var logger = require('./logger');
exports.randomInt = (low, high) => {
    return Math.floor(Math.random() * (high - low) + low);
};

//@Internal Method
//Use to create response body and send response
exports.createResponse = (req, res, err, data) => {
    if (err && (err.user_msg || err.log_err)) {
        res.status(200).json({error: true, data: err});
        logger.createErrorLog(req, res, err.log_err);
    } else if(data) {
        res.status(200).json({success: true, data: data});
    } else {
        res.status(200).json({error: true, data: 'Unknown Error'});
        logger.createErrorLog(req, res, err);
    }
}
//@Internal Method
//Use to create response body and send response
exports.createJwtResponse = (req, res, err, data) => {
    if (err && err.user_msg && err.log_err) {
        res.status(200).json({error: true, data: err.user_msg});
        
        logger.createErrorLog(req, res, err.log_err);
    } else if(data){
        data.token = jwt.generateToken(data);
        res.status(200).json({success: true, data: data});
    } else {
        res.status(200).json({error: true, data: 'Unknown Error'});
        logger.createErrorLog(req, res, err);
    }
}