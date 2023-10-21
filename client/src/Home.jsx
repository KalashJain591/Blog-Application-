import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import "./App"
import BlogCard from './Blog/BlogCard';
export default function Home() {
   
    const [post, setPost] = useState([]); // initialized with empty array , because fetched data is also an array of objects . And also map function only works on the array dataStructure 
    useEffect(() => {
        axios.get('/api/post/getPost')
            .then(posts => {
                // console.log("ALL POST",posts); 
                setPost(posts.data)
            })
            .catch(err => console.log("ERR In ALL POST",err))
    }, [])




    return (

        <div className='container-fluid'>
            <h1 className='text-center'>Latest Blog Posts </h1>

            {/* {
                    post.map(post => (
                        <div className='col-lg-3 col-md-10 m-3'>
                      
                        <div>
                            <h3 className='text-center '>{post.title}</h3>
                            <img className="img-fluid" style={{width:"100%", height:"350px"}} src={post.imgLink}></img>
                            <p className='text-grey' style={{textAlign:"justify"}}>{createNewStringWithWords(post.displayText, 25)}.....</p>
                        </div>
                        
                        <NavLink className='' to={`/singlePost/${post._id}`} style={{textDecoration:"none"}}> <div className='float-left'>
                            <button>Read More</button>
                            </div>
                            </NavLink>
                        </div>
                    ))
                }
            </div>  */}
            <div className='d-flex justify-content-evenly flex-wrap'>
                
                {post.map((p) => {

                    return (<BlogCard data={p} />);
                })}


            </div>
        </div>
    )
}
