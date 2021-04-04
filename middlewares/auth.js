const admin = require('../firebase')
const User= require('../models/user')

exports.authCheck =async (req,res,next) => {
    try{
       const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken)
          req.user = firebaseUser
        console.log('Bonjourrrr',req.user)
        next()
    }
    catch(error)
    {
        res.status(401).json({err : error})
        
    }
    
    
}
exports.adminCheck= async(req,res,next)=>
{ const {email} = req.user
console.log('Useradmin-->',req.user)
 const adminUser = await User.findOne({email}).exec()
   if(adminUser.role !== 'admin')
{
res.status(403).json({Error:'Admin resource. Access denied'})
}
else next()
}
