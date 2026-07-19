const errorHandler = (req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    res.status(status).json({
        error: process.env.NODE_ENV === 'production' ? 'Internal Error' : err.message,
        ...(process.env.NODE_ENV !== 'production' && {stack: err.stack})
    })
    next();
}

module.exports = errorHandler;