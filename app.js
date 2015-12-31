var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var httpProxy = require('http-proxy');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var services = require('./services');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
  console.log('connected to db');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
var proxy = httpProxy.createProxyServer({
  target: {
    host: 'localhost',
    port: 9090
  }
});
proxy.on('error', console.log);
app.all('/ws/dbeditor/api*', function(req, res) {
  proxy.web(req, res);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use('/stylesheets', require('less-middleware')(
  path.join(__dirname, 'public', 'stylesheets'), {}
));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'notverysecurrre'
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  services.employeeService.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});
passport.use(new LocalStrategy(services.authenticationService.authenticate));

app.use('/schedule/api', require('./routes/scheduleAPI'));
app.use('/roles/api', require('./routes/rolesAPI'));
app.use('/employees/api', require('./routes/employeesAPI'));
app.use('/login/api', require('./routes/loginAPI'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err);
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


module.exports = app;
