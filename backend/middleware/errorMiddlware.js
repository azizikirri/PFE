// error for a route that that doesn't exist 
const notFound = (req,res,next)=>{
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}
// costume error middleware
const errorHandler = (err,req,res,next) =>{
    // if we throw manuel error the status might still be 200 and we don't want it to be 200
    let statusCode = res.statusCode === 200 ? 500  : res.statusCode
    let message = err.message
    // mongoose cast error handlening
    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        statusCode = 404;
        message = 'Source not found'
    }
    res.status(statusCode).json({
        message:message,
        stack: process.env.NODE_ENV==='production' ? null : err.stack
    })
}

export {notFound, errorHandler}