const Pret =require('../models/pret')
const Livre =require('../models/livre')
const slugify = require('slugify')

exports.create = async(req,res) =>{
 try{
     console.log('Create-->',req.body)
     
    // req.body.slug= slugify(req.body.titre)
     const created = await new Pret(req.body).save()
     const newquantity = req.body.quantite - req.body.quantiteAPreter
     const newQuantitePret =req.body.quantitePret + req.body.quantiteAPreter
     const updated= await Livre.findOneAndUpdate({_id: req.body.livre},{quantite:newquantity,quantitePret: newQuantitePret},{new:true})

     console.log('Livre-->',updated)
     res.json(created)

    

 }
 catch(err)
  {    console.log('Livre error-->',err)
      res.status(400).json({Error:err})
  }
}

exports.list = async(req,res)=>{
  

    try
      {
      
  
      const prets = await Pret.find({})
      .populate('user')
      .populate('livre')
      .populate({path:'livre',populate:'genre'})
      .exec()

       console.log('Prets->',prets)
      res.json(prets)}

     
  
   catch(err){
      res.status(400).json({Error:err})
   }
  }

  exports.update = async(req,res) =>{
 
    try{
        console.log('Req.body-->',req.body)
        const {slug,quantite,quantitePret,statut,pret,id}=req.body
      
         
        if(statut === 'Out')    
           { let newquantity = quantite + pret
            let newquantitePret = quantitePret - pret
         
        
        let updated1= await Livre.findOneAndUpdate({slug: slug},{quantite: newquantity,quantitePret:newquantitePret},{new:true})
        let updated2= await Pret.findOneAndUpdate({_id:id},{statut:"Remis"},{new:true})
        console.log('Updated2-->',updated2)
        res.json({updated1,updated2})
        }
        else{
            let newquantity = quantite - pret
            let newquantitePret = quantitePret + pret
         
        
        let updated1= await Livre.findOneAndUpdate({slug: slug},{quantite: newquantity,quantitePret:newquantitePret},{new:true})
        let updated2= await Pret.findOneAndUpdate({_id:id},{statut:"Out"},{new:true})
      
        res.json({updated1,updated2})
       

        }
    }
    catch(err)
     {  console.log('Error update-->',err.message)
        res.status(400).json({Error:err})
        
     }
   }
  