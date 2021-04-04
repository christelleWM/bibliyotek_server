const express = require('express')
const router = express.Router()
const {create,list,update} = require('../controllers/pret')
const {authCheck,adminCheck} = require('../middlewares/auth')



//Route
router.post('/pret',authCheck,adminCheck,create)
router.post('/list-pret',list)
router.post('/update-pret',update)

module.exports = router