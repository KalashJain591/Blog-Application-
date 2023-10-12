import axios from 'axios';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Forgotpass() {

    const [email, setEmail] = useState();
    const Sendmail = () => {
        // e.preventDefault();
        console.log("haa ha");
        console.log(email);
        if (!email) {
            alert("Enter the Registered mail ID");
            return;
        }
        // axios.post('http://localhost:3001/user/forgotPass', { email })
        axios.post('/api/user/forgotPass', { email })
            .then(res => {
                if(res.data=="RESET mail Send Successfully"){
                    alert("RESET mail Send Successfully on the Registered Mail");
                }
                else{
                    alert("Some Error occured ! Try again ");
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <section className="vh-100 d-flex a;o" style={{ backgroundColor: "#eee" }}>
                <div className="container ">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Forgot Password</p>
                                            <form className="mx-1 mx-md-4">
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="email" id="form3Example3c" className="form-control" onChange={e => setEmail(e.target.value)} />
                                                        <label className="form-label" for="form3Example3c">Enter Your Email</label>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className='row d-flex justify-content-center'>
                                                <button className=' col-5  btn btn-md btn-primary' onClick={Sendmail}>Submit</button></div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
