const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const suggestionSchema = new mongoose.Schema({

    titre : {
        type:String,
        trim:true,
        required:'Titre requis',
        minlength:[2,'Trop court'],
        maxlength:[32,'Trop long'],
        text:true,
       
    },
    slug : {
        type:String,
        unique:true,
        lowercase:true,
       
    },

    auteur : {
        type:String,
        required:'Auteur requis',
      
    },
    genre :{
        type : ObjectId,
        ref  : "Genre",
        
    },
    annee:Number,
    suggestedBy : {
        type : ObjectId,
        ref : 'User'
    }
   
},{timestamps:true})
module.exports = mongoose.model('Suggestion', suggestionSchema)