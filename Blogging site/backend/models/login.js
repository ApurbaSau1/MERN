const mongoose=require('mongoose')
const Schema=new mongoose.Schema({
    Name:String,
email:String,
Password:String
})
const Crud=mongoose.model('login',Schema)
module.exports=Crud