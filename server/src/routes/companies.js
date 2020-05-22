const { Router } = require('express')
const User = require('../models/User')
const Company = require('../models/Company')
const { auth } = require('../middleware/middlewares')

const router = Router()

router.get('/', auth, (req, res) => {
    const { id } = req.user
    if(!id) return res.json({message: 'Something went wrong...', error: true})
    User.findOne({ _id: id })
    .then(user => {
        res.json(user.companies)
    })
    .catch(err => console.log(err))
})

router.post('/new', (req, res, next) => {
    const { userId, name, email, description } = req.body

    const newCompany = new Company({
        name,
        email,
        description
    })

    newCompany.save()
    .then(company => {
        const data = {
            id: company.id,
            name: company.name,
            description: company.description
        }
        User.findOneAndUpdate({ _id: userId }, { $push: { companies: data }})
        .then(update => {
            res.json({
                user: update.name,
                company: company,
                message: `${newCompany.name} has been added!`
            })
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                res.status(422)
                console.log(err)
            }
            next(err)
        })
    })
    .catch(err => {
        if (err.name === 'ValidationError') {
            res.status(422)
            console.log(err)
        }
        next(err)
    })
})


module.exports = router