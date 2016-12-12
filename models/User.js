var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// var Post = require('./Post');
// var User     = mongoose.model('user', userSchema);

// schema

// var UserSchema = new mongoose.Schema({
//   local : {
//     username : String,
//     password : String
//   }
// });

var UserSchema = new mongoose.Schema({
  local : {
    username : { type    : String,
                required : true },
    email  : { type    : String,
                required : true },
    password : { type  : String,
                required : true },
    passwordConfirmation : { type : String,
                required : true }
      },
  // toObject: { virtuals  : true }  // for those not to be saved in DB
});

// encrypting password
UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
  // compare passsword and this.local.password. If same = true
};

// virtuals
// UserSchema.virtual("passwordConfirmation")
// .get(function() { return this._passwordConfirmation; })
// .set(function(value){ this._passwordConfirmation = value; });
//
// UserSchema.virtual("originPassword")
// .get(function() { return this._originalPassword; })
// .set(function(value) { this._originalPassword = value; });
//
// UserSchema.virtual("currentPassword")
// .get(function() { return this._currentPassword; })
// .set(function(value) { this._currentPassword = value; });
//
// UserSchema.virtual("newPassword")
// .get(function() { return this._newPassword; })
// .set(function(value) { this._newPassword = value; });

// password validation
// userSchema.path("password").validate(function(v) {
//   var user = this;

// ========= MEAN
// create user
// if(user.isNew) {
//   if(!user.passwordConfirmation) {
//     user.invalidate(
//       "passwordConfirmation", "Password confirmation is required");
//   }
//   if(user.password !== user.passwordConfirmation) {
//     user.invalidate(
//       "passwordConfirmation", "password confirmation does not matched");
//   }
// }

// update user
// if(!user.isNew) {
//   if(!user.currentPassword) {
//     user.invalidate("currentPassword", "Current password is required");
//   }
//   if(user.currentPassword && user.currentPassword != user.originPassword) {
//     user.invalidate("currentPassword", "Current password is invalid!");
//   }
// }
// });
// ============ MEAN end




// export
module.exports = mongoose.model('user', UserSchema);
