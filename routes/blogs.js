var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var Blog  = require("../models/Blog");

// var User = require("../models/User");


function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}


// Index
router.get('/', function(req, res, next){
  // get all the blogs and render the incex view
 Blog.find({})
 .then(function(blogs) {
  res.render('blogs/index', { blogs: blogs });
}, function(err) {
  return next(err);
 });
});

// New
router.get('/new', function(req, res, next){
 res.render('blogs/new');
});

// show
router.get('/:id', function(req, res, next){
 Blog.findById(req.params.id)
 .then(function(blog){
  // if(!blog) return next(makeError(res, 'Document not found', 404));
  res.render('blogs/show', { blog: blog});
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
 Blog.create(blog)
 .then(function(blog) {
   res.redirect('/blogs', {page:req.query.page}); //
}, function(err) {
  return next(err)
 });
});

// edit
router.get('/:id/edit', function(req, res, next){
 Blog.findById(req.params.id)
 .then(function(blog) {
   if(!blog) return next(makeError(res, 'Document not found', 404));
   res.render('blogs/edit', { blog: blog });
 }, function(err) {
   return next(err);
  });
});

// update
router.put('/:id', function(req, res, next) {
  console.log('update got id:', req.params.id);
  Blog.findById(req.params.id)
  .then(function(blog) {
    if (!blog) return next(makeError(res, 'Document not found', 404));
    blog.title = req.body.title;
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
 Blog.findByIdAndRemove(req.params.id)
 .then(function(){
  res.redirect('/blogs');
}, function(err) {
  return next(err);
 });
});

// comments/create
router.post('/:id/comments', function(req,res){
  var newComment = req.body.comment;
  newComment.author = req.user._id;
  Post.update({_id:req.params.id},{$push:{comments:newComment}},function(err,post){
    if(err) return res.json({success:false, message:err});
    res.redirect('/posts/'+req.params.id+"?"+req._parsedUrl.query);
  });
});

// comments/destroy
router.delete('/:postId/comments/:commentId', function(req,res){
  Post.update({_id:req.params.postId},{$pull:{comments:{_id:req.params.commentId}}},
    function(err,post){
      if(err) return res.json({success:false, message:err});
      res.redirect('/posts/'+req.params.postId+"?"+req._parsedUrl.query.replace(/_method=(.*?)(&|$)/ig,""));
  });
});

module.exports = router;
