var express = require('express');
var router  = express.Router();
var passport = require('passport');

// GET homepage, index
router.get('/', function(req, res, next) {
  res.render('home/index.ejs'); // render looks under views folder
});
router.get('/about', function(req, res) {
  res.render('home/about.ejs');
});

// GET / signup
router.get('/signup', function (req, res, next) {
  res.render('signup.ejs', { message: req.flash() });
});

// POST / signup
router.post('/signup', function (req, res, next) {
  console.log('signup page working??');
  var signUpStrategy = passport.authenticate('local-signup', {
    successRedirect : '/posts',
    failureRedirect : '/signup',
    failureFlash : true  // send failure message
  });

  return signUpStrategy(req, res, next);
});

// GET / login
router.get('/login', function(req, res, next) {
  res.render('login.ejs', { message: req.flash() });
});

// POST / login
router.post('/login', function(req, res, next) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect : '/posts',
    failureRedirect : '/login',
    failureFlash    : true
  });

  return loginProperty(req, res, next);
})

// GET logout
router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});



module.exports = router;




// function makeError(res, message, status) {
//   res.statusCode = status;
//   var error = new Error(message);
//   error.status = status;
//   return error;
// }

// ======= start
// index - 1
// router.route('/').get(function(req, res, next) {
//   User.find({}).sort( { username: 1 })
//   .then(function(users) {
//     res.render('users/index', { users: users })
//   }, function(err) {
//     return next (err);
//   });
// });

// index - 2
// router.route('/').get(function(req, res) {
//   User.find({})
//   .sort( {username : 1} )
//   .exec(function(err, users){
//     if(err) return res.json(err);
//     res.render('users/index', { users: users });
//   });
// });


// new
// router.get('/new', function(req, res) {
//   res.render('users/new', { user: {} });
// });

// show - 1
// router.get('/:username', function(req, res, next) {
//   User.findByUsername(req.params.username)
//   .then(function(user) {
//     if(!User) return next(makeError(res, 'User not found'));
// }, function(err) {
//   return next(err);
//   });
// });

// show - 2
// router.get('/:username', function(req, res) {
//   User.findOne( {username: req.params.username}, function(err, user) {
//     if(err) return res.json(err);
//     res.render('users/show', { user: user} );
//   });
// });


// create
// router.post('/', function(req, res) {
//   User.create(req.body, function(err, user) {
//     if(err) return res.json(err);
//     res.redirect('/users');
//   });
// });

// edit -1
// router.get('/:username/edit', function(req, res, next) {
//   User.findByUsername(req.params.username)
//   if (!User) return next(makeError(res, 'User not found', 404));
//   res.render('users/edit', { user: user });
//   }, function(err) {
//   return next(err);
//   });
// });

// edit -2
// router.get('/:username/edit', function(req, res) {
//   User.findOne( {username: req.params.username}, function (err, user) {
//     if(err) return res.json(err);
//     res.render('users/edit', {user: user });
//   });
// });

// update
// router.put("/:username",function(req, res, next){
//  User.findOne({username:req.params.username})
//  .select("password")
//  .exec(function(err, user){
//   if(err) return res.json(err);
//


  // update user object
// user.originalPassword = user.password;
// user.password = req.body.newPassword?
//     req.body.newPassword : user.password;
// for(var p in req.body){
//  user[p] = req.body[p];
// }

// save updated user
// user.save(function(err, user){
//  if(err) return res.json(err);
//  res.redirect('/users/'+req.params.username);
//     });
//   });
// });
// ===========  end
