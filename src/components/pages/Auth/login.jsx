import { useState } from "react"
import { loginData } from '../../api/services';
import { useNavigate } from "react-router-dom";
import {getAuthToken, setAuthToken } from "./authToken"
import Swal from 'sweetalert2';

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
    <div className="main-container">
      {/* <section className="section register d-flex flex-column align-items-center justify-content-center py-4"> */}
      <section className="section register flex-column align-items-center justify-content-center py-4">
        <div className="main-container">
        {/* <div className="row justify-content-center"> */}
          <div className="row">
            <div className="col-lg-5 col-md-6 d-flex flex-column align-items-center justify-content-center py-4">
              <div className="d-flex justify-content-center py-4">
                <a
                  href="index.html"
                  className="logo d-flex align-items-center w-auto"
                >
                  <img src="assets/img/logo.png" alt="" />
                </a>
              </div>
              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">
                      Login to Your Account
                    </h5>
                    <p className="text-center small">
                      Enter your email & password to login
                    </p>
                  </div>
                  <form className="row g-3 needs-validation">
                    <div className="col-12">
                      <label className="form-label">Email</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">
                          @
                        </span>
                        <input
                          type="text"
                          name="username"
                          className="form-control"
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
                        className="form-control"
                        id="yourPassword"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100"
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
    </div>
  );
};


export default login;
