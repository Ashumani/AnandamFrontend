import React, { useState } from "react";
import { loginData } from "../../api/services";
import { useNavigate } from "react-router-dom";
import { setAuthToken, setUserId } from "./authToken";
import Swal from "sweetalert2";

import logo from "../../../standalone_assets/images/Anandam.png";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitLogin = async (e) => {
    e.preventDefault();

    setError(null);

    if (!email.trim()) {
      Swal.fire({
        position: "top-right",
        icon: "warning",
        toast: true,
        title: "Please enter your username",
        showConfirmButton: false,
        timer: 1800,
      });
      return;
    }

    if (!password.trim()) {
      Swal.fire({
        position: "top-right",
        icon: "warning",
        toast: true,
        title: "Please enter your password",
        showConfirmButton: false,
        timer: 1800,
      });
      return;
    }

    try {
      setLoading(true);

      const userData = await loginData(email, password);

      if (userData.status === true) {
        Swal.fire({
          position: "top-right",
          icon: "success",
          toast: true,
          title: userData.message,
          showConfirmButton: false,
          showCloseButton: true,
          timer: 1500,
        });

        setAuthToken(userData.data.token);
        setUserId(userData.data.id);

        navigate("/auth/dashboard");

        window.location.reload();
      } else {
        Swal.fire({
          position: "top-right",
          icon: "error",
          toast: true,
          title: userData.message,
          showConfirmButton: false,
          showCloseButton: true,
          timer: 1800,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error);

      Swal.fire({
        position: "top-right",
        icon: "error",
        toast: true,
        title: "Unable to login. Please try again.",
        showConfirmButton: false,
        showCloseButton: true,
        timer: 1800,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="an-login-page">

      {/* Background Decorations */}
      <div className="an-login-shape an-shape-one"></div>
      <div className="an-login-shape an-shape-two"></div>
      <div className="an-login-circle an-circle-one"></div>
      <div className="an-login-circle an-circle-two"></div>

      <div className="an-login-container">

        {/* Left Section */}
        <div className="an-login-left">

          <div className="an-login-brand">
            <img src={logo} alt="Anandam" />
          </div>

          <div className="an-login-content">

            <span className="an-login-eyebrow">
              <span></span>
              EPF • ESIC • Labour Compliance
            </span>

            <h1>
              Simplifying your
              <strong> compliance journey.</strong>
            </h1>

            <p>
              Manage your EPF, ESIC and compliance requirements with
              professional support and a streamlined digital experience.
            </p>

            <div className="an-login-features">

              <div className="an-login-feature">
                <div className="an-feature-icon">
                  <i className="fa fa-shield"></i>
                </div>

                <div>
                  <h4>Secure Access</h4>
                  <p>Your information is protected.</p>
                </div>
              </div>

              <div className="an-login-feature">
                <div className="an-feature-icon">
                  <i className="fa fa-file-text-o"></i>
                </div>

                <div>
                  <h4>Compliance Management</h4>
                  <p>Manage your compliance activities efficiently.</p>
                </div>
              </div>

              <div className="an-login-feature">
                <div className="an-feature-icon">
                  <i className="fa fa-users"></i>
                </div>

                <div>
                  <h4>Professional Support</h4>
                  <p>Expert assistance when you need it.</p>
                </div>
              </div>

            </div>
          </div>

          <div className="an-login-left-footer">
            © {new Date().getFullYear()} Anandam. All rights reserved.
          </div>

        </div>

        {/* Right Section */}
        <div className="an-login-right">

          <div className="an-login-card">

            <div className="an-mobile-logo">
              <img src={logo} alt="Anandam" />
            </div>

            <div className="an-login-heading">
              <div className="an-welcome-icon">
                <i className="fa fa-user"></i>
              </div>

              <div>
                <h2>Welcome Back</h2>
                <p>Sign in to access your account</p>
              </div>
            </div>

            <form onSubmit={submitLogin}>

              {/* Username */}
              <div className="an-form-group">

                <label htmlFor="yourUsername">
                  Username
                </label>

                <div className="an-input-wrapper">

                  <i className="fa fa-user an-input-icon"></i>

                  <input
                    type="text"
                    id="yourUsername"
                    name="username"
                    placeholder="Enter your username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="username"
                  />

                </div>
              </div>

              {/* Password */}
              <div className="an-form-group">

                <div className="an-password-label">
                  <label htmlFor="yourPassword">
                    Password
                  </label>

                  <button
                    type="button"
                    className="an-forgot-btn"
                    onClick={() => {
                      Swal.fire({
                        icon: "info",
                        title: "Forgot Password?",
                        text: "Please contact the administrator to reset your password.",
                        confirmButtonText: "OK",
                      });
                    }}
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="an-input-wrapper">

                  <i className="fa fa-lock an-input-icon"></i>

                  <input
                    type={showPassword ? "text" : "password"}
                    id="yourPassword"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="an-password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    <i
                      className={
                        showPassword
                          ? "fa fa-eye-slash"
                          : "fa fa-eye"
                      }
                    ></i>
                  </button>

                </div>
              </div>

              {/* Remember */}
              <div className="an-login-options">

                <label className="an-checkbox">

                  <input type="checkbox" />

                  <span className="an-checkmark"></span>

                  <span>Remember me</span>

                </label>

              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="an-login-button"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="an-spinner"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <i className="fa fa-arrow-right"></i>
                  </>
                )}

              </button>

            </form>

            {/* Security */}
            <div className="an-secure-login">

              <i className="fa fa-shield"></i>

              <div>
                <strong>Secure Login</strong>
                <span>
                  Your login information is securely processed.
                </span>
              </div>

            </div>

          </div>

          <div className="an-login-help">
            Need assistance?{" "}
            <a href="mailto:anand.esipf@gmail.com">
              Contact Support
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;