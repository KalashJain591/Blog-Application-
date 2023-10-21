import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { userContext } from './App';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { trackPromise } from 'react-promise-tracker';

export default function Login(props) {

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { googleAuth, isAuth } = useContext(userContext);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(username); 
        trackPromise(
            axios.post('/api/user/login', { username, email, password })
                .then(res => {
                    console.log(res.data)
                    if (res.data === "Login Successful") {
                        props.setauth(true);
                        navigate('/');
                    }
                    else {
                        setShowModal(true);
                        // alert("Some Error Occured, Please try again later");
                    }
                })
                .catch(err => console.log(err))
        );
    }

    // if(googleAuth)
    // {
    //     props.setauth(true);
    //     navigate('/')
    // }

    // const googleAuthentication = () => {
    //     window.open('http://localhost:3001/auth/google/callback', "_self");
    // }
    if (isAuth)
        navigate('/');

    return (
        <div>
            <section className="vh-100 d-flex ao" style={{ backgroundColor: "#eee" }}>
                <div className="container ">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Log In</p>

                                            <form className="mx-1 mx-md-4">

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" id="form3Example1c" className="form-control" onChange={e => setUsername(e.target.value)} />
                                                        <label className="form-label" for="form3Example1c">Your Name</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="email" id="form3Example3c" className="form-control" onChange={e => setEmail(e.target.value)} />
                                                        <label className="form-label" for="form3Example3c">Your Email</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example4c" className="form-control" onChange={e => setPassword(e.target.value)} />
                                                        <label className="form-label" for="form3Example4c">Password</label>
                                                    </div>
                                                </div>

                                                {/* <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" id="form3Example4cd" className="form-control" />
                                                        <label className="form-label" for="form3Example4cd">Repeat your password</label>
                                                    </div>
                                                </div> */}



                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="button" className="btn btn-primary btn-sm mx-2" onClick={handleSubmit}>Log In</button>
                                                    {/* <button type="button" className="btn btn-primary btn-sm mx-2" onClick={googleAuthentication}>Google login</button> */}
                                                </div>
                                                <div className='d-flex justify-content-evenly'>
                                                    <NavLink to="/register"  > <p style={{ textDecoration: "underline", color: "blue" }}>New user ?</p></NavLink>
                                                    <NavLink to="/forgot-password">
                                                        <p style={{ textDecoration: "underline", color: "blue" }}>Forgot Password ?</p></NavLink></div>
                                                {/* <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <Link to='/register'><button type="button" className="btn btn-primary btn-sm"> Sign Up</button>
                                                    </Link></div> */}

                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                {/* <Modal.Header closeButton> */}
                <Modal.Title className='text-center m-2'>OOPS!! Incorrect Password, Please Retry or Try again later</Modal.Title>
                {/* </Modal.Header> */}
                <Modal.Footer>
                    {/* <NavLink to='/'><Button variant="primary">
                        Go to Home Page
                    </Button></NavLink> */}
                </Modal.Footer>
            </Modal>
        </div>
    )
}
