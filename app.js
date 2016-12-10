var express          = require('express');
var mongoose         = require('mongoose');
var bodyParser       = require('body-parser');
var methodOverride   = require('method-override');
var app              = express();


// Connect to database
mongoose.connect('mongodb://localhost/todos');

// other settings
app.set('views', './views');
app.set('view engine', 'ejs');   // expect ejs for view engine
app.use(express.static('./public'));  //serve pulic directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
app.use('/', require('./routes/home'));
app.use('/posts', require('./routes/posts'));

// Port setting, tell express listen for requests (start server)
// (process.env.PORT, process.env.IP); environment variable
// listen to particular PORT and IP
app.listen(3000, function() {
  console.log('server on!!!');
});
