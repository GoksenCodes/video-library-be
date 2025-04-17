function errorHandler(err, req, res, next) {
    console.error('Error:', err);
  
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
  
    res.status(status).json({
      error: {
        message,
        ...(err.details && { details: err.details }),
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
      }
    });
  }
  
  module.exports = errorHandler;
  