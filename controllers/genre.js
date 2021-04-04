const Genre =require('../models/genre')
const Livre =require('../models/livre')

const slugify = require('slugify')

exports.create = async(req,res) =>{
 try{
     console.log('Create-->',req.body)
    const {genre}= req.body
    const created = await new Genre({name:genre,slug : slugify(genre)}).save()
    res.json(created)
    

 }
 catch(err)
  {
      res.status(400).json({Error:err})
  }
}

exports.read = async(req,res) =>{
   try{
      
      let genre = await Genre.findOne({slug : req.params.slug}).exec()
      res.json(genre)

    }
    catch(err)
     {
        res.status(400).json({Error:err}) 
     }

}

exports.update = async(req,res) =>{
     const {name} =req.body
    try{
        let updated= await Genre.findOneAndUpdate({slug: req.params.slug},{name,slug:slugify(name)},{new:true})
        res.json(updated)
    }
    catch(err)
     {
        res.status(400).json({Error:err})
     }
}

exports.remove = async(req,res) =>{
    try{
    let todelete = await Genre.findOne({slug:req.params.slug}).exec()
    let livre = await Livre.findOne({genre:todelete}).exec()
    console.log('Livre-->',livre)
    if(livre)
    {
       res.json({ok:false})
    }
   else
   {
      await Genre.findOneAndDelete({slug:req.params.slug})
      res.json({ok:true})
   }
    }
    catch(err)
     {
        res.status(400).json({Error:err})
     }
}

exports.list = async(req,res) =>{
    try{
        res.json(await Genre.find({}).sort({createdAt:-1}).exec())
    }
    catch(err)
     {
        res.status(400).json({Error:err}) 
     }
    }

   
    