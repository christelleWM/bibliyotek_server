const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const {readdirSync} = require('fs')


//initialization
const app = express()
app.listen(process.env.PORT,()=>{console.log('Server up and running on port', process.env.PORT)})
mongoose.connect(process.env.DATABASE,{useNewUrlParser:true, useCreateIndex:true, useFindAndModify:false,useUnifiedTopology: true}).then(()=>console.log("DB connected")).catch((error)=>console.log('Connection error',error))

//middleware
app.use(cors())
app.use(morgan("dev"))
app.use(bodyParser.json({limit:"2mb"}))

//route middleware
readdirSync('./routes').map((route)=>app.use('/api',require(`./routes/${route}`)))