import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';

export default function Resetpass() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPass, setconfirmPass] = useState();
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);
  const userValid = () => {
    // axios.get(`http://localhost:3001/user/check/${id}/${token}`)
    axios.get(`/api/user/check/${id}/${token}`)
      .then(res => {
        console.log(res);
        if (res.data === "USER VALID")
          setValid(true);
        else
          setValid(false);
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    userValid();
  }, [])

  // console.log(id + " " + token);
  const updatePass = () => {
    if (password != "" && confirmPass != "" && password === confirmPass) {
      // axios.post(`http://localhost:3001/user/updatePass/${id}/${token}`, { password })
      axios.post(`/api/user/updatePass/${id}/${token}`, { password })
        .then(res  => {
          console.log(res);
          if (res.data == "UPDATED PASSWORD"){
             alert("Congratulations ! password Updated");
            // navigate('/login');
          }
          else {
            alert("Updation Failure ! Please Try Again")
          }
        })
        .catch(err  => { console.log("hello erro"); alert("Updation Failure ! Please Try Again") })
    }
    else {
      alert("Invalid or Mismatching details");
    }
  }

  return (
    <div>
      <div>
        <section className="vh-100 d-flex a;o" style={{ backgroundColor: "#eee" }}>
          <div className="container ">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black" style={{ borderRadius: "25px" }}>
                  <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                      {
                        valid ?
                          <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Update Your Password</p>
                            <form className="mx-1 mx-md-4">
                              <div className="d-flex flex-row align-items-center mb-4">
                              </div>
                              <div className="d-flex flex-row align-items-center mb-4">
                                <div className="form-outline flex-fill mb-0">
                                  <input type="password" id="form3Example3c" className="form-control" onChange={e => setPassword(e.target.value)} />
                                  <label className="form-label" for="form3Example3c">Enter Your Password</label>
                                </div>
                              </div>

                              <div className="d-flex flex-row align-items-center mb-4">                                                    <div className="form-outline flex-fill mb-0">
                                <input type="password" id="form3Example3c" className="form-control" onChange={e => setconfirmPass(e.target.value)} />
                                <label className="form-label" for="form3Example3c">Confirm Your Password</label>
                              </div>
                              </div>
                              <div className='row d-flex justify-content-center'>
                                <button className=' col-5  btn btn-md btn-primary' onClick={updatePass}>Submit</button></div>
                            </form>

                          </div> :
                          <div>
                            <h1>Something Went Wrong !!</h1>
                            <NavLink to="/"><button className='btn btn-primary btn-lg'>Retry</button></NavLink>
                          </div>
                      }

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
