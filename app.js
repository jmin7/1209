var express          = require('express');
var mongoose         = require('mongoose');
var bodyParser       = require('body-parser');
var cookieParser     = require('cookie-parser');
var favicon          = require('serve-favicon');
var flash            = require('connect-flash');
var logger           = require('morgan');
var methodOverride   = require('method-override');
var passport         = require('passport');
var session          = require('express-session');

var app              = express();


// Routes
var homeRouter  = require('./routes/home');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var blogsRouter = require('./routes/blogs');
var seedDB      = require('./seeds');


// Connect to database -- heroku
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
}
else {
  mongoose.connect('mongodb://localhost/posts');
}
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
  }
);
mongoose.connection.once('open', function() {
  console.log("Mongoose has connected to MongoDB!");
});
// seedDB()

// Connect to database
// mongoose.connect('mongodb://localhost/posts');
// mongoose.connection.on('error', function(err) {
//   console.error('MongoDB connection error: ' + err);
//   process.exit(-1);
//   }
// );
// mongoose.connection.once('open', function() {
//   console.log("Mongoose has connected to MongoDB!");
// });
// seedDB()

// view engin settings
app.set('views', './views');
app.set('view engine', 'ejs');   // expect ejs for view engine

app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static('public'));
// secrect is used to encrypt
app.use(session({ secret: 'Project2',
                  resave: true,
                  saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// require passport
//let passportConfigFunction = require('./config/passport/passport');
//passportConfigFunction(passport);

require('./config/passport/passport')(passport);

// This middleware will allow us to use
// the currentUser in our views and routes.
app.use(function (req, res, next) {
  global.currentUser = req.user;
  next();
});

// Routes
app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/blogs', blogsRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

console.log('Running in %s mode', app.get('env'));


// Port setting, tell express listen for requests (start server)
// (process.env.PORT, process.env.IP); environment variable
// listen to particular PORT and IP
app.listen(process.env.PORT || 3000, function() {
  console.log('server on!!!');
});

module.exports = app;
