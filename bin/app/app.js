/* eslint-disable no-undef */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('../modules/index');
var usersRouter = require('../modules/users');

const airAsia = require('../modules/airasia/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../') + "/views");
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../') + "/public"));

app.use('/', indexRouter, airAsia);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT || '5000', (err) => { 
  if (err) console.log("Error in server setup") 
  console.log("Server listening on Port", process.env.PORT || '5000'); 
})

module.exports = app;
