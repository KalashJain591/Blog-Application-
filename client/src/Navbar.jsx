import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from './App'
import axios from 'axios';

export default function Navbar(props) {
    // console.log(user );
    const {user} = useContext(userContext);
    const navigate = useNavigate();
    // console.log(user);
    const handleLogout = () => {
        // axios.get('http://localhost:3001/auth/logout')
        axios.get('/api/auth/logout')
        .then(res=>console.log("getting out "))
        .catch(err=>console.log(err))
        
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
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Blog App</a>
                    <div className='align-items-center'>
                        <Link className="navbar-brand" to="/"> Home</Link>
                        {
                            user.name?
                            <Link className="navbar-brand" to="/create"> Create</Link>
                            :
                            <></>

                        }
                         <Link className="navbar-brand" to="#"> Contact</Link>
                    </div>

                    {

                        user.name ?
                            <div>
                                <Link className="navbar-brand" onClick={handleLogout}> Logout</Link>
                            </div>
                            :
                            <div>
                                <Link className="navbar-brand" to="/register"> register/LogIn</Link>
                            </div>

                    }




                </div>
            </nav>
        </div>
    )
}
