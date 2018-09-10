var utils = require('./utils.js');
worker.onMessage(function(res){
  worker.postMessage({'msg':3000});
});