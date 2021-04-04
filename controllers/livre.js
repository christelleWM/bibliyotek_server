const Livre =require('../models/livre')
const Pret =require('../models/pret')


const slugify = require('slugify')

exports.create = async(req,res) =>{
 try{
     console.log('Create-->',req.body)
    
    req.body.slug= slugify(req.body.titre)
    const created = await new Livre(req.body).save()
    res.json(created)
    

 }
 catch(err)
  {    console.log('Livre error-->',err)
      res.status(400).json({Error:err})
  }
}

exports.listTools = async(req,res)=>{

    try
      {
      const {sort,order,page,perpage,search} = req.body
   
      console.log('Livres-->',req.body)
      let livres=[]
      if(perpage !=='No pagination')
      { perpage1=parseInt(perpage)
         console.log('Perpage-->',perpage1)
         livres = await Livre.find({titre: { $regex: search, $options: "i" }})
         .skip((page-1)*perpage1)
         .limit(perpage1)
         .populate('genre')
         .sort([[sort]])
         .exec() 
      }
      else
      {console.log('Hiiii')
      livres = await Livre.find({titre: { $regex:search, $options: "i" }})
      .populate('genre')
      .exec()}
      
     
      console.log('Livres-Page',req.body)
      let total =await Livre.find({titre: { $regex:search, $options: "i" }}).estimatedDocumentCount().exec()
      res.json({livres,total})
     }

   catch(err){
      res.status(400).send({Error:err})
   }
 }

 exports.listAll = async(req,res)=>{

  try
    {
 

    const livres = await Livre.find({})
    .populate('genre')
    .exec()
   
    res.json(livres)
   }

 catch(err){
    res.status(400).json({Error:err})
 }
}

exports.read = async(req,res) =>{
  try{
     
     let livre = await Livre.findOne({slug : req.params.slug}).populate('genre').exec()
     console.log('Livre-->',livre)
     res.json(livre)

   }
   catch(err)
    {
       res.status(400).json({Error:err}) 
    }

}

exports.update = async(req,res) =>{
 
 try{
     req.body.slug=slugify(req.body.titre)
     let updated= await Livre.findOneAndUpdate({slug: req.params.slug},req.body,{new:true})
     res.json(updated)
 }
 catch(err)
  {  console.log('Error update-->',err.message)
     res.status(400).json({Error:err})
     
  }
}

exports.remove = async(req,res) =>{
   try{
   let deleted = await Livre.findOneAndDelete({slug:req.params.slug})
   // let deleted1 = await Pret.findAndDelete({livre:deleted._id})
  let deleted1= await Pret.deleteMany({livre:deleted._id})
   console.log('Deleted-->',deleted,'Deleted1-->',deleted1)
   res.json(deleted)
   }
   catch(err)
    {
       res.status(400).json({Error:err})
    }
}

exports.listHome = async(req,res)=>{

   try
     {
     const {sort,page,genres,searchTitre,searchAuteur} = req.body
  
     console.log('Livres-->',req.body)
     let livres=[]
     let perpage=9
     livres = await Livre.find({genre:{$in: genres},titre: { $regex:searchTitre, $options: "i" },auteur: { $regex:searchAuteur, $options: "i" }})
     .skip((page-1)*perpage)
     .limit(perpage)
     .populate('genre')
     .sort([[sort]])
     .exec() 

     console.log('LivresGenres->',livres)
     let total =await Livre.find({genre:{$in: genres},}).estimatedDocumentCount().exec()
     res.json({livres,total})
    }

  catch(err){
     res.status(400).send({Error:err})
  }
}
