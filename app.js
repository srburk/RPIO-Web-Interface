var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

// WebSocket Code =================================
// import
var WebSocket = require('ws');

// initialize server instance
const wss = new WebSocket.Server({ port: 8000 });

// on connection event, start this
wss.on('connection', (ws) => {
  // message handler
  ws.on('message', (message) => {
    console.log('Recieved: %s', message);
  });

  // status handlers
  ws.send('Client connected');
  console.log('Client connected');

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// always send info regardless of client call requests
setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);

// End WebSocket Code ==============================

// Testing Client Code
app.use('/client', express.static(path.join(__dirname, 'websocket-client.html')));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('api', apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(500).json({
        message: err.message,
        error: err
    });
});

module.exports = app;
