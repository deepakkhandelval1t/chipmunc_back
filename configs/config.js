var devConfig = require('./config.dev');
var prodConfig = require('./config.prod');
var localConfig = require('./config.local');
var config = {
  dev: devConfig,
  prod: prodConfig,
  local: localConfig
}
module.exports = {
    config: function () { return config[process.env.NODE_ENV] || config.local; }
}
