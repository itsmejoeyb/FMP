const { Router } = require('express')
const Software = require('../models/Software')
const Company = require('../models/Company')
const { auth } = require('../middleware/middlewares')

const router = Router()

router.get('/', auth, (req, res) => {
    const { id } = req.company
    if (!id) return res.json({ message: 'Something went wrong...', error: true })
    Company.findOne({ _id: id })
        .then(company => {
            res.json(company.software)
        })
        .catch(err => console.log(err))
})

router.post('/new', (req, res, next) => {
    const { companyId, name, description } = req.body

    const newSoftware = new Software({
        name,
        description
    })

    newSoftware.save()
        .then(software => {
            const data = {
                id: software.id,
                name: software.name,
                description: software.description
            }
            Company.findOneAndUpdate({ _id: companyId }, { $push: { software: data } })
                .then(update => {
                    res.json({
                        name: update.name,
                        software: software,
                        message: `${newSoftware.name} has been added!`
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