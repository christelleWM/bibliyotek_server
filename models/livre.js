const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const livreSchema = new mongoose.Schema({

    titre : {
        type:String,
        trim:true,
        required:'Nom requis',
        minlength:[2,'Trop court'],
        maxlength:[32,'Trop long'],
        text:true,
        index:true,
    },
    slug : {
        type:String,
        unique:true,
        lowercase:true,
        index:true,
    },
    resume : {
        type:String,
        required:'Resume requis',
        minlength:[15,'Tro court'],
       // maxlength:[144,'Trop long'],
    },
    auteur : {
        type:String,
        required:'Auteur requis',
      
    },
    // prix : {
    //     type: Number,
    //     required:true,
    
      
    // },
    genre :{
        type : ObjectId,
        ref  : "Genre",
        
    },
    annee:Number,
    quantite:Number,

    quantitePret:{
        type:Number,
        default:0,
    },
    quantiteReservation:{
        type:Number,
        default:0,
    },
    image:{
        type:Array,
    },
   

},{timestamps:true})
module.exports = mongoose.model('Livre', livreSchema)