import Navbar from './Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import { Children, createContext, useEffect, useState } from 'react'
import axios from 'axios'
import Create from './Create'
import SinglePost from './SinglePost'
import EditPost from './EditPost'
export const userContext = createContext();

function App() {
    const [user,setUser]=useState({});
    // const [temp,settemp]=useState({"name":"kalash","id":"1"});

    axios.defaults.withCredentials=true;
    useEffect(()=>{
      axios.get('http://localhost:3001/')
      .then(user=>{setUser(user.data);console.log(user.data)})
      .catch(err=>{console.log(err)})
    },[])

    const [isAuth,setauth]=useState(false);

    useEffect(()=>{
      axios.get('http://localhost:3001/')
      .then(user=>{setUser(user.data);console.log(user.data)})
      .catch(err=>{console.log(err)})
    },[isAuth]);
    
    return (
    <>
         <userContext.Provider value={user}>
         <BrowserRouter>
          <Navbar setauth={setauth} />
          <Routes>
            <Route path='/register' element={<Register setauth={setauth} />}></Route>
            <Route path='/login' element={<Login setauth={setauth} />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/create' element={<Create/>}></Route>
            <Route path='/singlePost/:id' element={<SinglePost/>}></Route>
            <Route path='/editPost/:id' element={<EditPost/>}></Route>
           

            
          </Routes>
        </BrowserRouter>
        </userContext.Provider>
    </>
  )
  // return (<userContext.Provider value={user}>
  //   {Children}
  // </userContext.Provider>)
}

export default App
