const mongoose=require('mongoose')
const Schema=new mongoose.Schema({
    name:String,
    title:String,
    Description:String,
    Time:String,
})
const Crud=mongoose.model('collection',Schema)
module.exports=Crud