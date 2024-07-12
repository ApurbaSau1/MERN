import {React,useState } from 'react';
import axios from 'axios';
import {useNavigate,Link} from "react-router-dom"
import { ToastContainer }  from 'react-toastify'
import "react-bootstrap"
import "bootstrap"

const Create = () => {
const navigate = useNavigate();
const [formData,setFormData]=useState({
    name:"",
    Title:"",
    Des:""
    });
const handleChange=e=>{
    setFormData({...formData,[e.target.name]:e.target.value})
}

const handleSubmit=async (e)=>{
    e.preventDefault()
        await axios.post('http://localhost:5000/api/create',formData)
        .then(res => {
          console.log("API called")
          if(res.status===200)
            {
              alert(res.data.success)
              navigate("/")
            }
          })
          .catch(error => {
            alert(error.res.data.error)
          });
      }
    
    


  return (
    <>
  <div className='container'>
    <div className='row mt-5 '>
      <div className='col-md-4 offset-md-4 border border-success rounded-2 shadow-lg p-3 mb-5 bg-body rounded bg-white'>

    
  <form onSubmit={handleSubmit} >

    <div className="form-group">
      <label htmlFor="FName">Name</label>
      <input type="text" className="form-control" id="FName" name="name" required placeholder ="Enter Your Full Name" onChange={handleChange} />
    </div>    
    <div className="form-group">
      <label htmlFor="Title">Title</label>
      <input type="text" className="form-control" id="Title" name="Title" required placeholder ="Enter Your Title Name" onChange={handleChange} />
    </div>    

    <div className="form-group">
      <label htmlFor="Add">Description</label>
      <textarea className="form-control" id="Add" name="Des" rows={2}  onChange={handleChange} />
    </div>

<div className="text-center">
    <button type="submit" className="btn btn-success mt-2 middle">Submit</button><br />
   

<Link to="/" className="btn btn-success mt-2 middle" >Go back To Home </Link>
  

 </div>
 <ToastContainer />
  </form>


  </div>
  </div>
  </div>
    </>
  )
}
export default Create