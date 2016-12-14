var mongoose = require('mongoose');
var blog = require('./models/Blog');
var post = require('./models/Post');

var blogData = [
  { title: "Cute illustration",
    image: "../project_pics/car.jpg",
    body: " blah blah blah"
  },
  { title: "Time for Travel",
    image: "../project_pics/travelby.jpg",
    body: " blah blah blah"
  },
  { title: "Trolltunga Norway",
    image: "../project_pics/norway.jpg",
    body: " blah blah blah"
  },
]

var postData = [
  { title: "Announcement",
    body: "This site is for anyone who loves to travel"
  },
  { title: "Happy Holidays!",
    body: "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  }
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
      }
    });
  });
});

post.remove({}, function(err) {
  if(err) {}
  console.log('removed posts');

postData.forEach(function(seed) {
  post.create(seed, function(err, postData) {
    if(err) {
      console.log(err);
    } else {
      console.log('post added!');
    }
  });
});
});

}







module.exports = seedDB;
