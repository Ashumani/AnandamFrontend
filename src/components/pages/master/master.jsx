/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from "react"
import { getEstId, getErId } from "../Auth/authToken";
import { getAllEmployee, saveEERegister, getEmployee, updateEmployee, uploadEmployee, searchEmployee } from "../../api/services";
import Swal from 'sweetalert2';
import moment from 'moment-timezone';
import React, { useRef } from 'react';
const master = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, set_totalPages] = useState(1);

  // Get current items based on the current page
  const [startIndex, set_startIndex] = useState('');
  const [currentItems, set_currentItems] = useState([]);
  const modalRef = useRef(null);
  const [ee_id, set_ee_id] = useState('');
  const [est_id, set_est_id] = useState('');
  const [ee_name, set_ee_name] = useState('');
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
      // await getAll();
    };

    fetchData();

  }, []);

  const getAll = async () => {
    // api call
    const params = {
      "est_epf_id": getEstId(),
      "limit": itemsPerPage,
      "offset": currentPage
    }
    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await getAllEmployee(params);
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

  const saveEEDetails = async () => {
    // api call
    try {
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
        "ee_sub_id": ee_sub_id,
      }


      await saveEERegister(params);
      await getAll();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      reset();

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
        getAll();
        reset();
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
  const searchEmp = async () => {
    // api call
    try {
      const params ={
        "est_id":1,
        "search":"A"
    }
      const data = await searchEmployee(params);
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
       
          // setEmployeeData(response.data);
  
          // set_totalPages(Math.ceil(response.data.length / itemsPerPage));
  
          // // Get current items based on the current page
          // set_startIndex((currentPage - 1) * itemsPerPage);
          set_totalPages(Math.ceil(data.count / itemsPerPage));
          set_currentItems(data.data);


        closeModal()
        getAll();
        reset();
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

        getAll();
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

      reset();

    } catch (error) {
      console.error('Login error ', error);
      setError(error);
    }
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getAll();

  };
  const handleMaritalStatusChange = (e) => {
    set_ee_maritial_status(e.target.value);
  };

  const handleRelationChange = (e) => {
    set_ee_father_husband(e.target.value);
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
    set_ee_father_husband('F');
    set_ee_relation('');
    set_ee_gross_wages('');
    set_ee_epf_wages('');
    set_ee_sub_id('');

  }


  const closeModal = () => {
    const modalElement = modalRef.current;
    if (modalElement) {
      // eslint-disable-next-line no-undef
      const modal = new bootstrap.Modal(modalElement);
      modal.hide();
    }
  };

  const openModal = () => {
    const modalElement = modalRef.current;
    console.log(modalElement)
    if (modalElement) {
      // eslint-disable-next-line no-undef
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  };
  return (
    <div>

      <div className="main-container">
        <div className='main-title'>
          <h3>Master List</h3>
        </div>
        <section className="section">
          <br />

          <div className="table-responsive">
            <table className="table table-striped table-hover text-center">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employer Name</th>
                  <th>EST Id</th>
                  <th>DSC Status</th>
                  <th>DSC Expire Date</th>
                  <th>Total Employee</th>
                  <th>Last Month Employee</th>
                  <th>Total Challan</th>
                  <th>Total Bill Amount</th>
                  <th>Received Bill Amount</th>
                  <th>Balance Bill Amount</th>
                  <th>EPF Wages</th>
                  <th>Eps Wages</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((employee, index) => (
                  <tr key={employee.id}>
                    <th >{index + 1}</th>
                    <td>{employee.ee_uan_no}</td>
                    <td>{employee.ee_pf_no}</td>
                    <td>******</td>
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
                        <button className="btn btn-light mx-1"  onClick={() => { fetchEmployee(employee.id) }}>
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
            <button className="btn btn-primary"
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
            <button className="btn btn-primary"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default master;