const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const pretSchema = new mongoose.Schema({

   
    livre :{
        type : ObjectId,
        ref  : "Livre",
        
    },
    user :{
        type: ObjectId,
        ref: 'User',

    },
    statut:{
        type:String,
        enum:["Out","Remis"],
        default:"Out",
    },
    quantiteAPreter:Number,
  
},{timestamps:true})
module.exports = mongoose.model('Pret', pretSchema)