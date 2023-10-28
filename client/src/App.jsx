import Navbar from './Navbar'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import { Children, createContext, useEffect, useState } from 'react'
import axios from 'axios'
import Create from './Create'
import SinglePost from './SinglePost'
import EditPost from './EditPost'
import Resetpass from './Resetpass'
import Forgotpass from './Forgotpass'
import Error from './Error'


// import UploadCheck from './UploadCheck'
import Getimg from './Getimg'
import About from './About'
// import { LoadingSpiner } from './LoadingSpinner'
export const userContext = createContext();
  
function App() {
  
    const [user,setUser]=useState({});
    const [googleAuth,setgoogleAuth]=useState(null);
  
    // const [temp,settemp]=useState({"name":"kalash","id":"1"});
    
    axios.defaults.withCredentials=true;
   // This is for google authentication 
  //  useEffect(()=>{
  //    axios.get('http://localhost:3001/auth/login/success')
  //    .then(res=>{
  //     if(res.data=="Login Successful"){
  //       setauth(true);    
  //     }
      
  //   })
  //    .catch(err=> {console.log(err)})
  //  },[]);

    useEffect(()=>{
      // axios.get('http://localhost:3001/user/check')
      axios.get('/api/user/check')
      // .then(user=>{setUser(user.data);console.log(user.data)})
      .then(user=>{setUser(user.data);})
      .catch(err=>{console.log(err)})
    },[])

    const [isAuth,setauth]=useState(false);

    useEffect(()=>{
      // axios.get('http://localhost:3001/user/check')
      axios.get('/api/user/check')
      // .then(user=>{setUser(user.data);console.log(user.data)})
      .then(user=>{setUser(user.data);})
      .catch(err=>{console.log(err)})
    },[isAuth]);
    
    return (
    <>
         <userContext.Provider value={{user,googleAuth,isAuth}}>
         <BrowserRouter>
          <Navbar setauth={setauth} />
          {/* <LoadingSpiner/> */}
          <Routes>
            <Route path='/register' element={<Register setauth={setauth} />}></Route>
            <Route path='/login' element={<Login setauth={setauth} />}></Route>
            <Route path='/' element={<Home />}></Route>
            <Route path='/create' element={<Create/>}></Route>
            <Route path='/singlePost/:id' element={<SinglePost/>}></Route>
            <Route path='/editPost/:id' element={<EditPost/>}></Route>  
            <Route path='/forgot-password' element={<Forgotpass/>} />
            <Route path='/reset-password/:id/:token' element={<Resetpass/>} />
            {/* <Route path='/uploadCheck' element={<UploadCheck/>} />     */}
            <Route path='/GetImg' element={<Getimg/>} />    
            <Route path='/About' element={<About/>}/>
            <Route path='/error' element={<Error/>} />  
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
