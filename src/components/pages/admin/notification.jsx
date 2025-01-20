/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from "react"
import { getEstId, getErId } from "../Auth/authToken";
import { getMasterList, uploadEmployer, erRegister, erUpdate, getErRegister, getAllInquiries, getAllNotification, setRead } from "../../api/services";
import Swal from 'sweetalert2';
import moment from 'moment-timezone';
import React, { useRef } from 'react';
const notification = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, set_totalPages] = useState(1);

  // Get current items based on the current page
  const [currentItems, set_currentItems] = useState([]);
  const modalRef = useRef(null);

  const [EstEpfId, setEstEpfId] = useState('');
  const [EstEsicId, setEstEsicId] = useState('');
  const [EstType, setEstType] = useState('');
  const [estDoc, setDoc] = useState('');
  const [EstName, setEstName] = useState('');
  const [ErName, setErName] = useState('');

  // const [employeeData, setEmployeeData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await getAll(1);
    };

    fetchData();

  }, []);

  const getAll = async (pageNumber) => {
    // api call
    const params = {
      "limit": itemsPerPage,
      "offset": pageNumber
    }
    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await getAllNotification();
      if (response.status == true) {
        // setEmployeeData(response.data);

        // set_totalPages(Math.ceil(response.data.length / itemsPerPage));

        // // Get current items based on the current page
        // set_startIndex((currentPage - 1) * itemsPerPage);
        set_totalPages(Math.ceil(10 / itemsPerPage));
        set_currentItems(response.data);
        

      } else {
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

  const setReadNotification = async (id) => {
    // api call
    const params = {
      "status": 1
    }
    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await setRead(id, params);
      if (response.status == true) {

        await getAll(1)
        Swal.fire({
          title: response.message,
          icon: 'success',
          confirmButtonText: 'Okay'
        });
      } else {
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

      <div className="main-container"  style={{ "marginTop": "50px", "fontSize": "15px", "color": "black" }}>
        <div className='main-title mt-5'>
          <h3>Notification</h3>
        </div>
        <section className="section">
          <br />
   

          <div className="table-responsive mt-2">
            <table className="table table-striped table-sm table-hover text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>date</th>
                  <th>Created By</th>
                  <th>Checked By</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((employee, index) => (
                  <tr key={employee.id}>
                    <th >{index + 1}</th>
                    <td>{employee.category}</td>
                    <td>{employee.message}</td>
                    <td >{moment(employee.date).format('YYYY-MM-DD')}</td>
                    <td>{employee.created_by}</td>
                    <td>Manish</td>
                    <td>{employee.status}</td>
                   
                    <td>
                        <div className="d-flex align-items-center">
                          
                          <button className="btn btn-light" onClick={() => setReadNotification(employee.id)}>
                            <i className="bi bi-check text-success"></i>
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
                    <h5 className="modal-title">Add Blog</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body"  style={{ color:'black'}}>
                    <div className="row mb-3">
                      <div className="form-group col-sm">
                        <label htmlFor="epfNo" > Category</label>
                        <input type="text" className="form-control rounded-4" id="epfNo" required onChange={(e) => setEstEpfId(e.target.value)} value={EstEpfId} />
                      </div>
                      <div className="form-group col-sm">
                        <label htmlFor="esicNo">Title</label>
                        <input type="text" className="form-control rounded-4" id="esicNo" required onChange={(e) => setEstEsicId(e.target.value)} value={EstEsicId} />
                      </div>
                      <div className="form-group col-sm">
                        <label htmlFor="estType">Subject</label>
                        <input type="text" className="form-control rounded-4" id="estType" required onChange={(e) => setEstType(e.target.value)} value={EstType} />
                      </div>
                      
                    </div>

                    <div className="row mb-3">
                      <div className="form-group col-md">
                        <label htmlFor="estName">Message</label>
                        <input type="text" className="form-control rounded-4" id="estName" required onChange={(e) => setEstName(e.target.value)} value={EstName} />
                      </div>
                      <div className="form-group col-md">
                        <label htmlFor="employerName">Produce By</label>
                        <input type="text" className="form-control rounded-4" id="employerName" required onChange={(e) => setErName(e.target.value)} value={ErName} />
                      </div>
                      <div className="form-group col-sm">
                        <label htmlFor="coverageDate">Date</label>
                        <input type="date" className="form-control rounded-4" id="coverageDate" required onChange={(e) => setDoc(e.target.value)} value={estDoc} />
                      </div>
                    </div>


          
                  </div>
                  <div className="modal-footer">
                    {!isUpdate ? (
                      <button type="button" className="btn btn-outline-primary rounded-4">
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

export default notification;
