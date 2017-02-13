var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Post = require('./Post');

// schema

var UserSchema = new mongoose.Schema({
  local : {
    username : String,
    password : String
  }
});

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
