/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from "react"
import { getEstId, getErId } from "../Auth/authToken";
import { register, getAll, getById } from "../../api/services";
import Swal from 'sweetalert2';
import moment from 'moment-timezone';
import React, { useRef } from 'react';
const blogs = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, set_totalPages] = useState(1);

  // Get current items based on the current page
  const [currentItems, set_currentItems] = useState([]);
  const modalRef = useRef(null);

  const [name, set_name] = useState('');
  const [mobilenumber, set_mobilenumber] = useState('');
  const [email_id, set_email_id] = useState('');
  const [panNo, set_panNo] = useState('');
  const [gstNo, set_gstNo] = useState('');
  const [country, set_country] = useState('');
  const [username, set_username] = useState('');
  const [password, set_password] = useState('');
  const [role, set_role] = useState('');
  const [state_id, set_state_id] = useState('');
  const [city_id, set_city_id] = useState('');

  // const [employeeData, setEmployeeData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await getAllUser(1);
    };

    fetchData();

  }, []);

  const getAllUser = async () => {
    // api call

    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await getAll();
      if (response.status == true) {
        // setEmployeeData(response.data);

        // set_totalPages(Math.ceil(response.data.length / itemsPerPage));

        // // Get current items based on the current page
        // set_startIndex((currentPage - 1) * itemsPerPage);
        set_totalPages(Math.ceil(response.count / itemsPerPage));
        set_currentItems(response.data);


      }


    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
      setLoading(false);
    }
  };
  const getUserById = async (id) => {
    // api call

    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await getById(id);
      if (response.status == true) {
        // setEmployeeData(response.data);

        // set_totalPages(Math.ceil(response.data.length / itemsPerPage));

        // // Get current items based on the current page
        // set_startIndex((currentPage - 1) * itemsPerPage);
        set_totalPages(Math.ceil(response.count / itemsPerPage));
        set_currentItems(response.data);


      }


    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
      setLoading(false);
    }
  };


  const addUser = async () => {
    // api call

    try {

      let params = {
        "name": name,
        "mobilenumber": mobilenumber,
        "email_id": email_id,
        "panNo": panNo,
        "gstNo": "1234567",
        "country": "India",
        "username": username,
        "password": password,
        "role": 1,
        "state_id": "21",
        "city_id": "22",
        "punch_status": false
      }
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await register(params);
      if (response.status == true) {

        Swal.fire({
          title: response.message,
          icon: 'success',
          confirmButtonText: 'Okay'
        });

        closeModal()
        await getAll(1);

      }else{
        Swal.fire({
          title: response.message,
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }


    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
      setLoading(false);
    }
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getAll(pageNumber);

  };

  const closeModal = () => {
    var modal = document.getElementById('employerModel');
    var bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();
  };

  const openModal = () => {
    var modal = document.getElementById('employerModel');
    var bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
  };

  return (
    <div>

      <div className="main-container">
        <div className='main-title'>
          <h3>Users</h3>
        </div>
        <section className="section">
          <br />
          <div className="row">
            <div className="col-sm-2">
              <button
                type="file"
                className="btn btn-outline-primary btn-block rounded-4" onClick={openModal}> Add User</button>
            </div>

          </div>

          <div className="table-responsive mt-2">
            <table className="table table-striped table-sm table-hover text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Mobile No</th>
                  <th>Email Id</th>
                  <th>PAN</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Punch</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user, index) => (
                  <tr key={user.id}>
                    <th >{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.mobilenumber}</td>
                    <td>{user.email_id}</td>
                    <td>{user.panNo}</td>
                    <td>{user.username}</td>
                    <td>{user.password}</td>
                    <td>{user.punch_status ? "Active" : "InActive"}</td>
                    <td >{moment(user.createdAt).format('YYYY-MM-DD')}</td>
                    <td >{moment(user.updatedAt).format('YYYY-MM-DD')}</td>
                    <td>
                        <div className="d-flex align-items-center">
                          <button className="btn btn-light" onClick={() => { getUserById(user.id) }}>
                            <i className="bi bi-eye text-info"></i>
                          </button>
                          <button className="btn btn-light mx-1" onClick={() => { getUserById(user.id) }}>
                            <i className="bi bi-pencil-fill text-info"></i>
                          </button>
                          <button className="btn btn-light" disabled>
                            <i className="bi bi-trash text-danger"></i>
                          </button>
                        </div>
                      </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="pagination">
            <button className="btn btn-primary rounded-4"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                style={{ margin: '0 2px', backgroundColor: currentPage === index + 1 ? '#1e60aa' : 'white', border: '0px' }}
              >
                {index + 1}
              </button>
            ))}
            <button className="btn btn-primary rounded-4"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>


          <div className="modal fade bd-example-modal-xl" id="employerModel" tabIndex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <form>
                  <div className="modal-header">
                    <h5 className="modal-title">Add User</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body" style={{ color: 'black' }}>
                    <div className="row mb-3">
                      <div className="form-group col-sm">
                        <label htmlFor="epfNo" > Name</label>
                        <input type="text" className="form-control rounded-4" id="epfNo" required onChange={(e) => set_name(e.target.value)} value={name} />
                      </div>
                      <div className="form-group col-sm">
                        <label htmlFor="esicNo">Email Id</label>
                        <input type="text" className="form-control rounded-4" id="esicNo" required onChange={(e) => set_email_id(e.target.value)} value={email_id} />
                      </div>
                      <div className="form-group col-sm">
                        <label htmlFor="estType">Mobile</label>
                        <input type="text" className="form-control rounded-4" id="estType" required onChange={(e) => set_mobilenumber(e.target.value)} value={mobilenumber} />
                      </div>

                    </div>

                    <div className="row mb-3">
                      <div className="form-group col-md">
                        <label htmlFor="estName">PAN</label>
                        <input type="text" className="form-control rounded-4" id="estName" required onChange={(e) => set_panNo(e.target.value)} value={panNo} />
                      </div>
                      <div className="form-group col-md">
                        <label htmlFor="employerName">Username</label>
                        <input type="text" className="form-control rounded-4" id="employerName" required onChange={(e) => set_username(e.target.value)} value={username} />
                      </div>
                      <div className="form-group col-sm">
                        <label htmlFor="coverageDate">Password</label>
                        <input type="password" className="form-control rounded-4" id="coverageDate" required onChange={(e) => set_password(e.target.value)} value={password} />
                      </div>
                    </div>



                  </div>
                  <div className="modal-footer">
                    {!isUpdate ? (
                      <button type="button" className="btn btn-outline-primary rounded-4" onClick={addUser}>
                        Save 
                      </button>
                    ) : (
                      <button type="button" className="btn btn-outline-primary rounded-4">
                        Update
                      </button>
                    )}

                    <button type="button" className="btn btn-outline-danger rounded-4" onClick={closeModal}>
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
};

export default blogs;
