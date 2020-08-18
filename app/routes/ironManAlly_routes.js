const express = require('express')
const passport = require('passport')

const IronManAlly = require('../models/ironManAlly')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()
// INDEX
// GET
router.get('/ironManAlly', requireToken, (req, res, next) => {
  IronManAlly.find()
    .then(ironManAlly => {
      return ironManAlly.map(ironManAlly => ironManAlly.toObject())
    })
    .then(ironManAlly => res.status(200).json({ ironManAlly: ironManAlly }))
    .catch(next)
})

router.post('/ironManAlly', requireToken, (req, res, next) => {
  req.body.ironManAlly.owner = req.user.id
  // console.log('req.body.ironManSuit is:', req.body.ironManSuit)
  IronManAlly.create(req.body.ironManAlly)
    .then(ironManAlly => {
      res.status(201).json({ ironManSuit: ironManAlly.toObject() })
    })
    .catch(next)
})
// UPDATE
// PATCH
router.patch('/ironManAlly/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.ironManAlly.owner

  IronManAlly.findById(req.params.id)
    .then(handle404)
    .then(ironManAlly => {
      requireOwnership(req, ironManAlly)
      return ironManAlly.updateOne(req.body.ironManAlly)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
// DESTROY
// DELETE
router.delete('/ironManAlly/:id', requireToken, (req, res, next) => {
  IronManAlly.findById(req.params.id)
    .then(handle404)
    .then(ironManAlly => {
      requireOwnership(req, ironManAlly)
      ironManAlly.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
