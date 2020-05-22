const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const { notFound, errorHandler } = require('./src/middleware/middlewares')
const users = require('./src/routes/users')
const auth = require('./src/routes/auth')
const companies = require('./src/routes/companies')
const software = require('./src/routes/software')
const features = require('./src/routes/features')

const app = express()


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})

app.use(morgan('common'))
app.use(helmet())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: 'Hello world!',
    })
})

app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/companies', companies)
app.use('/api/software', software)
app.use('/api/features', features)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 1389;
app.listen(port, () => {
    console.log(`Listening at port: ${port}`)
})

