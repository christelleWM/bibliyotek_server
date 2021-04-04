const Suggestion =require('../models/suggestion')
const User = require('../models/user')


const slugify = require('slugify')

exports.create = async(req,res) =>{
 try{
     console.log('Create-->',req.body)
    const {titre,auteur,genre,annee}=req.body
    
    
    const user= await User.findOne({email:req.user.email}).exec()

    const created = await new Suggestion({titre,auteur,genre,annee,suggestedBy:user._id,slug : slugify(titre)}).save()
    res.json(created)
    

 }
 catch(err)
  {    console.log('Suggestion error-->',err)
      res.status(400).json({Error:err})
  }
}

exports.list = async(req,res)=>{
  

    try
      {
        const user= await User.findOne({email:req.user.email}).exec()

        if(user.role === 'admin')
  {
      const suggestions = await Suggestion.find({})
      .populate('suggestedBy')
      .populate('genre')
      .exec()
       console.log('Suggestions-->',suggestions)
      res.json(suggestions)}

      else{
        const suggestions = await Suggestion.find({suggestedBy:user._id})
        .populate('suggestedBy')
        .populate('genre')
        .exec()
         console.log('Suggestions-->',suggestions)
        res.json(suggestions) 
      }
     }
  
   catch(err){
      res.status(400).json({Error:err})
   }
  }
  