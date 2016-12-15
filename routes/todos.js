var express = require('express');
var router = express.Router();

var Todo = require('../models/Todo');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

// 로그인 안됐으면 아무것도 못하게 하기 / 허가주기
function authenticate(req, res, next) {
  if(!req.isAuthenticated()) {
    req.flash('error', 'Please signup or login.');
    res.redirect('/');
  }
  else {
    next();
  }
}

// INDEX
router.get('/', function(req, res, next) {
  // get all the todos and render the index view
  Todo.find({}).sort('-createdAt')  // 만들어진 시간의 역순으로 sort
    .then(function(todos) {
      res.render('todos/index', { todos: todos } );
    }, function(err) {
      return next(err);
    });

  var todos = global.currentUser.todos;
 res.render('todos/index', { todos: todos, message: req.flash() });
});  // Displaying only the currentUser's TODOs


// NEW
router.get('/new', authenticate, function(req, res, next) {
  var todo = {
    title: '',
    completed: false  // true 하면 체크박스에 체크된 상태로 시작
  };
  res.render('todos/new', { todo: todo } );
});


// SHOW
router.get('/:id', authenticate, function(req, res, next) {
  var todo = currentUser.todos.id(req.params.id);
  if (!todo) return next(makeError(res, 'Document not found', 404));
  res.render('todos/show', { todo: todo, message: req.flash() } );
});  //Securing the TODOs SHOW Route

//   Todo.findById(req.params.id)
//   .then(function(todo) {
//     if (!todo) return next(makeError(res, 'Document not found', 404));
//     res.render('todos/show', { todo: todo });
//   }, function(err) {
//     return next(err);
//   });
// });


// CREATE
router.post('/', authenticate, function(req, res, next) {
  var todo = new Todo({
    title:     req.body.title,
    completed: req.body.completed ? true : false
  });
  // Since a user's todos are an embedded document, we just need to push a new
 // TODO to the user's list of todos and save the user.
  currentUser.todos.push(todo);
  currentUser.save()
 .then(function() {
   res.redirect('/todos');
  }, function(err) {
    return next(err);  //Securing the TODOs CREATE Route
    });
  });
//   todo.save()
//   .then(function(saved) {
//     res.redirect('/todos');
//   }, function(err) {
//     return next(err);
//   });
// });


// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
  var todo = currentUser.todos.id(req.params.id);
  if (!todo) return next(makeError(res, 'Document not found', 404));
  res.render('todos/edit', { todo: todo, message: req.flash() } );
});

// router.get('/:id/edit', authenticate, function(req, res, next) {
//   Todo.findById(req.params.id)
//   .then(function(todo) {
//     if (!todo) return next(makeError(res, 'Document not found', 404));
//     res.render('todos/edit', { todo: todo });
//   }, function(err) {
//     return next(err);
//   });
// });


// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  var todo = currentUser.todos.id(req.params.id);
  if (!todo) return next(makeError(res, 'Document not found', 404));
  else {
    todo.title = req.body.title;
    todo.completed = req.body.completed ? true : false;
    currentUser.save()
    .then(function(saved) {
      res.redirect('/todos');
    }, function(err) {
      return next(err);
    });
  }
});
// router.put('/:id', authenticate, function(req, res, next) {
//   Todo.findById(req.params.id)
//   .then(function(todo) {
//     if (!todo) return next(makeError(res, 'Document not found', 404));
//     todo.title = req.body.title;
//     todo.completed = req.body.completed ? true : false;
//     return todo.save();
//   })
//   .then(function(saved) {
//     res.redirect('/todos');
//   }, function(err) {
//     return next(err);
//   });
// });


// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
  var todo = currentUser.todos.id(req.params.id);
  if (!todo) return next(makeError(res, 'Document not found', 404));
  var index = currentUser.todos.indexOf(todo);
  currentUser.todos.splice(index, 1);
  currentUser.save()
  .then(function(saved) {
    res.redirect('/todos');
  }, function(err) {
    return next(err);
  });
});
// router.delete('/:id', authenticate, function(req, res, next) {
//   Todo.findByIdAndRemove(req.params.id)
//   .then(function() {
//     res.redirect('/todos');
//   }, function(err) {
//     return next(err);
//   });
// });


// TOGGLE completed
   router.get('/:id/toggle', authenticate, function(req, res, next) {
     var todo = currentUser.todos.id(req.params.id);
     if (!todo) return next(makeError(res, 'Document not found', 404));
     else {
       todo.completed = !todo.completed;
       currentUser.save()
       .then(function(saved) {
         res.redirect('/todos');
       }, function(err) {
         return next(err);
       });
     }
   });
//   Todo.findById(req.params.id)
//   .then(function(todo) {
//     if (!todo) return next(makeError(res, 'Document not found', 404));
//     todo.completed = !todo.completed;
//     return todo.save();
//   })
//   .then(function(saved) {
//     res.redirect('/todos');
//   }, function(err) {
//     return next(err);
//   });
// });

module.exports = router;
