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
  // req.params.id will be set based on the `:id` in the route
  IronMansuit.findById(req.params.id)
    .then(handle404)
    .then(IronMansuit => res.status(200).json({ IronMansuit: IronMansuit.toObject() }))
    .catch(next)
})

// CREATE
// POST /examples
router.post('/ironManSuit', requireToken, (req, res, next) => {
  // set owner of new example to be current user
  req.body.ironManSuit.owner = req.user.id

  IronMansuit.create(req.body.ironManSuit)
    // respond to succesful `create` with status 201 and JSON of new "example"
    .then(ironManSuit => {
      res.status(201).json({ ironManSuit: ironManSuit.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /examples/5a7db6c74d55bc51bdf39793
router.patch('/ironManSuit/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.ironManSuit.owner

  IronMansuit.findById(req.params.id)
    .then(handle404)
    .then(ironManSuit => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, ironManSuit)

      // pass the result of Mongoose's `.update` to the next `.then`
      return ironManSuit.updateOne(req.body.ironManSuit)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete('/ironManSuit/:id', requireToken, (req, res, next) => {
  IronMansuit.findById(req.params.id)
    .then(handle404)
    .then(ironManSuit => {
      // throw an error if current user doesn't own `example`
      requireOwnership(req, ironManSuit)
      // delete the example ONLY IF the above didn't throw
      ironManSuit.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
