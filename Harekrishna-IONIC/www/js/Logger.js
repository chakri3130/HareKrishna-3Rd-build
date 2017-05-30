/**
 * Created by nagendra on 1/17/17.
 */

var Logger = {};
var isDevelopmentEnv = true;

Logger.debug = function (msg) {
  if(isDevelopmentEnv)
    console.log(msg);
};

Logger.alert = function (msg) {
  if(isDevelopmentEnv)
    alert(msg);
};
