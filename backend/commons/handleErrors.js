const app = require('../app');
const response = require('../models/outputModels/responseBase');

//-------------------------------HANDLE ERROR API----------------------//
module.exports.PrintStacktrace = new class extends Error {
  async errorNotFound(req, res) {
    const err = new Error('Not Found');
    err.status = 404;
    response.ResponseBase(req, res, err.status, err.message);
  }

  async errorInternalServer(req, res) {
    const err = new Error('Error');
    err.status = 500;
    response.ResponseBase(req, res, err.status, err.message);
  }

  async errorBadRequest(req, res) {
    const err = new Error('Bad Request');
    err.status = 400;
    response.ResponseBase(req, res, err.status, err.message);
  }

  async throwException(req, res, ex) {
    const err = new Error(ex);
    return response.ResponseBase(req, res, 500, err.message);
  }
}



//--------------------------------------------------------------------//
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

// server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
      // named pipe
      return val;
  }

  if (port >= 0) {
      // port number
      return port;
  }

  return false;
  }