const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = Router()

router.get('/', (req, res) => {
    res.json({
        message: 'we did it'
    })
})

router.post('/register', (req, res, next) => {
    const { firstName, lastName, email, password } = req.body
    if (!firstName || !lastName || !email || !password) return res.status(418).json({ message: 'Please fill out all fields.', error: true })
    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({ message: 'That email is already in use, check the email or log in instead.', error: true })

            const newUser = new User({
                firstName,
                lastName,
                email,
                password
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err
                    newUser.password = hash
                    newUser.save()
                    .then(user => {
                        jwt.sign(
                            { id: user.id },
                            process.env.JWT_SECRET,
                            { expiresIn: '1 day' },
                            (err, token) => {
                                if(err) throw err
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
                    .catch(error => {
                        if(error.name === 'ValidationError') {
                            res.status(422)
                            console.log(error)
                        }
                        next(error)
                    }) 
                })
            })
        })
})

module.exports = router