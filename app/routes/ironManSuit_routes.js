const express = require('express')
const passport = require('passport')

const IronMansuit = require('../models/ironManSuit')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()
// INDEX
// GET
router.get('/ironManSuit', requireToken, (req, res, next) => {
  IronMansuit.find()
    .then(ironManSuit => {
      return ironManSuit.map(ironManSuit => ironManSuit.toObject())
    })
    .then(ironManSuit => res.status(200).json({ ironManSuit: ironManSuit }))
    .catch(next)
})
// SHOW
// GET
router.get('/ironManSuit/:id', requireToken, (req, res, next) => {
  IronMansuit.findById(req.params.id)
    .then(handle404)
    .then(IronMansuit => res.status(200).json({ IronMansuit: IronMansuit.toObject() }))
    .catch(next)
})
// CREATE
// POST
router.post('/ironManSuit', requireToken, (req, res, next) => {
  req.body.ironManSuit.owner = req.user.id

  IronMansuit.create(req.body.ironManSuit)
    .then(ironManSuit => {
      res.status(201).json({ ironManSuit: ironManSuit.toObject() })
    })
    .catch(next)
})
// UPDATE
// PATCH
router.patch('/ironManSuit/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.ironManSuit.owner

  IronMansuit.findById(req.params.id)
    .then(handle404)
    .then(ironManSuit => {
      requireOwnership(req, ironManSuit)
      return ironManSuit.updateOne(req.body.ironManSuit)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
// DESTROY
// DELETE
router.delete('/ironManSuit/:id', requireToken, (req, res, next) => {
  IronMansuit.findById(req.params.id)
    .then(handle404)
    .then(ironManSuit => {
      requireOwnership(req, ironManSuit)
      ironManSuit.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
