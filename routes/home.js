var express = require('express');
var router  = express.Router();
var passport = require('passport');

// for Error
function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

// GET homepage, index
router.get('/', function(req, res, next) {
  res.render('home/index.ejs'); // render looks under views folder
});
router.get('/about', function(req, res) {
  res.render('home/about.ejs');
});
router.get('/secret', function(req, res) {
  res.render('secret.ejs');
});

// GET / signup
router.get('/signup', function (req, res, next) {
  res.render('signup.ejs', { message: req.flash() });
});

// POST / signup
router.post('/signup', function (req, res, next) {
  console.log('signup page working??');
  var signUpStrategy = passport.authenticate('local-signup', {
    successRedirect : '/',
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
    successRedirect : '/',
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
