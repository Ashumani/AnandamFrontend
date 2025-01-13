/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from "react"
import { getEstId, getErId } from "../Auth/authToken";
import { getAllEmployee, saveEERegister, getEmployee, updateEmployee, uploadEmployee, searchEmployee } from "../../api/services";
import Swal from 'sweetalert2';
import moment from 'moment-timezone';
import React, { useRef } from 'react';
const employee = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, set_totalPages] = useState(1);
  const [search_emp, set_search_emp] = useState('');

  // Get current items based on the current page
  const [startIndex, set_startIndex] = useState('');
  const [currentItems, set_currentItems] = useState([]);
  const modalRef = useRef(null);
  const [ee_id, set_ee_id] = useState('');
  const [est_id, set_est_id] = useState('');
  const [ee_name, set_ee_name] = useState('');
  const [ee_esic_no, set_ee_esic_no] = useState('');
  const [ee_mobile_number, set_ee_mobile_number] = useState('');
  const [ee_email_id, set_ee_email_id] = useState('');
  const [ee_uan_no, set_ee_uan_no] = useState('');
  const [ee_pf_no, set_ee_pf_no] = useState('');
  const [ee_aadhar_no, set_ee_aadhar_no] = useState('');
  const [ee_dob, set_ee_dob] = useState('');
  const [ee_doj, set_ee_doj] = useState('');
  const [ee_dol, set_ee_dol] = useState('');
  const [ee_gender, set_ee_gender] = useState('Male');
  const [ee_maritial_status, set_ee_maritial_status] = useState('U');
  const [ee_father_husband, set_ee_father_husband] = useState('');
  const [ee_relation, set_ee_relation] = useState('F');
  const [ee_gross_wages, set_ee_gross_wages] = useState('');
  const [ee_epf_wages, set_ee_epf_wages] = useState('');
  const [ee_sub_id, set_ee_sub_id] = useState('');

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
      "est_epf_id": getEstId(),
      "limit": itemsPerPage,
      "offset": pageNumber
    }
    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await getAllEmployee(params);
      if (response.status == true) {
        // setEmployeeData(response.data);

        // set_totalPages(Math.ceil(response.data.length / itemsPerPage));

        // // Get current items based on the current page
        set_startIndex((currentPage - 1) * itemsPerPage);
        set_totalPages(Math.ceil(response.count / itemsPerPage));
        set_currentItems(response.data);

      } else {
        Swal.fire({
          position: 'top-right',
          icon: 'error',
          toast: true,
          title: response.message,
          showConfirmButton: false,
          showCloseButton: true,
          timer: 1500,
        });
      }


    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
      setLoading(false);
    }
  };

  const [err, setErrors] = useState({})

  const validate = async () => {

    try {


      let t = {}
      let valid = true;

      // Validate fields
      if (ee_uan_no == '') {
        t.ee_uan_no = "ee_uan_no is required";
        valid = false;
      }
      if (ee_name == '') {
        t.ee_name = "ee_name is required";
        valid = false;
      }
      // if (ee_mobile_number == '') {
      //     t.ee_mobile_number = "ee_mobile_number is required";
      //     valid = false;
      // }
      // if (ee_email_id == '') {
      //     t.ee_email_id = "ee_email_id is required";
      //     valid = false;
      // }
      if (ee_pf_no == '') {
        t.ee_pf_no = "ee_pf_no is required";
        valid = false;
      }
      // if (ee_aadhar_no == '') {
      //     t.ee_aadhar_no = "ee_aadhar_no is required";
      //     valid = false;
      // }
      if (ee_dob == '') {
        t.ee_dob = "ee_dob is required";
        valid = false;
      }
      if (ee_doj == '') {
        t.ee_doj = "ee_doj is required";
        valid = false;
      }
      // if (ee_dol == '') {
      //     t.ee_dol = "ee_dol is required";
      //     valid = false;
      // }
      if (ee_gender == '') {
        t.ee_gender = "ee_gender is required";
        valid = false;
      }
      if (ee_maritial_status == '') {
        t.ee_maritial_status = "ee_maritial_status is required";
        valid = false;
      }
      if (ee_father_husband == '') {
        t.ee_father_husband = "ee_father_husband is required";
        valid = false;
      }
      if (ee_relation == '') {
        t.ee_relation = "ee_relation is required";
        valid = false;
      }
      if (ee_gross_wages == '') {
        t.ee_gross_wages = "ee_gross_wages is required";
        valid = false;
      }
      if (!ee_epf_wages) {
        t.ee_epf_wages = "ee_epf_wages is required";
        valid = false;
      }



      setErrors(t)
      return valid
    } catch (error) {
      throw new Error()
    }
  }

  const saveEEDetails = async () => {
    // api call
    try {
      const valid = await validate()
      if (!valid) {
        Swal.fire({
          title: 'Error',
          text: 'Mandatory parameters are required',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      } else {
        const params = {
          "est_id": getErId(),
          "ee_name": ee_name,
          "ee_mobile_number": ee_mobile_number,
          "ee_email_id": ee_email_id,
          "ee_uan_no": ee_uan_no,
          "ee_pf_no": ee_pf_no,
          "ee_aadhar_no": ee_aadhar_no,
          "ee_dob": ee_dob,
          "ee_doj": ee_doj,
          "ee_dol": ee_dol,
          "ee_gender": ee_gender,
          "ee_maritial_status": ee_maritial_status,
          "ee_father_husband": ee_father_husband,
          "ee_relation": ee_relation,
          "ee_gross_wages": ee_gross_wages,
          "ee_epf_wages": ee_epf_wages,
          "ee_sub_id": ee_sub_id == "" ? 0 : ee_sub_id,
          "ee_esic_no": ee_esic_no
        }
        const data = await saveEERegister(params);
        if (data.status === true) {
          Swal.fire({
            position: 'top-right',
            icon: 'success',
            toast: true,
            title: data.message,
            showConfirmButton: false,
            showCloseButton: true,
            timer: 1500,
          });
          await getAll(1);
          closeModal()
          // eslint-disable-next-line react-hooks/exhaustive-deps
          reset();

        } else {
          Swal.fire({
            title: data.message,
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        }
      }



    } catch (error) {
      console.error('Login error ', error);
      setError(error);
    }
  };

  const fetchEmployee = async (id) => {
    // api call
    try {
      // closeModal()
      openModal();
      const userData = await getEmployee(id);
      if (userData.status === true) {
        set_ee_id(userData.data.id);
        set_est_id(userData.data.est_id);
        set_ee_name(userData.data.ee_name);
        set_ee_mobile_number(userData.data.ee_mobile_number);
        set_ee_email_id(userData.data.ee_email_id);
        set_ee_uan_no(userData.data.ee_uan_no);
        set_ee_pf_no(userData.data.ee_pf_no);
        set_ee_aadhar_no(userData.data.ee_aadhar_no);
        set_ee_dob(userData.data.ee_dob);
        set_ee_doj(userData.data.ee_doj);
        set_ee_dol(userData.data.ee_dol);
        set_ee_gender(userData.data.ee_gender);
        set_ee_maritial_status(userData.data.ee_maritial_status);
        set_ee_father_husband(userData.data.ee_father_husband);
        set_ee_relation(userData.data.ee_relation);
        set_ee_gross_wages(userData.data.ee_gross_wages);
        set_ee_epf_wages(userData.data.ee_epf_wages);
        set_ee_sub_id(userData.data.ee_sub_id);
        set_ee_esic_no(userData.data.ee_esic_no);
        setIsUpdate(true)
      }

    } catch (error) {
      console.error('Login error ', error);
      setError(error);
    }
  };


  const UpdateEmployee = async () => {
    // api call
    try {
      const params = {
        "est_id": est_id,
        "ee_name": ee_name,
        "ee_mobile_number": ee_mobile_number,
        "ee_email_id": ee_email_id,
        "ee_uan_no": ee_uan_no,
        "ee_pf_no": ee_pf_no,
        "ee_aadhar_no": ee_aadhar_no,
        "ee_dob": ee_dob,
        "ee_doj": ee_doj,
        "ee_dol": ee_dol,
        "ee_gender": ee_gender,
        "ee_maritial_status": ee_maritial_status,
        "ee_father_husband": ee_father_husband,
        "ee_relation": ee_relation,
        "ee_gross_wages": ee_gross_wages,
        "ee_epf_wages": ee_epf_wages,
        "ee_sub_id": ee_sub_id,
        "ee_esic_no": ee_esic_no
      }

      const data = await updateEmployee(ee_id, params);
      if (data.status === true) {
        Swal.fire({
          position: 'top-right',
          icon: 'success',
          toast: true,
          title: data.message,
          showConfirmButton: false,
          showCloseButton: true,
          timer: 1500,
        });

        closeModal()
        getAll(1);
        reset();
      } else {
        Swal.fire({
          title: data.message,
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps


    } catch (error) {
      console.error('Login error ', error);
      setError(error);
    }
  };
  const searchEmp = async () => {
    // api call
    try {
      const params = {
        "est_id": getErId(),
        "search": search_emp
      }
      const data = await searchEmployee(params);
      if (data.status === true) {

        // setEmployeeData(response.data);

        // set_totalPages(Math.ceil(response.data.length / itemsPerPage));

        // // Get current items based on the current page
        // set_startIndex((currentPage - 1) * itemsPerPage);
        set_totalPages(Math.ceil(data.count / itemsPerPage));
        set_currentItems(data.data);


        // closeModal()
        // getAll();
        // reset();
      } else {
        Swal.fire({
          position: 'top-right',
          icon: 'error',
          toast: true,
          title: data.message,
          showConfirmButton: false,
          showCloseButton: true,
          timer: 1500,
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps


    } catch (error) {
      console.error('Login error ', error);
      setError(error);
    }
  };


  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uplaodEmployee = async () => {
    if (!file) {
      alert('Please choose a file first.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      const id = getErId()

      // console.log('======', params)

      const data = await uploadEmployee(id, formData);
      if (data.status === true) {
        Swal.fire({
          position: 'top-right',
          icon: 'success',
          toast: true,
          title: data.message,
          showConfirmButton: false,
          showCloseButton: true,
          timer: 1500,
        });


        getAll(1);
      } else {
        if (data.code != 200) {
          Swal.fire({
            title: 'Error',
            text: data.message,
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        }
        const uan = data.data.map((x) => x.ee_uan_no);
        Swal.fire({
          position: 'top',
          icon: 'error',
          toast: true,
          title: data.message + " : " + uan,
          showConfirmButton: true,
          showCloseButton: true,
          timer: 10000,
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps

      reset();

    } catch (error) {
      console.error('Login error ', error);
      setError(error);
    }
  }

  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    try {
      await getAll(pageNumber); // Assuming getAll() returns a Promise
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };
  const handleMaritalStatusChange = (e) => {
    set_ee_maritial_status(e.target.value);
  };

  const handleRelationChange = (e) => {
    set_ee_relation(e.target.value);
  };
  const reset = async () => {
    set_ee_id('');
    set_est_id('');
    set_ee_name('');
    set_ee_mobile_number('');
    set_ee_email_id('');
    set_ee_uan_no('');
    set_ee_pf_no('');
    set_ee_aadhar_no('');
    set_ee_dob('');
    set_ee_doj('');
    set_ee_dol('');
    set_ee_gender('Male')
    set_ee_maritial_status('U')
    set_ee_father_husband('');
    set_ee_relation('F');
    set_ee_gross_wages('');
    set_ee_epf_wages('');
    set_ee_sub_id('');
    set_ee_esic_no('')
  }


  const closeModal = () => {
    var modal = document.getElementById('exampleModal');
    var bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();
  };

  const openModal = () => {
    var modal = document.getElementById('exampleModal');
    var bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
  };

  const getDisplayedPages = () => {
    const pages = [];
  
    // Add first 3 pages
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pages.push(i);
    }

    // Add a gap if needed
    if (currentPage > 3 || currentPage < totalPages - 3) {
      pages.push('...');
    }

    // Add the range around the current page (3 pages before and after)
    if (currentPage > 3) {
      for (let i = currentPage - 1; i <= currentPage + 1 && i < totalPages - 3; i++) {
        if (i > 3 && i < totalPages - 3) {
          pages.push(i);
        }
      }
    }

    // Add last 3 pages
    for (let i = Math.max(totalPages - 2, currentPage + 1); i <= totalPages; i++) {
      if (i > currentPage + 1) {
        pages.push(i);
      }
    }

    return pages;
  };
  const displayedPages = getDisplayedPages();
  return (
    <div>

      <div className="main-container" style={{ "marginTop": "50px", "fontSize": "15px", "color": "black" }}>
        <div className='main-title'>
          <h3>Employee Registration</h3>
        </div>
        <section className="section">
          <br />
          <div className="row">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                    <button type="button" className="btn btn-primary rounded-4" onClick={openModal}>
                      Add Employee
                    </button>
                  </div>
                  <div className="col-sm-4 col-md-4 col-lg-4 col-4">
                    <input className="form-control rounded-4" type="file" id="formFile" accept=".xlsx, .xls" onChange={handleFileChange} />
                  </div>
                  <div className="col-sm-2 col-md-2 col-lg-2 col-2">
                    <button type="button" className="btn btn-primary rounded-4" onClick={uplaodEmployee}>
                      Upload
                    </button>
                  </div>
                  <div className="col-sm-3 col-md-3 col-lg-3 col-3">
                    <input type="text" className="form-control rounded-4" placeholder="Search" onChange={(e) => set_search_emp(e.target.value)} onBlur={searchEmp} />
                  </div>
                </div>
              </div>

              <h5 className="card-title text-center"><strong>Employee Details</strong></h5>

              <div className="table-responsive">
                <table className="table table-sm table-striped table-hover text-center">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>UAN</th>
                      <th>PFNO</th>
                      <th>ESIC</th>
                      <th>Name</th>
                      <th>DOB</th>
                      <th>DOJ</th>
                      <th>Gender</th>
                      <th>MaritialStatus</th>
                      <th>Father/Husband</th>
                      <th>Relation</th>
                      <th>EPF Wages</th>
                      <th>Eps Wages</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((employee, index) => {
                      const globalIndex = currentPage * itemsPerPage - itemsPerPage + index;
                      return (

                        <tr key={employee.id}>
                          <th >{globalIndex + 1}</th>
                          <td>{employee.ee_uan_no}</td>
                          <td>{employee.ee_pf_no}</td>
                          <td>{employee.ee_esic_no}</td>
                          <td >{employee.ee_name}</td>
                          <td >{moment(employee.ee_dob).format('YYYY-MM-DD')}</td>
                          <td>{moment(employee.ee_doj).format('YYYY-MM-DD')}</td>
                          <td>{employee.ee_gender}</td>
                          <td>{employee.ee_maritial_status}</td>
                          <td>{employee.ee_father_husband}</td>
                          <td>{employee.ee_relation}</td>
                          <td>{employee.ee_gross_wages}</td>
                          <td>{employee.ee_epf_wages}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <button className="btn btn-light" onClick={() => { fetchEmployee(employee.id) }}>
                                <i className="bi bi-eye text-info"></i>
                              </button>
                              <button className="btn btn-light mx-1" onClick={() => { fetchEmployee(employee.id) }}>
                                <i className="bi bi-pencil-fill text-info"></i>
                              </button>
                              <button className="btn btn-light" disabled>
                                <i className="bi bi-trash text-danger"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="pagination">
                <button
                  className="btn btn-primary rounded-4"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  aria-label="Previous page"
                >
                  Previous
                </button>

                {totalPages > 0 && (
                  <>
                    {displayedPages.map((page, index) =>
                      page === '...' ? (
                        <span key={index} style={{ margin: '0 5px' }}>...</span>
                      ) : (
                        <button
                          key={index}
                          onClick={() => handlePageChange(page)}
                          style={{
                            margin: '0 2px',
                            backgroundColor: currentPage === page ? '#1e60aa' : 'white',
                            border: '0px',
                            color: currentPage === page ? 'white' : 'black'
                          }}
                          aria-label={`Page ${page}`}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </>
                )}

                <button
                  className="btn btn-primary rounded-4"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  aria-label="Next page"
                >
                  Next
                </button>
              </div>


              {/* Old Pagination code */}
               {/* <div className="pagination">
                <button
                  className="btn btn-primary rounded-4"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  aria-label="Previous page"
                >
                  Previous
                </button>
                {totalPages > 0 && (
                  Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      style={{
                        margin: '0 2px',
                        backgroundColor: currentPage === index + 1 ? '#1e60aa' : 'white',
                        border: '0px',
                        color: currentPage === index + 1 ? 'white' : 'black'
                      }}
                      aria-label={`Page ${index + 1}`}
                    >
                      {index + 1}
                    </button>
                  ))
                )}
                <button
                  className="btn btn-primary rounded-4"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  aria-label="Next page"
                >
                  Next
                </button>
              </div> */}
            </div>
          </div>
          <div className="modal fade bd-example-modal-lg" id="exampleModal" ref={modalRef} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header bg-primary">
                  <h5 className="modal-title text-white" id="exampleModalLabel">Employee Registration</h5>
                  <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close" onClick={reset}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body text-dark">
                  <div className="row">
                    <div className="col-lg-12">


                      <div className="row">
                        <div className="col mb-2">
                          <label htmlFor="inputUAN">UAN</label>
                          <input type="text" className="form-control rounded-4" required onChange={(e) => set_ee_uan_no(e.target.value)} value={ee_uan_no} />
                          {err.ee_uan_no && <p style={{ color: 'red' }}>{err.ee_uan_no}</p>}
                        </div>
                        <div className="col mb-2">
                          <label htmlFor="inputPF">PF</label>
                          <input type="email" className="form-control rounded-4" required onChange={(e) => set_ee_pf_no(e.target.value)} value={ee_pf_no} />
                          {err.ee_pf_no && <p style={{ color: 'red' }}>{err.ee_pf_no}</p>}
                        </div>
                        <div className="col mb-2">
                          <label htmlFor="inputName">ESIC</label>
                          <input type="text" className="form-control rounded-4" required onChange={(e) => set_ee_esic_no(e.target.value)} value={ee_esic_no} />
                          {err.ee_name && <p style={{ color: 'red' }}>{err.ee_name}</p>}
                        </div>

                      </div>
                      <div className="row">
                        <div className="col mb-2">
                          <label htmlFor="inputName">Name</label>
                          <input type="text" className="form-control rounded-4" required onChange={(e) => set_ee_name(e.target.value)} value={ee_name} />
                          {err.ee_name && <p style={{ color: 'red' }}>{err.ee_name}</p>}
                        </div>
                        <div className="col mb-2">
                          <label htmlFor="inputNumber">Date Of Birth</label>
                          <input type="date" className="form-control rounded-4" required onChange={(e) => set_ee_dob(e.target.value)} value={ee_dob} />
                          {err.ee_dob && <p style={{ color: 'red' }}>{err.ee_dob}</p>}
                        </div>
                        <div className="col mb-2">
                          <label htmlFor="inputTime">Date Of Joining</label>
                          <input type="date" className="form-control rounded-4" required onChange={(e) => set_ee_doj(e.target.value)} value={ee_doj} />
                          {err.ee_doj && <p style={{ color: 'red' }}>{err.ee_doj}</p>}
                        </div>


                      </div>
                      <div className="row">
                        <div className="col mt-4">
                          <label htmlFor="inputTime" className="form-label">Gender</label>
                          <div className="form-check form-check-inline">
                            <input className="form-check-input ml-1 mt-1" type="radio" name="gender" value='Male' id="Male" checked={ee_gender === 'Male'} onChange={(e) => set_ee_gender(e.target.value)} />
                            <label className="form-check-label ml-2" htmlFor="male">Male</label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input className="form-check-input mt-1" type="radio" name="gender" id="Female" value='Female' checked={ee_gender === 'Female'} onChange={(e) => set_ee_gender(e.target.value)} />
                            <label className="form-check-label ml-2" htmlFor="female">Female</label>
                          </div>

                          {err.ee_gender && <p style={{ color: 'red' }}>{err.ee_gender}</p>}
                        </div>
                        <div className="col-sm mb-2">
                          <label>Maritial Status</label>
                          <select
                            className="form-select rounded-4"
                            aria-label="Default select example" value={ee_maritial_status} onChange={handleMaritalStatusChange}
                          >
                            <option value="M">Married</option>
                            <option value="U">UnMarried</option>
                          </select>
                          {err.ee_maritial_status && <p style={{ color: 'red' }}>{err.ee_maritial_status}</p>}
                        </div>
                        <div className="col-sm mb-2">
                          <label htmlFor="inputText">Father/Husband</label>
                          <input type="text" className="form-control rounded-4" required onChange={(e) => set_ee_father_husband(e.target.value)} value={ee_father_husband} />
                          {err.ee_father_husband && <p style={{ color: 'red' }}>{err.ee_father_husband}</p>}
                        </div>

                        {/* <div className="col-sm mb-2">
                            <label htmlFor="inputText">Relation</label>
                            <input type="text" className="form-control rounded-4" required onChange={(e) => set_ee_relation(e.target.value)} value={ee_relation} />
                          </div> */}
                      </div>
                      <div className="row">
                        <div className="col-sm mb-2">
                          <label>Relation</label>
                          <select
                            className="form-select rounded-4"
                            aria-label="Default select example" value={ee_relation} onChange={handleRelationChange}
                          >
                            <option value="F">Father</option>
                            <option value="S">Spouse</option>
                          </select>
                          {err.ee_relation && <p style={{ color: 'red' }}>{err.ee_relation}</p>}
                        </div>
                        <div className="col-sm mb-2">
                          <label htmlFor="inputColor">EPF Wages</label>
                          <input type="number" className="form-control rounded-4" required onChange={(e) => set_ee_epf_wages(e.target.value)} value={ee_epf_wages} />
                          {err.ee_epf_wages && <p style={{ color: 'red' }}>{err.ee_epf_wages}</p>}
                        </div>
                        <div className="col-sm mb-2">
                          <label htmlFor="inputPassword">EPS Wages</label>
                          <input type="number" className="form-control rounded-4" required onChange={(e) => set_ee_gross_wages(e.target.value)} value={ee_gross_wages} />
                          {err.ee_gross_wages && <p style={{ color: 'red' }}>{err.ee_gross_wages}</p>}
                        </div>
                      </div>
                      <div className="row">
                        {/* <div className="col mb-2">
                            <label htmlFor="inputNumber">Aadhar No</label>
                            <input type="text" className="form-control rounded-4" required onChange={(e) => set_ee_aadhar_no(e.target.value)} value={ee_aadhar_no} />
                          </div> */}

                        <div className="col-sm mb-2">
                          <label htmlFor="inputColor">SubId</label>
                          <input type="number" className="form-control rounded-4" onChange={(e) => set_ee_sub_id(e.target.value)} value={ee_sub_id} />
                        </div>

                        <div className="col mb-2">
                          <label htmlFor="inputNumber">Date Of Exit</label>
                          <input type="date" className="form-control rounded-4" required onChange={(e) => set_ee_dol(e.target.value)} value={ee_dol} />
                        </div>

                        <div className="col-sm">
                          <label htmlFor="inputColor">isAbove58</label>
                          <input type="number" className="form-control rounded-4" onChange={(e) => set_ee_sub_id(e.target.value)} value={ee_sub_id} />
                        </div>
                      </div>



                    </div>
                  </div>
                </div>
                <div className="modal-footer">

                  {/* <button type="button" className="btn btn-secondary" data-dismiss="modal" aria-label="Close" onClick={closeModal}>Close</button> */}
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                  {!isUpdate ? (
                    <button type="button" className="btn btn-outline-primary" onClick={saveEEDetails}>
                      Save
                    </button>
                  ) : (
                    <button type="button" className="btn btn-outline-primary" onClick={UpdateEmployee}>
                      Update
                    </button>
                  )}

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default employee;
