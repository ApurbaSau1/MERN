import {React,useState,useEffect} from 'react';
import axios from 'axios';
import {useParams,useNavigate,Link} from "react-router-dom"
import "react-bootstrap"
import "bootstrap"

const Update = () => {
  const { id } = useParams()
const navigate = useNavigate();
const [formData,setFormData]=useState({
    name:"",
    Title:"",
    Des:""
    });
    useEffect(() => {
      axios.get('http://localhost:5000/api/updateStudent/' + id)
        .then(response => {
          const user = response.data;
          setFormData({
            name: user.name,
            title: user.title,
            Description: user.Description
          });
        })
        .catch(error => {
          console.error("There was an error fetching the data:", error);
        });
    }, [id]);
const handleChange=e=>{
    setFormData({...formData,[e.target.name]:e.target.value})
}

const handleSubmit=async (e)=>{
    e.preventDefault()
        await axios.put('http://localhost:5000/api/editStudent/'+id,formData)
        .then(res => {
          console.log("API called")
          if(res.status===200)
            {
              alert(res.data.message)
              navigate("/")
            }
          })
          .catch(error => {
            console.log("hiii");
            alert(error.response.data.error)
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
      <input type="text" className="form-control" id="FName" name="name" placeholder ="Enter Your Full Name" onChange={handleChange} />
    </div>    
    <div className="form-group">
      <label htmlFor="Title">Title</label>
      <input type="text" className="form-control" id="Title" name="Title"  placeholder ="Enter Your Title Name" onChange={handleChange} />
    </div>    

    <div className="form-group">
      <label htmlFor="Add">Description</label>
      <textarea className="form-control" id="Add" name="Des" rows={2}  onChange={handleChange} />
    </div>
<div className="text-center">
    <button type="submit" className="btn btn-success mt-2 middle">Submit</button><br />
   

<Link to="/" className="btn btn-success mt-2 middle" >Go back To Home </Link>
  

 </div>

  </form>


  </div>
  </div>
  </div>
    </>
  )
}
export default Update