const express = require('express')
const studentModel = require('../models/crud')

const router = express.Router();

router.post('/create', async (req, res) => {
  // console.log("createStudent Called:");
  const {name,Gen,Ph,DOB,city} = req.body;

  try {
    const student = new studentModel({
      name:name,
      gender:Gen,
      DOB:DOB,
      city:city,
      Ph:Ph
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
         gender:req.body.Gen,
         city:req.body.city,
         DOB:req.body.DOB,
         Ph:req.body.Ph
      },
      { new: true }
    );
    return res.status(200).json({ message: 'Student updated successfully' });
  } catch (err) {
    return res.json({ error: 'Server error' });
  }
});
module.exports = router;