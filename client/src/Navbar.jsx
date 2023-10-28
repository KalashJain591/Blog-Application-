import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from './App'
import axios from 'axios';
import './NavBar.css'
export default function Navbar(props) {

    // console.log(user );
    const { user } = useContext(userContext);
    const navigate = useNavigate();
    // console.log(user);
    const handleLogout = () => {
        // axios.get('http://localhost:3001/auth/logout')
        axios.get('/api/auth/logout')
            .then(res => console.log("getting out "))
            .catch(err => console.log(err))

        // axios.get('http://localhost:3001/user/logout')
        axios.get('/api/user/logout')

            .then(res => {
                if (res.data == "Logout Succesfully") {
                    window.location.href = "/login";
                    props.setauth(false);
                }
            })
            .catch(err => console.log(err))

    }

    return (
        <div className>

            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/" style={{ textDecoration: "none", fontSize: "1.5rem" }} >Blog App</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarScroll">
                        <ul class="navbar-nav  my-2 my-lg-0 navbar-nav-scroll" style={{ "--bs-scroll-height": "100px" }}>
                            <li class="nav-item">
                                {/* <a class="nav-link active" aria-current="page" href="#">Home</a> */}
                                <Link className="nav-link active" to="/"> Home</Link>
                            </li>
                            <li class="nav-item">
                                {/* <a class="nav-link active" aria-current="page" href="#">Contact</a> */}
                                <Link className="nav-link active" to="/About"> About</Link>
                            </li>
                            <li>
                            
                            {
                                user.name ?
                                    <Link className="nav-link active" to="/create"> Create</Link>
                                    :
                                    <Link className="nav-link active" to="/login"> Create</Link>

                            }
                            </li>

                        </ul>
                        <form class="ms-auto ">

                            {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
                            {

                                user.name ?
                                    <>
                                        <Link className="text-center" onClick={handleLogout} style={{ textDecoration: "none", fontSize: "1.25rem", color: "white" }} to="/register"><button className="my-button">Logout </button></Link></>

                                    :
                                    <>
                                        <Link className="text-center" style={{ textDecoration: "none", fontSize: "1.25rem", color: "white" }} to="/register"><button className="my-button">Register/Login </button></Link></>


                                // <Link className="loginButton text-center" style={{ textDecoration: "none", fontSize: "1.25rem", color: "white" }} to="/register"> register/Login </Link>


                            }
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}
