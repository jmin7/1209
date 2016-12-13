var mongoose = require('mongoose');
var blog = require('./models/Blog');
// var Comment = require('./models/Comment');

var blogData = [
  { title: "Cloud's Rest",
    image: "http://www.w3schools.com/css/img_fjords.jpg",
    body: " blah blah blah"
  },
  { title: "Desert Mesa",
    image: "http://www.w3schools.com/css/img_fjords.jpg",
    body: " blah blah blah"
  },
  { title: "Cloud's Rest",
    image: "http://www.w3schools.com/css/img_fjords.jpg",
    body: " blah blah blah"
  },
]

function seedDB(){
  // remove all Blogs
blog.remove({}, function(err) {
  if(err) {}
  console.log('removed blogs');

// add a few blogs
blogData.forEach(function(seed) {
blog.create(seed, function(err, blogData) {
  if(err) {
    console.log(err)
  } else {
    console.log('added a blog');

    // // create a Comment
    // Comment.create(
    //   {
    //     text: "This place is great",
    //     author: "Homer"
    //   }, function(err, comment) {
    //     if(err) {
    //       console.log(err);
    //     } else {
    //     blogData.comments.push(comment);
    //     blogData.save();
    //     console.log('created new comment');
    //     }
    //  });
      }
    });
  });
});
}

    // create a Comment
    // Comment.create(
    //   {
    //     text: "This place is great",
    //     author: "Homer"
    //   }, function(err, comment) {
    //     if(err) {
    //       console.log(err);
    //     } else {
    //     blog.comments.push(comment);
    //     blog.save();
    //     console.log('created new comment');
    //   }
    // });
//   }
// });
//});




module.exports = seedDB;
