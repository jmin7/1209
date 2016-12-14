var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../../models/User');

var strategy = new LocalStrategy({
    usernameField : 'username',
    // emailField : 'email',
    passwordField : 'password',
    // passwordConfirmationField : 'passwordConfirmation',
    passReqToCallback : true
  },
  function(req, username, password, callback) {
    // Find a user with this username
    User.findOne({ 'local.username' :  username }, function(err, user) {
      if (err) return callback(err);
      if (user) {
        // A user with this username already exists
        return callback(null, false, req.flash('error', 'This username is already taken.'));
      }
          else {
        // Create a new user
        var newUser            = new User();
        newUser.local.username = username;
        // newUser.local.email    = req.body.email;
        newUser.local.password = newUser.encrypt(password);

        newUser.save(function(err) {
          return callback(err, newUser);
        });
      }
    });
  });

module.exports = strategy;
