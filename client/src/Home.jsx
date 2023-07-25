import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import "./App"
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
    
    
        // Function to truncate the description to 3-4 lines
        function createNewStringWithWords(text, numWords) {
            const wordsArray = text.split(' ');
          
            if (wordsArray.length <= numWords) {
              // If the original string has equal or fewer words than the desired number,
              // return the original text as it is.
              return text;
            } else {
              // If the original string has more words than the desired number,
              // slice the array to get the specified number of words and join them back to form the new string.
              return wordsArray.slice(0, numWords).join(' ');
            }
          }
    
    return (
        <div className='container-fluid'>
            <h1 className='text-center'>Latest Blog Posts </h1>
            <div className='d-flex justify-content-center flex-wrap '>
                {
                    post.map(post => (
                        <div className='col-lg-3 col-md-10 m-3'>
                      
                        <div >
                            <h3 className='text-center '>{post.title}</h3>
                            <img className="img-fluid" style={{width:"100%", height:"350px"}} src={`http://localhost:3001/Images/${post.file}`}></img>
                            <p className='text-grey' style={{textAlign:"justify"}}>{createNewStringWithWords(post.desc, 25)}.....</p>
                        </div>
                        
                        <NavLink className='' to={`/singlePost/${post._id}`} style={{textDecoration:"none"}}> <div className='float-left'>
                            <button>Read More</button>
                            </div>
                            </NavLink>
                        </div>
                    ))
                }
            </div>
        </div>
       
    )
}
