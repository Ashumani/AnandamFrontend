// import React from "react";
// import { Link } from "react-router-dom";
import { togglesidebar } from "../assets/js/custome.js";
import profileImg from "../assets/img/3.jpg";

import logo from "../standalone_assets/images/Anandam.png"
import { useState, useEffect } from "react"
// import { Link } from "react-router-dom";
import { fetchAllEmployer, getUser } from "./api/services.js";
import { setEstId, getEstId, deleteEstId, getErId } from "./pages/Auth/authToken.js";
import Sidebar from "./sidebar.jsx";
import { useSidebar } from './SidebarContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";


const Header = () => {

  const { setShowAll } = useSidebar();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState('');
  const [selectedKey, setSelectedKey] = useState('');
  const [items, setItems] = useState([]);
  const [currentUser, setCurrentUser] = useState({})
  const navigate = useNavigate();
  // const [reload, setReload] = useState(true);
  useEffect(() => {
    const fetchData = async () => {

      try {
        // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint

        const user = await getUser();
        if (user.status === true) {
          setCurrentUser(user)
        const response = await fetchAllEmployer();
        setItems(response.data)
        const selectedItem = response.data.find(item => item.est_epf_id === getEstId());
        setSelectedKey(selectedItem.est_name);
        setLoading(false);


        } else {
          Swal.fire({
            title: user.message,
            icon: 'error',
            confirmButtonText: 'Okay'
          });
          Navigate('/login')
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
        setLoading(false);
        Swal.fire({
          title: error.message,
          icon: 'error',
          confirmButtonText: 'Okay',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login'); // Redirect to the home page
            location.reload();  
          }
        });
        
      }
    };

    if (getEstId() != "All" && getEstId() != null) {

      handleChange2({ "target": { "value": getEstId() } })

    } else {
      setShowAll(false);
    }

    fetchData();

  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedId(value);
    if (value === "All") {
      deleteEstId();
      setSelectedKey(null)
      setShowAll(false);

      navigate('/auth/dashboard');
    } else {

      // navigate(window.location.pathname)
      window.location.reload();
      const selectedItem = items.find(item => item.est_epf_id === value);

      if (selectedItem) {
        setSelectedKey(selectedItem.est_name);// Update selectedKey with item's key
        setEstId(value, selectedItem.id);


      }

      setShowAll(true);
    }
  };

  const handleChange2 = (e) => {
    const value = e.target.value;
    setSelectedId(value);
    if (value === "All") {
      deleteEstId();
      setSelectedKey(null)
      setShowAll(false);
      navigate('/auth/dashboard');
    } else {

      const selectedItem = items.find(item => item.est_epf_id === value);
      // window.location.reload();
      if (selectedItem) {
        setSelectedKey(selectedItem.est_name);// Update selectedKey with item's key
        setEstId(value, selectedItem.id);

      }

      setShowAll(true);
    }
  };




  return (
    <div>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <a href="/auth/dashboard" className="logo d-flex align-items-center">
            {/* <img src="assets/img/logo.png" alt="" /> */}
            <img className="d-none d-lg-block main_logo" style={{ width: '80%', "max-height": "250px" }} src={logo} alt="" />
            {/* <span className="d-none d-lg-block">AnanDam</span> */}
          </a>
          <i className="bi bi-list toggle-sidebar-btn" onClick={togglesidebar}></i>
        </div>
        <div className="dropdown">

          <select className="btn btn-sm btn-light dropdown-toggle dropdown-toggle-split ml-4 " onChange={handleChange} id={selectedKey} value={selectedId}>
            <option value="All">All</option>
            {items.map((item) => (
              <option key={item.id} value={item.est_epf_id}>
                {item.est_name} - {item.est_epf_id}

              </option>
            ))}
          </select>
          {/* {selectedId && <p>Selected ID: {selectedId} Selected Key: {selectedKey}</p>} */}
        </div>
        {/* <div className="mt-2 ms-4">{selectedKey && <h5> {selectedKey}</h5>}</div> */}
        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle " href="#">
                <i className="bi bi-search"></i>
              </a>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon"
                href="#"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-bell"></i>
                <span className="badge bg-primary badge-number">4</span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                  You have 4 new notifications
                  <a href="#">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      View all
                    </span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-exclamation-circle text-warning"></i>
                  <div>
                    <h4>Lorem Ipsum</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>30 min. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-x-circle text-danger"></i>
                  <div>
                    <h4>Atque rerum nesciunt</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>1 hr. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-check-circle text-success"></i>
                  <div>
                    <h4>Sit rerum fuga</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>2 hrs. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="notification-item">
                  <i className="bi bi-info-circle text-primary"></i>
                  <div>
                    <h4>Dicta reprehenderit</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>4 hrs. ago</p>
                  </div>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="dropdown-footer">
                  <a href="#">Show all notifications</a>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon"
                href="#"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-chat-left-text"></i>
                <span className="badge bg-success badge-number">3</span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="dropdown-header">
                  You have 3 new messages
                  <a href="#">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      View all
                    </span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="#">
                    <img
                      src="assets/img/messages-1.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>Maria Hudson</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>4 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="#">
                    <img
                      src="assets/img/messages-2.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>Anna Nelson</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>6 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="message-item">
                  <a href="#">
                    <img
                      src="assets/img/messages-3.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>David Muldon</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>8 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className="dropdown-footer">
                  <a href="#">Show all messages</a>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="#"
                data-bs-toggle="dropdown"
              >
                <img
                  src={profileImg}
                  alt="Profile"
                  className="rounded-circle"
                />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  {currentUser.name}
                </span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6> {currentUser.name}</h6>
                  <span>Web Designer</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="users-profile.html"
                  >
                    <i className="bi bi-person"></i>
                    <span>My Profile</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="users-profile.html"
                  >
                    <i className="bi bi-gear"></i>
                    <span>Account Settings</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="pages-faq.html"
                  >
                    <i className="bi bi-question-circle"></i>
                    <span>Need Help?</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="#"
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
