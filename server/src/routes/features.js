const { Router } = require('express')
const Feature = require('../models/Feature')
const Software = require('../models/Software')
const Comment = require('../models/Comment')
const { auth } = require('../middleware/middlewares')

const router = Router()

router.get('/', auth, (req, res) => {
    const { id } = req.user
    if (!id) return res.json({ message: 'Something went wrong...', error: true })
    Software.findOne({ _id: id })
        .then(software => {
            res.json(software.features)
        })
        .catch(err => console.log(err))
})

router.post('/new', (req, res, next) => {
    const { softwareId, name, description } = req.body

    const newFeature = new Feature({
        name,
        description
    })

    newFeature.save()
        .then(feature => {
            const data = {
                id: feature.id,
                name: feature.name,
                description: feature.description
            }
            Software.findOneAndUpdate({ _id: softwareId }, { $push: { features: data } })
                .then(update => {
                    res.json({
                        name: update.name,
                        feature: feature,
                        message: `${newFeature.name} has been added!`
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

router.post('/comment', (req, res, next) => {
    const { featureId, userId, comment } = req.body

    const newComment = new Comment({
        userId,
        comment,
    })
    newComment.save()
        .then(comment => {
            const data = {
                id: comment.id,
                comment: comment.comment,
            }
            Feature.findOneAndUpdate({ _id: featureId}, { $push: { comments: data } } )
                .then(update => {
                    res.json({
                        data: update.comment,
                        message: 'New comment added!'
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

router.post('/comment/delete', (req, res, next) => {
    const { commentId, featureId } = req.body

    Comment.findOneAndDelete({ _id: commentId })
        .then(() => {
            Feature.findOneAndUpdate({ _id: featureId }, { $pull: { 'comments': { 'id': commentId }}})
            .then(update => {
                res.json({
                    data: update._id,
                    message: 'Comment deleted!'
                })
            })
        })
})

module.exports = router