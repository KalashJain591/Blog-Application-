import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { userContext } from './App';

export default function SinglePost() {
    const { id } = useParams();

    console.log(id);
    const [singlePost, setPost] = useState({});
    const [flag, setFlag] = useState(1);
    const navigate = useNavigate()
    const [popup, setpopup] = useState(true);
    const user = useContext(userContext);

    useEffect(() => {
        axios.get('http://localhost:3001/getPostById/' + id)
            .then(res => { console.log(res.data); setPost(res.data) })
            .catch(err => console.log(err))

    }, [])




    const onDelete = () => {
        axios.delete(`http://localhost:3001/deletePost/${id}`)
            .then(res => {
                console.log(res)
                if (res.data == "Deleted Successfully")
                    navigate('/home')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='container  '>
            <h1 className='text-center my-2'>{singlePost.title}</h1>
            <div className='row '>
                <div className='col-lg-6 col-12'>
                    <img className='container' src={`http://localhost:3001/Images/${singlePost.file}`}></img>
                </div>
                <div className='col-lg-6 col-12'>
                    <p className='my-2'>{singlePost.desc}</p>

                    {
                        user.email == singlePost.email ?
                            <div className='d-flex justify-content-evenly'>
                                <NavLink to={`/editPost/${id}`} ><button className='btn btn-lg bg-success mx-2'>Edit Your Post </button></NavLink>

                                <button type="button" class="btn btn-lg btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Delete Your Post
                                </button>


                                <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Are you Sure ?</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                This action will Delete your post Permanently
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-primary" onClick={onDelete} data-bs-dismiss="modal">Yes</button>
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> :
                            <></>
                    }


                </div>

            </div>

        </div>


    )
}
