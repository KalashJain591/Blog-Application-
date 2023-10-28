import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { userContext } from './App';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy } from 'react-scroll';
import './Singlepost.css'

import CommetComp from './CommetComp';

export default function SinglePost() {
    const { id } = useParams();

    // console.log(id);
    const [singlePost, setPost] = useState({ likes: [] });
    const [flag, setFlag] = useState(1);
    const [stats, setStatus] = useState(0);
    const navigate = useNavigate()
    const [popup, setpopup] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [comments, setComments] = useState([]);

    // const [currComment,AddingComment]=useState("");
    const { user } = useContext(userContext);
    // console.log(user);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // console.log(user);
    useEffect(() => {
        // axios.get('http://localhost:3001/post/getPostById/' + id)
        axios.get('/api/post/getPostById/' + id)
            // .then(res => { console.log(res.data); setPost(res.data) })
            .then(res => { setPost(res.data); setComments(res.data.comments) })
            .catch(err => console.log(err))

    }, [stats])

    const getDte = (T) => {
        // DT=new Date(DT);
        // console.log(T);
        let DT = new Date(T);
        let s = DT.getDate() + " " + months[DT.getMonth()] + " " + DT.getFullYear();
        // console.log(s);

        return s;
    }

    const Like = () => {
        if (user == "No Token Found") {
            navigate('/login');
            return;
        }
        if (singlePost.likes.includes(user.email)) {
            alert("you already liked");
            return;
        }
        // axios.put(`http://localhost:3001/post/likePost/${id}`, { email: user.email })
        axios.put(`/api/post/likePost/${id}`, { email: user.email })

            .then(res => { console.log(res); setStatus(!stats); })
            .catch(err => console.log(err))
    }

    const unLike = () => {
        if (user == "No Token Found") {
            navigate('/login');
            return;
        }
        if (!singlePost.likes.includes(user.email)) {
            alert("you can only Unlike Post and do not Dislike someone's Work");
            return;
        }
        // axios.put(`http://localhost:3001/post/unlikePost/${id}`, { email: user.email })
        axios.put(`/api/post/unlikePost/${id}`, { email: user.email })

            .then(res => { console.log(res); setStatus(!stats); })
            .catch(err => console.log(err))
    }

    const onDelete = () => {
        // axios.delete(`http://localhost:3001/post/deletePost/${id}`)
        axios.delete(`/api/post/deletePost/${id}`)

            .then(res => {
                // console.log(res)
                if (res.data == "Deleted Successfully")
                    navigate('/')
            })
            .catch(err => console.log(err))
    }
    const handleSetActive = (to) => {
        console.log(to);
    };

    const scrollToTop = () => {
        scroll.scrollToTop();
    };

    const addComment = () => {

        if (user == "No Token Found") {
            navigate('/login');
            return;
        }

        console.log(inputValue);
        axios.post(`/api/post/addcomment/${id}`, { name: user.name, email: user.email, comment: inputValue })
            .then(res => { console.log(res); window.location.reload(false); })
            .catch(err => console.log("eror in Comment " + err))
    }
    // console.log(inputValue);
    return (
        <div className='container-fluid '>
            <h1 className='text-center my-2'>{singlePost.title}</h1>
            <hr color="green" />

            <div className=" d-flex flex-wrap  align-items-center">
                <div className=" d-flex  col-lg-4 col-xs-12 m-2">

                    <img width="48" height="48" src="https://img.icons8.com/pastel-glyph/64/person-male--v3.png" alt="Author's Image" className='m-2 rounded' />

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
                        <p className='mx-2' >{singlePost.likes.length} Likes </p>
                        <div>

                            <img width="25" height="25" src="https://img.icons8.com/ios/50/comments--v1.png" alt="comments--v1" className='mx-2' />
                            <Link
                                activeClass="active"
                                to="test1"
                                spy={true}
                                smooth={true}
                                // offset={500}
                                duration={200}
                                style={{ cursor: "pointer" }}

                            > Comment</Link>
                            {/* <span></span> */}
                        </div>
                        <div className=' mx-2' style={{ cursor: "pointer" }}>
                            <img onClick={Like} width="25" height="25" src="https://img.icons8.com/ios-glyphs/30/thumb-up--v1.png" alt="thumb-up--v1" />
                            <img onClick={unLike} width="25" height="25" src="https://img.icons8.com/ios-glyphs/30/thumbs-down.png" alt="thumbs-down" />

                            {/* <img className='mx-2' width="25" height="25" src="https://img.icons8.com/ios-glyphs/30/share-rounded.png" alt="share-rounded" /> */}
                            <a href="#" className='mx-2'>Share</a>

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


            <div className='container ' name="test1">
                <section class="attractive-section">
                    {/* <img width="30" height="30" src="https://img.icons8.com/ios/50/speech-bubble--v1.png" alt="speech-bubble--v1"/> */}
                    <h4 className="text-center mx-2"> {comments.length} Comment</h4>
                </section>


                {/* <input type="text" id="commentInput" name="commentInput" onChange={(e) => { setInputValue(e.target.value) }} /> */}
                <div class="form-group">
                    <label for="exampleFormControlTextarea1"></label>
                    <textarea class="form-control " id="exampleFormControlTextarea1" rows="3" onChange={(e) => { setInputValue(e.target.value) }}></textarea>
                </div>

                <button className=" my-2 btn btn-lg btn-secondary" onClick={addComment}>Add Comment</button>
                {
                    comments.map((comm) => {
                        return <CommetComp data={comm} />;
                    })

                    // console.log(singlePost.comments)
                }
                {/* <CommetComp /> */}
            </div>

        </div>


    )
}
