var localSignupStrategy = require('./local-signup-strategy');
var localLoginStrategy  = require('./local-login-strategy');
var User = require('../../models/User');

var passportConfig = function(passport) {

  // Strategies
  passport.use('local-signup', localSignupStrategy); //set local signup to localSignupStrategy
  passport.use('local-login' , localLoginStrategy); // set local login to localLoginStrategy

  // Session Support
  passport.serializeUser(function(user, callback) {
    //user대신 user.id를 기입 = serialize
    callback(null, user.id);
    // null은 원래 err자리인데 이건 err날 리가 없으니까 null
  });

  passport.deserializeUser(function(id, callback) {
    // user.id대신 user를 기입 = deserialize
    User.findById(id, function(err, user) {
      callback(err, user);
      // error 가능성 있는 명령이기에 null 대신 err
    });
  });
};

module.exports = passportConfig;
