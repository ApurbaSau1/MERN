const express = require('express')
const studentModel = require('../models/crud')
const users=require('../models/login')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const router = express.Router();

router.post('/create', async (req, res) => {
  // console.log("createStudent Called:");
  const {name,Title,Des} = req.body;

  try {
    const student = new studentModel({
      name:name,
      title:Title,
      Description:Des,
      Time:Date(Date.now())
    });
    await student.save();
    // console.log("Data Saved");
    return res.status(200).json({ student ,success:'Successfull Data Entry'});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', (req, res) => {
  studentModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

router.delete('/deleteStudent/:id', (req, res) => {
  const id = req.params.id;
  studentModel.findByIdAndDelete({ _id: id })
    .then(() => res.json({ message: 'Student deleted successfully' }))
    .catch(err => res.json(err));
});


router.get('/updateStudent/:id', async (req, res) => {
  const id = req.params.id;
  await studentModel.findById({ _id: id })
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

router.put('/editStudent/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await studentModel.findByIdAndUpdate(
      { _id: id },
      { name:req.body.name,
         title:req.body.Title,
         Description:req.body.Des,
         Time:Date(Date.now())
      },
      { new: true }
    );
    return res.status(200).json({ message: 'Student updated successfully' });
  } catch (err) {
    return res.json({ error: 'Server error' });
  }
});

router.post('/AdminLogin',async(req,res)=>{
  try{
    const {email,password}=req.body
    const validUser=await users.findOne({email:email})
    if(!validUser)
        {
            return res.status(400).json({error:"Invalid Email"})
        }
        else{
        const validPassword=await bcrypt.compare(password,validUser.Password)
       
        if(!validPassword)
            {
               return res.status(400).json({error:"Invalid Password"})
            }
        else{
            // Generate a token
        const token = jwt.sign({ name: validUser.Name,email:validUser.email}, 'fghjklihkuyjthgg798', { expiresIn: '1h' });
        return res.status(200).json({message:'Success',token})
        }
        }
}
catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
}
})


router.post('/UserRegister',async(req,res)=>{
  const {Name,email,Pass}=req.body
  // console.log(FName+LName+email+Gender+Add+DOB+Ph+Pass);
  // console.log(image);
  // console.log("Came in Backend")
  // console.log(FName)
  const image = req.file;
  // console.log(image)
      if(!Name||!email||!Pass)
          {
              res.status(400).json({error:"Please Enter All Input Data"})
          }
      else{
          try{
              const PreUser=await users.findOne({email:email})
              if(PreUser)
                  {
                      res.status(400).json({error:"This User Already exits in Our DataBase"})
                  }
              else{
                      const HashedPassword=await bcrypt.hash(Pass,10)
                      const NewUser=new users({
                          Name:Name,
                          email:email,
                          Password:HashedPassword,
                      })
                      const StoreData=await NewUser.save()
                      res.status(200).json(StoreData)
                  }
          }
          catch(err){
              res.status(400).json({err:"Invalid Details",err})
          }
  }
})

module.exports = router;