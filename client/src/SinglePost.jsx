import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { userContext } from './App';
import './Singlepost.css'
export default function SinglePost() {
    const { id } = useParams();

    console.log(id);
    const [singlePost, setPost] = useState({ likes: [] });
    const [flag, setFlag] = useState(1);
    const[stats, setStatus] = useState(0);
    const navigate = useNavigate()
    const [popup, setpopup] = useState(true);
    const { user } = useContext(userContext);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    console.log(user);
    useEffect(() => {
        axios.get('http://localhost:3001/post/getPostById/' + id)
            .then(res => { console.log(res.data); setPost(res.data) })
            .catch(err => console.log(err))

    }, [stats])

    const getDte=(T)=>{
        // DT=new Date(DT);
        console.log(T);
        let DT=new Date(T);
        let s=DT.getDate()+" "+months[DT.getMonth()]+" "+ DT.getFullYear();
        console.log(s);
            
            return s;
        }

    const Like = () => {
        if (user == "No Token Found") {
            alert("login First");
            return;
        }
        if(singlePost.likes.includes(user.email)){
            alert("you already liked");
            return;
        }
        axios.put(`http://localhost:3001/post/likePost/${id}`, { email: user.email })
            .then(res => { console.log(res); setStatus(!stats); })
            .catch(err => console.log(err))
    }

    const unLike = () => {
        if (user == "No Token Found") {
            alert("login First");
            return;
        }
        if(!singlePost.likes.includes(user.email)){
            alert("you can only Unlike Post and do not Dislike someone's Work");
            return;
        }
        axios.put(`http://localhost:3001/post/unlikePost/${id}`, { email: user.email })
            .then(res => { console.log(res); setStatus(!stats); })
            .catch(err => console.log(err))
    }

    const onDelete = () => {
        axios.delete(`http://localhost:3001/post/deletePost/${id}`)
            .then(res => {
                console.log(res)
                if (res.data == "Deleted Successfully")
                    navigate('/')
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='container-fluid '>
            <h1 className='text-center my-2'>{singlePost.title}</h1>
            <hr color="green" />

            <div className=" d-flex flex-wrap  align-items-center">
                <div className=" d-flex  col-lg-4 col-xs-12 m-2">
                    <img src="https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo" alt="Author's Image" width="48" height="48" className='m-2 rounded' />
                    <div className="author-details mx-2">
                        <h3>Author: {singlePost.name}</h3>
                        <p>{singlePost.name} is a passionate writer with a love for technology and creativity.</p>

                        <a href={`mailto:${singlePost.email}`}>Connect with the Author</a>
                    </div>
                </div>
                <div className="published-date col-lg-4 col-xs-12 m-2 text-center     ">
                    <p>Published on   : {getDte(singlePost.createOn)}</p>
                    <p>Updated   on : {getDte(singlePost.updateOn)}</p>
                </div>

                <div className=" text-center  col-lg-3 col-xs-12 m-2" >

                    {/* <hr /> */}
                    <div className='d-flex '>
                        <img width="25" height="25" src="https://img.icons8.com/emoji/48/000000/heart-suit.png" alt="heart-suit" />
                        <p >{singlePost.likes.length} Likes </p>
                        <div>
                        <img width="25" height="25" src="https://img.icons8.com/ios/50/comments--v1.png" alt="comments--v1" className='mx-2'/>
                        <span>Comments</span>
                        </div>
                        <div className='  ms-auto '>
                            <img onClick={Like} width="25" height="25" src="https://img.icons8.com/ios-glyphs/30/thumb-up--v1.png" alt="thumb-up--v1" />
                            <img onClick={unLike} width="25" height="25" src="https://img.icons8.com/ios-glyphs/30/thumbs-down.png" alt="thumbs-down" />

                            <img width="25" height="25" src="https://img.icons8.com/ios-glyphs/30/share-rounded.png" alt="share-rounded" />
                            <a href="#">Share</a>

                        </div>
                    </div>
                    {/* <hr/> */}
                </div>
            </div>

            <hr color="green" />

            <div className='row '>
                <div className='  d-flex justify-content-center my-5'>
                    <img className=' img-fluid rounded' src={singlePost.imgLink}></img>
                </div>
                <div className='col-10 container' dangerouslySetInnerHTML={{ __html: singlePost.desc }}>
                </div>
                <div className=' col-6 offset-6 '>
                    {
                        user.email == singlePost.email ?
                            <div className='d-flex justify-content-evenly  '>
                                <NavLink to={`/editPost/${id}`} ><button className='btn btn-md bg-success mx-2'>Edit Your Post </button></NavLink>

                                <button type="button" className="btn btn-md  btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Delete Your Post
                                </button>


                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Are you Sure ?</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                This action will Delete your post Permanently
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-primary" onClick={onDelete} data-bs-dismiss="modal">Yes</button>
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
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
