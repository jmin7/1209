var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var Photo  = require("../models/Photo");

// var User = require("../models/User");


function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}


// Index
router.get('/', function(req, res, next){
  // get all the Photos and render the incex view
 Photo.find({}).sort({ updatedAt: -1})
 .then(function(blogs) {
  res.render('photos/index', { blogs: blogs });
}, function(err) {
  return next(err);
 });
});

// New
router.get('/new', function(req, res, next){
 res.render('photos/new');
});

// show
router.get('/:id', function(req, res, next){
 Photo.findById(req.params.id)
 .then(function(blog){
  // if(!blog) return next(makeError(res, 'Document not found', 404));
  res.render('photos/show', { blog: blog});
});

});

// create
router.post('/', function(req, res, next) {
  console.log('req.body:', req.body);
  let blog = {
    title: req.body.title,
    body: req.body.body,
    image: req.body.image
  };
 Photo.create(blog)
 .then(function(blog) {
   res.redirect('/blogs'); //
}, function(err) {
  return next(err)
 });
});

// edit
router.get('/:id/edit', function(req, res, next){
 Photo.findById(req.params.id)
 .then(function(blog) {
   if(!blog) return next(makeError(res, 'Document not found', 404));
   res.render('photos/edit', { blog: blog });
 }, function(err) {
   return next(err);
  });
});

// update
router.put('/:id', function(req, res, next) {
  console.log('update got id:', req.params.id);
  Photo.findById(req.params.id)
  .then(function(blog) {
    if (!blog) return next(makeError(res, 'Document not found', 404));
    blog.title = req.body.title;
    blog.image = req.body.image;
    blog.body  = req.body.body;
    return blog.save();
  })
  .then(function(saved) {
    console.log('updated blog:', saved);
    res.redirect('/blogs/'+req.params.id);
  }, function(err) {
    return next(err);
  });
});

// destroy
router.delete('/:id', function(req, res, next) {
 Photo.findByIdAndRemove(req.params.id)
 .then(function(){
  res.redirect('/blogs');
}, function(err) {
  return next(err);
 });
});


module.exports = router;
