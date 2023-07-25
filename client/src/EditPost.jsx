import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditPost() {
    const {id} = useParams();
    const [title, setTitle] = useState()
    const [desc, setDesc] = useState()
    const [file, setFile] = useState()
    const [newFile,setNewFile]=useState()
    const navigate=useNavigate();
    // This hook is to initially get the current data of the post to be edited
    console.log(id);
    useEffect(()=>{
        axios.get('http://localhost:3001/getPostById/' + id)
        .then(res=>{
            console.log(id);
            console.log(res);
            setTitle(res.data.title);
            setDesc(res.data.desc);
            setFile(res.data.file);
        })
        .catch(err=>console.log("err"))

    },[]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(title + " " + desc + " ");
        const formData = new FormData();
        formData.append('title', title);
        formData.append('desc', desc);
        if(newFile)
        formData.append('file', newFile);
        else
        formData.append('file',file);
        // console.log(formData.get('title') + " " + formData.get('desc'))

        // console.log(formData.title);
        console.log(formData.get('desc'));
        axios.put(`http://localhost:3001/editPost/${id}`, formData)
            .then(res => {
                console.log(res)
                if (res.data == "Updated Successfully")
                    navigate("/home");
            })
            .catch(err => console.log(err))

    }
    return (
        <div className='row d-flex justify-content-center mt-5'>
            <form className=' col-sm-5 ' onSubmit={handleSubmit}>
                <h1>Edit Your Post</h1>
                <input type="text" className="form-control title mt-2" placeholder='Enter Title' onChange={(e) => setTitle(e.target.value)} value={title}/>
                <textarea className="form-control desc mt-2" rows="10" cols="50" placeholder='Enter Description' onChange={(e) => setDesc(e.target.value)} value={desc}></textarea>
                <input type="file" className="form-control-file col-12 mt-2" id="exampleFormControlFile1" onChange={(e) => setNewFile(e.target.files[0])}  />
                <button type="submit" className="btn btn-success col-12 my-2 " >Post</button>

            </form>
            {/* <h1>hello</h1> */}
        </div>
    )
}
