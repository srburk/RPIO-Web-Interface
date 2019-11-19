var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// =============== Initiate Sam's Testing Code ==============
//var rpio = require('rpio');
//var i2c = require('i2c-bus');
//rpio.init({mapping: 'gpio'}); // Initialize with GPIO Pin Number Mapping
// ==========================================================

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// ================Sam's Testing Code=======================
//var MPU_ADDRESS = 0x68;
//var GYRO_X_OUT = 0x44;

//const i2c1 = i2c.open(1, err => {
//	if (err) throw err;
//	i2c1.readWord(MPU_ADDRESS, GYRO_X_OUT, (err, rawData) => {
//		if (err) throw err;
//
//		console.log(rawData);
//		i2c1.close(err => {
//			if (err) throw err;
//		});
//	});
//});
// ==========================================================

module.exports = app;

