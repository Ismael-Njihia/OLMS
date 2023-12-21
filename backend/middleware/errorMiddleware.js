const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler =(err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    //check for validation errors
    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        statusCode = 400;
        message = 'Resource not found'
    }

    res.status(statusCode).json({
        message,
    })
}

export {notFound, errorHandler}