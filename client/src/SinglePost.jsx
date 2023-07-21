import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function SinglePost() {
    const {id}=useParams();
    
    // console.log(id);
    const [singlePost, setPost] = useState({});
    const [flag, setFlag] = useState(1);
    useEffect(()=>{
        axios.get('http://localhost:3001/getPostById/'+id)
            .then(res=>{console.log(res.data);setPost(res.data)})
            .catch(err => console.log(err))

    },[])


    return (
        <div className='container-fluid'>
            {
                flag ?
                    <div className=''>
                        <h1 className='text-center'>{singlePost.title}</h1>
                        <img className='container d-flex ' src={`http://localhost:3001/Images/${singlePost.file}`}></img>
                        <p>{singlePost.desc}</p>
                    </div>
                    :
                    <h1>Post Not Found</h1>
            }
        </div>
    )
}
