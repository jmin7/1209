var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Post = require('./Post');
// var User     = mongoose.model('user', userSchema);

// schema

var UserSchema = new mongoose.Schema({
  local : {
    username : String,
    password : String
  }
});

// To add email and password confirmation 
// var UserSchema = new mongoose.Schema({
//   local : {
//     username : { type    : String,
//                 required : true },
//     email  : { type    : String,
//                 required : true },
//     password : { type  : String,
//                 required : true },
//     passwordConfirmation : { type : String,
//                 required : true }
//       },
//});

// encrypting password
UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
  // compare passsword and this.local.password. If same = true
};


// export
module.exports = mongoose.model('user', UserSchema);
