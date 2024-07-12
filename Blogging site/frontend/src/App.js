import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react';
import Add from './Components/add';
import Create from './Components/Create';
import Update from './Components/Update';
import Navbar from './Components/navbar';
import Admin from './Components/Admin';
import Error from'./Components/Error'
import PrivateRoute from './Components/PrivateRoute';
import Adminview from './Components/Adminview';
import 'bootstrap'
import 'react-bootstrap'

function App() {
  return (
 
   <div>
   <BrowserRouter className="bg-success">
    <Navbar/>
    <Routes>
      <Route path='/' element={<PrivateRoute><Add/></PrivateRoute>}></Route>
      <Route path='/Add' element={<Adminview/>}></Route>
      <Route path='/create' element={<Create/>}></Route>
      <Route path='/update/:id' element={<Update/>}></Route>
      <Route path='/Admin' element={<PrivateRoute><Admin/></PrivateRoute>}></Route>
      <Route path='/*' element={<Error/>}></Route>
    </Routes>
   </BrowserRouter>
   </div>
  );
}

export default App;

