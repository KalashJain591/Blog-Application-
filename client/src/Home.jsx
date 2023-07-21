import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

export default function Home() {
    // const [post, setPost] = useState({
    //     title:"",
    //     desc:"",
    //     file:"",
    // });
    // const [post, setPost] = useState({})=> This is invalid because we are intializing with empty object .
    const [post, setPost] = useState([]); // initialized with empty array , because fetched data is also an array of objects . And also map function only works on the array dataStructure 
    useEffect(() => {
        axios.get('http://localhost:3001/getPost')
            .then(posts => {
                console.log(posts);
                setPost(posts.data)
            })
            .catch(err => console.log(err))
    }, [])
    
    return (
        <div className='container-fluid'>
            <h1 className='text-center'>Latest Blog Posts </h1>
            <div className='d-flex flex-row justify-content-center'>
                {
                    post.map(post => (
                        <NavLink to={`/singlePost/${post._id}`}>
                        <div className='col-12'>
                            <h3 className='text-center'>{post.title}</h3>
                            <img className='container' src={`http://localhost:3001/Images/${post.file}`}></img>
                            <p>{post.desc}</p>
                        </div>
                        </NavLink>
                    ))
                }
            </div>
        </div>
       
    )
}
