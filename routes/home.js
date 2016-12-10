var express = require('express');
var router  = express.Router();

// home
router.get('/', function(req, res) {
  res.render('home/welcome'); // render looks under views folder
});
router.get('/about', function(req, res) {
  res.render('home/about');
});

module.exports = router;
