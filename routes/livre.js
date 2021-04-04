const express = require('express')
const router = express.Router()
const {create,listTools,listHome,listAll,read,update,remove} = require('../controllers/livre')
const {authCheck,adminCheck} = require('../middlewares/auth')



//Route
router.post('/livre',authCheck,adminCheck,create)
router.post('/livres-tools',listTools)
router.post('/livres-home',listHome)
router.post('/list-livres',listAll)
router.get('/livre/:slug',read)
router.put('/livre/:slug',authCheck,adminCheck,update)
router.delete('/livre/:slug',authCheck,adminCheck,remove)

module.exports = router
