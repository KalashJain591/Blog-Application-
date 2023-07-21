import React, { useState } from 'react'
import './index.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Create() {
  const [title,setTitle]=useState()
  const [desc,setDesc]=useState()
  const [file,setFile]=useState()
  
  const handleSubmit=(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append('title',title);
    formData.append('desc',desc);
    formData.append('file',file);
    const navigate=useNavigate();
// console.log(file);
    axios.post('http://localhost:3001/create',formData)
    .then(res=>{
      console.log(res)
      if(res.data=="Posted Successfully")
      navigate("/home");
    })
    .catch(err=>console.log(err))

  }

  return (
    <div className='row d-flex justify-content-center mt-5'>
      <form className=' col-sm-5 ' onSubmit={handleSubmit}>
        <h1>Create Post</h1>
        <input type="text" className="form-control title mt-2" placeholder='Enter Title' onChange={(e)=>setTitle(e.target.value)}/>
        <textarea className="form-control desc mt-2" rows="10" cols="50" placeholder='Enter Description'onChange={(e)=>setDesc(e.target.value)}></textarea>
        <input type="file" className="form-control-file col-12 mt-2" id="exampleFormControlFile1" onChange={(e)=>setFile(e.target.files[0])}/>
        <button type="submit" className="btn btn-success col-12 my-2 " >Post</button>
          
      </form>
    </div>
  )
}
