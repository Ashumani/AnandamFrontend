import { useState } from "react"
import { loginData } from '../../api/services';
import { useNavigate } from "react-router-dom";
import { getAuthToken, setAuthToken } from "./authToken"
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
    <div className="container">
      {/* <section className="section register d-flex flex-column align-items-center justify-content-center py-4"> */}
      <section className="section register flex-column align-items-center justify-content-center ">
        <div className="row">
          <div id="contact" className="contact-us section" style={{ marginTop: '-80px' }}>
            <div className="container">

              <div className="row">
                <div className="col-lg-6 offset-lg-3">
                  <div className="section-heading wow fadeIn " data-wow-duration="1s" data-wow-delay="0.5s">
                    <h6>Login</h6>
                    <h4>Anandam Solution <em> &amp; </em> Services</h4>
                    <div className="line-dec"></div>
                  </div>
                </div>
                <div className="col-lg-10 mx-auto wow fadeInUp" style={{ marginTop: '80px'}} data-wow-duration="0.5s" data-wow-delay="0.25s">
                  <div className="col-lg-10 mx-auto wow fadeInUp" style={{ marginTop: '-99px' }} data-wow-duration="0.5s" data-wow-delay="0.25s">
                    <form id="contact" onSubmit={submitLogin} >
                      <div className="row">
                        <div className="fill-form">
                          <div className="row mb-3">
                            <div className="col-lg-6 mx-auto">
                              <fieldset>
                                <input
                                  type="text"
                                  name="username"
                                  id="name"
                                  placeholder="Username"
                                  autoComplete="on"
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                                />
                              </fieldset>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-lg-6 mx-auto">
                              <fieldset>
                                <input
                                  type="password"
                                  id="password"
                                  placeholder="Enter your password"
                                  onChange={(e) => setPassword(e.target.value)}
                                  autoComplete="on"
                                  required
                                />
                              </fieldset>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-3 mx-auto text-center">
                              <fieldset>
                                <button
                                  type="submit" // Change to submit to submit the form
                                  className="main-button"
                                  style={{ marginRight: '-220px' }}
                                >
                                  Login
                                </button>
                              </fieldset>
                            </div>
                            <div className="col-lg-3 mx-auto text-center">
                              <fieldset>
                                <button
                                  type="button"
                                  className="main-button"
                                  onClick={() => {/* Add your back logic here */ }} // Add back button logic
                                  style={{ marginLeft: '-220px' }}
                                >
                                  Back
                                </button>
                              </fieldset>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

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
