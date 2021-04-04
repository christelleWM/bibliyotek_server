const express = require('express')
const router = express.Router()
const {create,list} = require('../controllers/suggestion')
const {authCheck} = require('../middlewares/auth')



//Route
router.post('/suggestion',authCheck,create)
router.post('/list-suggestion',authCheck,list)

module.exports = router
