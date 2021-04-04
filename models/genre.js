const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const genreSchema = new mongoose.Schema({

    name : {
        type:String,
        trim:true,
        required:'Name is required',
        minlength:[2,'Too short'],
        maxlength:[32,'Too long'],
       
    },
    slug : {
        type:String,
        unique:true,
        lowercase:true,
        index:true,
    }
},{timestamps:true})
module.exports = mongoose.model('Genre', genreSchema)