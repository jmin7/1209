var mongoose = require('mongoose');
var photo = require('./models/Photo');
var post = require('./models/Post');
var Todo = require('./models/todo');


var photoData = [
  { title: "Cute illustration",
    image: "../project_pics/car.jpg",
    body: " This car looks good "
  },
  { title: "Time for Travel",
    image: "../project_pics/travelby.jpg",
    body: " It is time to travel! "
  },
  { title: "Trolltunga Norway",
    image: "../project_pics/norway.jpg",
    body: " Norway looks nice "
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
  // remove all Photos
photo.remove({}, function(err) {
  if(err) {}
  console.log('photos removed');

// add photos
photoData.forEach(function(seed) {
photo.create(seed, function(err, photoData) {
  if(err) {
    console.log(err)
  } else {
    console.log('added photos');
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

//
// our script will not exit until we have disconnected from the db.
// function quit() {
//   mongoose.disconnect();
//   console.log('\nQuitting!');
// }
//
// console.log('removing old todos...');
// Todo.remove({})
// .then(function() {
//   console.log('old todos removed');
//   console.log('creating some new todos...');
//   var groceries  = new Todo({ title: 'groceries',    completed: false });
//   var feedTheCat = new Todo({ title: 'feed the cat', completed: true  });
//   return Todo.create([groceries, feedTheCat]);
// })
// .then(function(savedTodos) {
//   console.log('Just saved', savedTodos.length, 'todos.');
//   return Todo.find({});
// })
// .then(function(allTodos) {
//   console.log('Printing all todos:');
//   allTodos.forEach(function(todo) {
//     console.log(todo);
//   });
//   return Todo.findOne({title: 'groceries'});
// })
// .then(function(groceries) {
//   groceries.completed = true;
//   return groceries.save();
// })
// .then(function(groceries) {
//   console.log('updated groceries:', groceries);
//   return groceries.remove();
// })
// .then(function(deleted) {
//   return Todo.find({});
// })
// .then(function(allTodos) {
//   console.log('Printing all todos:');
//   allTodos.forEach(function(todo) {
//     console.log(todo);
//   });
//   quit();
// });


module.exports = seedDB;
