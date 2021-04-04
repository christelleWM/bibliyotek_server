const User = require('../models/user')

exports.createUpdateUser = async(req,res)=>{
  const {email} = req.user
  
   

  const user = await User.findOne({email})
  if(user)
  {
      console.log('Existing user')
      res.json(user)
  }
  else{
    const {username,address} =req.body
    const newuser = await new User({email,address,username}).save()
    console.log('Userr-->',newuser)
    res.json(newuser)
  }
  
  
}

exports.checkEmail=async(req,res)=>{
  const {email}=req.body
  console.log('Body-->',req.body)
  try{
    const user = await User.findOne({email})
    console.log('User nnew or not-->',user)
   
        console.log('Existing user')
        res.json(user)
  
  
  }
  catch(err){
    res.status(401).json({Error:err})
  }
  
}