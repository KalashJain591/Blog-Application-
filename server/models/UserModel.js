 const mongoose =require('mongoose')

 const UserSchema= new mongoose.Schema({
    name:String,
    password:String,
    email:String,
   //  recheck:String 
 })


 const UserModel =mongoose.model('Users',UserSchema);
//  const LoginModel=mongoose.model('login',UserSchema);
  module.exports=UserModel;