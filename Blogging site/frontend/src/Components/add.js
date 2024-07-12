
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Add = () => {
     
  const [users,setUsers]=useState([])

  useEffect(()=>{
    axios.get('http://localhost:5000/api')
    .then(result => {
      setUsers(result.data)
      // console.log(result.data)
    }
    )
    .catch(err => console.log(err))
  },[])



  
    return (
    <div className='d-flex vh-100 bg-primary justify-content-center alig-items-center'>
      <div className='w-50 bg-white rounded p-3 m-auto'>
      <Link to='/create' className='btn btn-success'>Add +</Link>
      <h3>Total User {users.length}</h3>
        <table className='table'>

            <thead>
                <tr>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
             
            {users.map((user)=>{
              const time=user.Time
              const ex_time = time.slice(4, 24);
              // console.log(ex_time);
                return<tr >
                    <td>{user.name}</td>
                    <td>{user.title}</td>
                    <td>{user.Description}</td>
                    <td>{ex_time}</td>
                </tr>
            })}

            </tbody>
            </table>
      </div>
    </div>
  )
}

export default Add
