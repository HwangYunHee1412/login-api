var express    = require('express');
var app        = express();
var path       = require('path');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');

// Database
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//mongoose.connect('mongodb://localhost/database', {useMongoClient: true});
mongoose.connect('mongodb://localhost/database');
var db = mongoose.connection;
db.once('open', function () {
   console.log('DB connected!');
});
db.on('error', function (err) {
  console.log('DB ERROR:', err);
});

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type, x-access-token'); //jwt(json web token)로 생성된 토큰은 header의 x-access-token 항목을 통해 전달
  next();
});

// API
app.use('/api/users', require('./api/users')); //2
app.use('/api/auth', require('./api/auth'));   //2

// Server
var port = 3000;
app.listen(port, function(){
  console.log('listening on port:' + port);
});
