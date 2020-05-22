const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.header('x-auth-token')
    if(!token) return res.status(403).json({ message: 'You must be logged in for that.', error: true})

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(403).json({ message: 'token invalid', error: true})
    }
    
}

const notFound = (req, res, next) => {
    const error = new Error(`These are not the routes you're looking for... ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack,
    })
}

module.exports = {
    notFound,
    errorHandler,
    auth
}