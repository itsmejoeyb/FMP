const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { auth } = require('../middleware/middlewares')

const router = Router()

router.get('/', (req, res) => {
    res.json({
        message: 'we did it'
    })
})

router.post('/', (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(418).json({ message: 'Please fill out all fields.', error: true})
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ message: 'The email you entered was not found. Would you like to create an account instead?', error: true})

            bcrypt.compare(password, user.password)
            .then(match => {
                if(!match) return res.status(400).json({message: 'Incorrect password, please try again.', error: true})

                jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET,
                    // { expiresIn: '10 seconds' },
                    (err, token) => {
                        if (err) throw err
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                            }
                        })
                    }
                )
            })
        })
        .catch(err => console.log(err))
})

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})



module.exports = router