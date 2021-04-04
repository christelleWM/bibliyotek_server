const {createUpdateUser,checkEmail} = require('../controllers/auth')
const {authCheck} = require('../middlewares/auth')

const express = require('express')
const router = express.Router()


//Route
 router.post('/create-update-user',authCheck,createUpdateUser)
 router.post('/check-email',checkEmail)

module.exports = router
