import { useState } from "react"
import { loginData } from '../../api/services';
import { useNavigate } from "react-router-dom";
import {getAuthToken, setAuthToken } from "./authToken"
import Swal from 'sweetalert2';

import logo from "../../../standalone_assets/images/Anandam.png"

const login = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [email, setEmail] = useState('');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [password, setPassword] = useState('');
  // eslint-disable-next-line react-hooks/rules-of-hooks, no-unused-vars
  const [error, setError] = useState(null);
  const submitLogin = async () => {
    // api call
    try {
      const userData = await loginData(email, password);
      if (userData.status === true) {
        Swal.fire({
          position: 'top-right',
          icon: 'success',
          toast: true,
          title: userData.message,
          showConfirmButton: false,
          showCloseButton: true,
          timer: 1500,
        });
        setAuthToken(userData.data.token);
        navigate('/auth/dashboard')
        window.location.reload();
        
        

      } else {
        Swal.fire({
          position: 'top-right',
          icon: 'error',
          toast: true,
          title: userData.message,
          showConfirmButton: false,
          showCloseButton: true,
          timer: 1500,
        });
      }
     } catch (error) {
      console.error('Login error ', error);
      setError(error);
    }
  };
  return (
    <section className="section register flex-column align-items-center justify-content-center ">
        <div className="main-container">
        {/* <div className="row justify-content-center"> */}
          <div className="row">
            <div style={{marginLeft:'18%'}} className="col-lg-5 col-md-5 d-flex flex-column align-items-center justify-content-center ">
              <div className="d-flex justify-content-center">
                <a
                  href="index.html"
                  className=" d-flex align-items-center w-auto"
                >
                  {/* <img style={{width: '100%', height:'100%', marginBottom:'0px' }}  src={logo} alt="" /> */}
                </a>
              </div>
              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                  <h5 className="card-title text-center pb-0 fs-4">
                      Login to Your Account
                    </h5>
                  <img style={{width: '100%', height:'100%', marginBottom:'0px' }}  src={logo} alt="" />
                    <hr />
                    <p className="text-center small">
                      Enter your Username & password to login
                    </p>
                  </div>
                  <form className="row g-3 needs-validation">
                    <div className="col-12">
                      <label className="form-label">Username</label>
                      <div className="input-group has-validation">
                        {/* <span className="input-group-text rounded-4" id="inputGroupPrepend">
                          @
                        </span> */}
                        <input
                          type="text"
                          name="username"
                          className="form-control rounded-4"
                          id="yourUsername"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="invalid-feedback">
                          Please enter your username.
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control rounded-4"
                        id="yourPassword"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 rounded-4"
                        onClick={submitLogin}
                        type="button"
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};


export default login;
