'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events')
const suitEvents = require('./ironManSuit/events')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#sign-out').on('submit', authEvents.onSignOut)

  // IronMan entries listenert:
  $('#suit-create').on('submit', suitEvents.onSuitCreate)
  $('#suit-index').on('click', suitEvents.onSuitIndex)
  $('#suit-show').on('submit', suitEvents.onSuitShow)
  $('#suit-delete').on('submit', suitEvents.onSuitDelete)
  $('#suit-update').on('submit', suitEvents.onSuitUpdate)
})
// your JS code goes here
