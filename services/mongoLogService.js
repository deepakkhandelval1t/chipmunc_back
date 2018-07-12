var mongojs = require('mongojs');
var config = require('../configs/config').config();

exports.insertInfoLog = function(data){
    try {
        //var db = mongojs(config.mongodb.connection);
        //db.info_logs.insert(data);
    } catch (error) {
        //db.error.insert({"err_creatingLogs":error});
    }
    finally{
        //if(db) db.close();
    }
}

exports.insertErrorLog = function(data){
    try {
        //var db = mongojs(config.mongodb.connection);
       // db.err_logs.insert(data);
    } catch (error) {
        //db.error.insert({"err_creatingLogs":error});
    }
    finally{
       // if(db) db.close();
    }
}