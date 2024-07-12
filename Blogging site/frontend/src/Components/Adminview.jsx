
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { Button } from 'react-bootstrap';

const Adminview = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [users,setUsers]=useState([])

  useEffect(() => {
    const token = Cookies.get('token');
    const verifyToken = token ? JSON.parse(atob(token.split('.')[1])) : null;

    if (!token) {
      navigate('/Admin');
    } else {
      setUser(verifyToken.name);
      console.log(verifyToken.name);
    }
  }, [navigate]);
  
  useEffect(()=>{
    axios.get('http://localhost:5000/api')
    .then(result => {
      setUsers(result.data)
      // console.log(result.data)
    }
    )
    .catch(err => console.log(err))
  },[])
  
  const handleDelete=(id)=>{
    axios.delete('http://localhost:5000/api/deleteStudent/'+id)
    .then(res =>{
        alert(res.data.message)
        window.location.reload()
    })
    .catch(err => console.log(err))
  }

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/Admin');
  };
  
    return (
    <div className='d-flex vh-100 bg-secondary justify-content-center alig-items-center'>
      <div className='w-75  bg-white rounded p-3 m-auto'>
        <center><h2>Welcome {user}  to Your Pannal</h2></center>
      <Link to='/create' className='btn btn-success'>Add +</Link>
      <Button className='btn btn-success ml-2' onClick={handleLogout}>Logout</Button>
      <h3>Total User {users.length}</h3>
        <table className='table container'>

        <thead>
                <tr>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Time</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
             
            {users.map((user)=>{
               const time=user.Time
               const ex_time = time.slice(0, 24);
              return<tr >
                    <td>{user.name}</td>
                    <td>{user.title}</td>
                    <td>{user.Description}</td>
                    <td>{ex_time}</td>
                    <td><Link to={`/update/${user._id}`} className='btn btn-success'>Update</Link>
                    <button className='btn btn-danger' onClick={(e) => handleDelete(user._id)}>Delete</button>
                    </td>
                </tr>
            })}

            </tbody>
            </table>
      </div>
    </div>
  )
}

export default Adminview
