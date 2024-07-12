const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const authRoute=require('./routes/authRouter')

const app=express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
mongoose.connect('mongodb://127.0.0.1:27017/Mern_crud').then(()=>{
    console.log('MongoDB connected Successfully')
}).catch((error)=>{
    console.log('MongoDB connection Failed',error)
})
app.use('/api',authRoute)

app.listen(5000,()=>{
    console.log('Server running on Port : 5000')
})