const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const config = require('../config')
const router = express.Router()
const jwtAuth = passport.authenticate('jwt', {session: false})
const { User } = require('../models/user')
const fileupload = require("express-fileupload")
const path = require('path')


router.use(jwtAuth)
router.use(fileupload())
router.use(bodyParser.json())

router.get('/', (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      res.json(user.members)
    })
})

router.post('/', (req, res) => {

  let uploadFile = req.files.file
  const fileName = req.files.file.name

  uploadFile.mv(
    `${path.join(__dirname, '..', 'public')}/${fileName}`,
    err => {
      if (err) {
        console.log(err);
        return res.status(500).send(err)
      }

      const member = {
        name: req.body.memberName,
        formats: JSON.parse(req.body.formats),
        avatar: `public/${req.files.file.name}`
      }

      User.findById(req.user.id)
        .then(user => {

          user.members.push(member)

          user.save(err => {
            if (err) {
              res.send(err)
            }

            res.json(user.members)
          })
        })
    },
  )
})

router.delete('/:memberId', (req, res) => {

  User.findById(req.user.id)
    .then(user => {

      user.members.id(req.params.memberId).remove()

      user.save(err => {
        if (err) {
          res.send(err)
        }
        res.json(user.members)
      })
    })
})



router.put('/status/:memberId', (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      const member = user.members.id(req.params.memberId)
      member.status = req.body.status

      user.save(err => {
        if (err) {
          res.send(err)
        }
        res.json(user.members.id(req.params.memberId))
      })
    })
})

router.put('/performance/:memberId', (req, res) => {

  User.findById(req.user.id)
    .then(user => {
      const member = user.members.id(req.params.memberId)
      member.performance = req.body.performance

      user.save(err => {
        if (err) {
          res.send(err)
        }
        res.json(user.members.id(req.params.memberId))
      })
    })
})


module.exports = {router}
