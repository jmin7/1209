var express = require("express");
var router = express.Router();
var Post  = require("../models/Post");


function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

// Index
router.get('/', function(req, res, next){
  // get all the posts and render the incex view
 Post.find({}).sort({ updatedAt: -1})
 .then(function(posts) {
  res.render('posts/index', { posts: posts });
}, function(err) {
  return next(err);
 });
});

// New
router.get('/new', function(req, res, next){
 res.render('posts/new');
});

// show
router.get('/:id', function(req, res, next){
 Post.findById(req.params.id)
 .then(function(post){
  // if(!post) return next(makeError(res, 'Document not found', 404));
  res.render('posts/show', { post: post });
}, function(err) {
  return next(err);
 });
});

// create
router.post('/', function(req, res, next) {
  console.log('req.body:', req.body);
  let post = {
    title: req.body.title,
    body: req.body.body
  };
 Post.create(post)
 .then(function(post) {
   res.redirect('/posts');
}, function(err) {
  return next(err)
 });
});

// edit
router.get('/:id/edit', function(req, res, next){
 Post.findById(req.params.id)
 .then(function(post) {
   if(!post) return next(makeError(res, 'Document not found', 404));
   res.render('posts/edit', { post: post });
 }, function(err) {
   return next(err);
  });
});

// update
router.put('/:id', function(req, res, next) {
  console.log('update got id:', req.params.id);
  Post.findById(req.params.id)
  .then(function(post) {
    if (!post) return next(makeError(res, 'Document not found', 404));
    post.title = req.body.title;
    post.body  = req.body.body;
    return post.save();
  })
  .then(function(saved) {
    console.log('updated post:', saved);
    res.redirect('/posts/'+req.params.id);
  }, function(err) {
    return next(err);
  });
});

// destroy
router.delete('/:id', function(req, res, next) {
 Post.findByIdAndRemove(req.params.id)
 .then(function(){
  res.redirect('/posts');
}, function(err) {
  return next(err);
 });
});

module.exports = router;
