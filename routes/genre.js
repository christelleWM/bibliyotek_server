const express = require('express')
const router = express.Router()
const {create, read, update, remove, list} = require('../controllers/genre')
const {authCheck,adminCheck} = require('../middlewares/auth')



//Route
router.post('/genre',authCheck,adminCheck,create)
router.get('/genres/',list)
router.get('/genre/:slug',read)
router.put('/genre/:slug',authCheck,adminCheck,update)
router.delete('/genre/:slug',authCheck,adminCheck,remove)


module.exports = router
