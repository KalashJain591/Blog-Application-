 const mongoose =require('mongoose')
//  const validator=require('validator')
 
 const UserSchema= new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password:{type:String , required:true},
    verifytoken:String,
    
   //  recheck:String 
 })


 const UserModel =mongoose.model('Users',UserSchema);
//  const LoginModel=mongoose.model('login',UserSchema);
  module.exports=UserModel;