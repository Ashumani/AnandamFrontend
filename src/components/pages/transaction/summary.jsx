/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from "react"
import { getErId, getEstId } from "../Auth/authToken";
import { getEmployeeByUANandEPFid, getEpfReturnByMonth, getEmployer, fillEpfReturn, uploadMonthlyReturn, getSummary, downlaodFile, fetchEpfReturn } from "../../api/services";
import Swal from 'sweetalert2';
import React, { useRef } from 'react';

const summary = () => {


  const returnsYear = {
    "month": [{ "monthNum": 1, "monthText": "Jan" }, { "monthNum": 2, "monthText": "Feb" }, { "monthNum": 3, "monthText": "Mar" }, { "monthNum": 4, "monthText": "Apr" }, { "monthNum": 5, "monthText": "May" }, { "monthNum": 6, "monthText": "Jun" }, { "monthNum": 7, "monthText": "Jul" }, { "monthNum": 8, "monthText": "Aug" }, { "monthNum": 9, "monthText": "Sep" }, { "monthNum": 10, "monthText": "Oct" }, { "monthNum": 11, "monthText": "Nov" }, { "monthNum": 12, "monthText": "Dec" }],
    "Year": [2020, 2021, 2022, 2023, 2024]
  }
  const modalRef = useRef(null);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedYear, setSelectedYear] = useState(2024);

  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, set_totalPages] = useState(1);

  // Get current items based on the current page
  const [startIndex, set_startIndex] = useState('');
  const [currentItems, set_currentItems] = useState([]);



  const [employeeData, setEmployeeData] = useState([]);
  const [monthly, setMonthly] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Success popup state
  const [modelMessage, setModelMessage] = useState('');
  const [respStatus, setRespStatus] = useState('Success');

  const [isUpdate, set_isUpdate] = useState(false);
  const [search_uan, set_search_uan] = useState('');
  const [search_pf, set_search_pf] = useState('');
  const [ee_id, set_ee_id] = useState('');
  const [ee_name, set_ee_name] = useState('');
  const [ee_uan_no, set_ee_uan_no] = useState('');
  const [ee_pf_no, set_ee_pf_no] = useState('');
  const [ee_dob, set_ee_dob] = useState('');
  const [ee_doj, set_ee_doj] = useState('');
  const [ee_dol, set_ee_dol] = useState('');
  const [ee_gender, set_ee_gender] = useState('');
  const [ee_maritial_status, set_ee_maritial_status] = useState('');
  const [ee_father_husband, set_ee_father_husband] = useState('');
  const [ee_relation, set_ee_relation] = useState('');
  const [ee_gross_wages, set_ee_gross_wages] = useState('');
  const [ee_epf_wages, set_ee_epf_wages] = useState('');
  const [cal_gross_wages, set_cal_gross_wages] = useState('');
  const [cal_epf_wages, set_cal_epf_wages] = useState('');
  const [ee_sub_id, set_ee_sub_id] = useState('');
  const [ee_edli_wages, set_ee_edli_wages] = useState('');
  const [ee_eps_wages, set_ee_eps_wages] = useState('');
  const [ee_epf, set_ee_epf] = useState('');
  const [er_epf, set_er_epf] = useState('');
  const [er_eps, set_er_eps] = useState('');

  const [eReturn_id, set_eReturn_id] = useState('');
  const [total_acc1, set_total_acc1] = useState('');
  const [total_acc2, set_total_acc2] = useState('');
  const [total_acc10, set_total_acc10] = useState('');
  const [total_acc21, set_total_acc21] = useState('');
  const [total_acc22, set_total_acc22] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      getAllSummary();
    };

    fetchData();

  }, []);

  const getAllSummary = async () => {
    // api call
    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await getSummary(getErId());
      if (response.status == true) {
        set_totalPages(Math.ceil(response.count / itemsPerPage));
        set_currentItems(response.data);
        set_total_acc1(response.total.total_acc1);
        set_total_acc2(response.total.total_acc2);
        set_total_acc10(response.total.total_acc10);
        set_total_acc21(response.total.total_acc21);
        set_total_acc22(response.total.total_acc22);

      }


    } catch (error) {
      console.error('Error fetching data:', error);

    }
  };
  const fetchEmployee = async () => {
    // api call
    try {
      reset1();
      const params = {
        "est_id": getErId(),
        "ee_uan_no": search_uan,
        "ee_pf_no": search_pf
      }
      const userData = await getEmployeeByUANandEPFid(params);
      if (userData.status === true) {
        set_ee_id(userData.data.id);
        set_ee_name(userData.data.ee_name);
        set_ee_uan_no(userData.data.ee_uan_no);
        set_ee_pf_no(userData.data.ee_pf_no);
        set_ee_dob(userData.data.ee_dob);
        set_ee_doj(userData.data.ee_doj);
        set_ee_dol(userData.data.ee_dol);
        set_ee_gender(userData.data.ee_gender);
        set_ee_maritial_status(userData.data.ee_maritial_status);
        set_ee_father_husband(userData.data.ee_father_husband);
        set_ee_relation(userData.data.ee_relation);
        set_ee_gross_wages(userData.data.ee_gross_wages);
        set_ee_epf_wages(userData.data.ee_epf_wages);
        // setIsUpdate(true)
      }

    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
  };

  const fetchReturn = async (id) => {
    // api call
    try {
      reset1();
      set_isUpdate(true);
      const userData = await fetchEpfReturn(id);
      if (userData.status === true) {
        set_eReturn_id(userData.data.id);
        set_ee_id(userData.data.ee_id);
        set_ee_name(userData.data.ee_name);
        set_ee_uan_no(userData.data.ee_uan_no);
        set_ee_pf_no(userData.data.ee_pf_no);
        set_ee_dob(userData.data.ee_dob);
        set_ee_doj(userData.data.ee_doj);
        set_ee_dol(userData.data.ee_dol);
        set_ee_gender(userData.data.ee_gender);
        set_ee_maritial_status(userData.data.ee_maritial_status);
        set_ee_father_husband(userData.data.ee_father_husband);
        set_ee_relation(userData.data.ee_relation);
        set_ee_gross_wages(userData.data.ee_gross_wages);
        set_ee_epf_wages(userData.data.ee_epf_wages);
        set_cal_gross_wages(userData.data.gross_wages);
        set_cal_epf_wages(userData.data.epf_wages);
        set_ee_sub_id(userData.data.ee_sub_id);
        set_ee_edli_wages(userData.data.edli_wages);
        set_ee_eps_wages(userData.data.eps_wages);
        set_ee_epf(userData.data.ee_share);
        set_er_epf(userData.data.diff_share);
        set_er_eps(userData.data.eps_share);
        // setIsUpdate(true)
      }

    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
  };

  const saveReturns = async () => {
    // api call
    try {
      const params = {
        "est_id": getErId(),
        "ee_id": ee_id,
        "ee_uan": ee_uan_no,
        "est_epf_id": getEstId(),
        "er_name": ee_name,
        "month": selectedMonth,
        "year": selectedYear,
        "gross_wages": cal_gross_wages,
        "epf_wages": cal_epf_wages,
        "edli_wages": ee_edli_wages,
        "eps_wages": ee_epf_wages,
        "ee_share": ee_epf,
        "diff_share": er_epf,
        "eps_share": er_eps,
        "ncp_days": 0
      }
      const userData = await fillEpfReturn(params);

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
        getReturnByMonth()

        handleClose();

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

      // Show success popup



    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
  };

  const updateReturns = async () => {
    // api call
    try {
      const params = {
        "est_id": getErId(),
        "ee_id": ee_id,
        "ee_uan": ee_uan_no,
        "est_epf_id": getEstId(),
        "er_name": ee_name,
        "month": selectedMonth,
        "year": selectedYear,
        "gross_wages": cal_gross_wages,
        "epf_wages": cal_epf_wages,
        "edli_wages": ee_edli_wages,
        "eps_wages": ee_epf_wages,
        "ee_share": ee_epf,
        "diff_share": er_epf,
        "eps_share": er_eps,
        "ncp_days": 0
      }
      const userData = await fillEpfReturn(eReturn_id, params);

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
        getReturnByMonth()

        handleClose();

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

      // Show success popup



    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
  };

  const genECR = async () => {
    // api call
    try {
      const params = {
        "est_id": getErId(),
        "ee_id": 0,
        "month": selectedMonth,
        "year": selectedYear
      }
      const userData = await getEpfReturnByMonth(params);

      if (userData.status === true) {
        
        await downlaodFile(userData.url);
        // window.URL.revokeObjectURL(url);
        Swal.fire({
          position: 'top-right',
          icon: 'success',
          toast: true,
          title: userData.message,
          showConfirmButton: false,
          showCloseButton: true,
          timer: 1500,
        });

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

      // Show success popup



    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
  };

  const calculation = async (value) => {
    // api call
    try {
      const params = {
        "est_epf_id": getEstId()
      }
      const userData = await getEmployer(params);
      const epf_wages = value;

      set_ee_eps_wages(epf_wages < 15000 ? epf_wages : 15000)
      set_ee_edli_wages(epf_wages < 15000 ? epf_wages : 15000)
      set_ee_epf(Math.round(epf_wages * userData.data.ee_epf_rate / 100))
      set_er_epf(Math.floor(epf_wages * userData.data.er_diff_rate / 100))
      set_er_eps(Math.round(epf_wages * userData.data.er_eps_rate / 100))

    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
  };

  const reset = async () => {
    set_search_pf('')
    set_search_uan('')
    reset1();

  }
  const reset1 = async () => {
    set_ee_id('');
    set_ee_name('');
    set_ee_uan_no('');
    set_ee_pf_no('');
    set_ee_dob('');
    set_ee_doj('');
    set_ee_dol('');
    set_ee_gender('')
    set_ee_maritial_status('')
    set_ee_father_husband('');
    set_ee_relation('');
    set_ee_gross_wages('');
    set_ee_epf_wages('');
    set_ee_sub_id('');
    set_cal_gross_wages('');
    set_cal_epf_wages('');
    set_ee_eps_wages('')
    set_ee_edli_wages('')
    set_ee_epf('')
    set_er_epf('')
    set_er_eps('')
    setModelMessage('')
    set_isUpdate(false);

  }

  const monthlyBack = async () => {
    getAllSummary();
    setMonthly(true)

  }
  const handleShow = () => { setShowModal(true) };
  const handleClose = () => { setShowModal(false), reset(); }
  const handleSuccessClose = () => setShowSuccessPopup(false);




  const getReturnByMonth = async () => {
    // api call
    try {
      const params = {
        "est_id": getErId(),
        "ee_id": 0,
        "month": selectedMonth,
        "year": selectedYear
      }
      const userData = await getEpfReturnByMonth(params);
      setEmployeeData(userData.data)
      setMonthly(false)
      set_totalPages(Math.ceil(userData.data.length / itemsPerPage));

      // Get current items based on the current page
      set_startIndex((currentPage - 1) * itemsPerPage);
      set_currentItems(userData.data.slice(startIndex, startIndex + itemsPerPage));


    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadMonthly = async () => {
    if (!file) {
      alert('Please choose a file first.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      const id = getErId()

      // console.log('======', params)

      const data = await uploadMonthlyReturn(id, formData);
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
      // setError(error);
    }
  }


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getReturnByMonth();
  };



  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const closeModal = () => {
    const modalElement = modalRef.current;
    if (modalElement) {
      // eslint-disable-next-line no-undef
      const modal = new bootstrap.Modal(modalElement);
      modal.hide();
      reset1()
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
      {monthly ? (
        <div className="main-container">
          <div className='main-title'>
            <h3>Summary</h3>
          </div>
          <section className="section">
            <br />
            <div className="row">
              <div className="col-sm">
                <select
                  className="form-select"
                  aria-label="Default select example" value={selectedMonth} onChange={handleMonthChange}
                >
                  {returnsYear.month.map((returnYear) => (
                    // eslint-disable-next-line react/jsx-key
                    <option value={returnYear.monthNum}>{returnYear.monthText}</option>
                  ))}
                </select>

              </div>
              <div className="col-sm">
                <select
                  className="form-select"
                  aria-label="Default select example" value={selectedYear} onChange={handleYearChange}
                >
                  {returnsYear.Year.map((retYear) => (
                    // eslint-disable-next-line react/jsx-key
                    <option value={retYear}>{retYear}</option>
                  ))}
                </select>
              </div>
              <div className="col-sm-2">
                <button type="button" className="btn btn-outline-primary btn-block" onClick={getReturnByMonth} >Next
                  {/* <Link to="/auth/dashboard/monthlypf"><span >Next</span></Link> */}
                </button>
              </div>
            </div>

            <h5 className="mt-4">EPF Summary </h5>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Number Of EE</th>
                  <th scope="col">Month</th>
                  <th scope="col">Year</th>
                  <th scope="col">Account 1</th>
                  <th scope="col">Account 2</th>
                  <th scope="col">Account 10</th>
                  <th scope="col">Account 21</th>
                  <th scope="col">Account 22</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((employee, index) => (
                  <tr key={index}>
                    <th scope="row">{employee.NumbersOfEE}</th>
                    <td>{employee.month}</td>
                    <td>{employee.year}</td>
                    <td>{employee.acc1}</td>
                    <td>{employee.acc2}</td>
                    <td>{employee.acc10}</td>
                    <td>{employee.acc21}</td>
                    <td>{employee.acc22}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th id="total" colSpan="3">Total :</th>
                  <td>{total_acc1}</td>
                  <td>{total_acc2}</td>
                  <td>{total_acc10}</td>
                  <td>{total_acc21}</td>
                  <td>{total_acc22}</td>
                </tr>
              </tfoot>
            </table>
          </section>
        </div>
      ) : (
        <div className="main-container">
          <div className='main-title'>
            <h3>Return Filing</h3>
          </div>
          <section className="section">
            <br />
            <div className="row">
              <div className="col-sm">
                <button type="button" className="btn btn-outline-primary btn-block" onClick={openModal}>
                  Add ({selectedMonth}-{selectedYear})
                </button>
              </div>
              <div className="col-sm">
                <button
                  type="file"
                  className="btn btn-outline-primary btn-block" data-toggle="modal" data-target="#importReturn"
                >
                  Import
                </button>
              </div>
              <div className="col-sm">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-block" data-toggle="modal" data-target="#importReturn"
                >
                  Export
                </button>
              </div>
              <div className="col-sm">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-block" onClick={genECR}
                >
                  ECR
                </button>
              </div>
              <div className="col-sm">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-block" onClick={monthlyBack}
                >
                  BACK
                </button>
              </div>
              <div className="col-sm">
                <input type="text" className="form-control" placeholder="Search" />
              </div>
              {/* <div className="col-md-4">
              <input className="form-control" type="file" id="formFile" />

            </div> */}
            </div>

            {/* Add Epf Return Model */}
            {/* {showModal && ( */}
            {/* <div style={{ display: 'block' }} className="modal fade show" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}
            <div className="modal fade bd-example-modal-lg" id="exampleModal" ref={modalRef} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header bg-primary">
                    <h5 className="modal-title" id="exampleModalLabel">EPF Return Filing For {selectedMonth}-{selectedYear}</h5>
                    <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body text-dark">
                    <div className="row">
                      <div className="col-lg-12">

                        <form>
                          <div className="row">
                            <div className="col-md-4">
                              <input type="number" className="form-control" placeholder="Enter UAN Number" onChange={(e) => set_search_uan(e.target.value)} value={search_uan} />
                            </div>
                            <div className="col-md-4">
                              <input type="text" className="form-control" placeholder="Enter PF Number" onChange={(e) => set_search_pf(e.target.value)} value={search_pf} />
                            </div>
                            <div className="col-sm">
                              <button type="button" className="btn btn-outline-primary" onClick={fetchEmployee}>Search</button>
                            </div>

                          </div>
                          <div className="row">
                            <div className="col mb-2">
                              <label htmlFor="inputPassword">Name</label>
                              <input type="text" className="form-control" disabled onChange={(e) => set_ee_name(e.target.value)} value={ee_name} />
                            </div>
                            <div className="col mb-2">
                              <label htmlFor="inputNumber">Gender</label>
                              <input type="text" className="form-control" disabled onChange={(e) => set_ee_gender(e.target.value)} value={ee_gender} />
                            </div>
                            <div className="col mb-2">
                              <label htmlFor="inputNumber">Father/husband</label>
                              <input type="text" className="form-control" disabled onChange={(e) => set_ee_father_husband(e.target.value)} value={ee_father_husband} />
                            </div>
                            <div className="col mb-2">
                              <label htmlFor="inputNumber">Maritial Status</label>
                              <input type="text" className="form-control" disabled onChange={(e) => set_ee_maritial_status(e.target.value)} value={ee_maritial_status} />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col mb-3">
                              <label htmlFor="inputNumber">Date Of Birth</label>
                              <input type="text" className="form-control" disabled onChange={(e) => set_ee_dob(e.target.value)} value={ee_dob} />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputTime">Date Of Joining</label>
                              <input type="text" className="form-control" disabled onChange={(e) => set_ee_doj(e.target.value)} value={ee_doj} />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputDate">EPS Exmpted</label>
                              <input type="text" className="form-control" disabled onChange={(e) => set_ee_doj(e.target.value)} value={ee_doj} />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputColor">Gross Wages</label>
                              <input type="number" className="form-control" disabled onChange={(e) => set_ee_gross_wages(e.target.value)} value={ee_gross_wages} />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputPassword">EPF Wages</label>
                              <input type="number" className="form-control" disabled onChange={(e) => set_ee_epf_wages(e.target.value)} value={ee_epf_wages} />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-sm">
                              <label htmlFor="inputColor">Gross Wages</label>
                              <input type="text" className="form-control" onChange={(e) => set_cal_gross_wages(e.target.value)} value={cal_gross_wages} />
                            </div>
                            <div className="col-sm">
                              <label htmlFor="inputEPFWages">EPF Wages</label>
                              <input type="text" className="form-control" onBlur={(e) => calculation(e.target.value)} onChange={(e) => set_cal_epf_wages(e.target.value)} value={cal_epf_wages} />
                            </div>

                            <div className="col-sm">
                              <label htmlFor="inputPassword">EDLI Wages</label>
                              <input type="text" className="form-control" disabled value={ee_edli_wages} />
                            </div>
                            <div className="col-sm">
                              <label htmlFor="inputPassword">EPS Wages</label>
                              <input type="text" className="form-control" disabled value={ee_eps_wages} />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputPassword">EE</label>
                              <input type="text" className="form-control" disabled value={ee_epf} />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputPassword">ER</label>
                              <input type="text" className="form-control" disabled value={er_epf} />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputPassword">EPS</label>
                              <input type="text" className="form-control" disabled value={er_eps} />
                            </div>
                          </div>
                          {/* <div className="row">
                              <div className="col-sm">
                                <button type="button" className="btn btn-outline-primary btn-block" onClick={saveReturns}>Save</button>
                              </div>
                              <div className="col-sm">
                                <button type="button" className="btn btn-outline-primary btn-block">Update</button>
                              </div>
                              <div className="col-sm">
                                <button type="button" className="btn btn-outline-primary btn-block">Reset</button>
                              </div>
                              <div className="col-sm">
                                <button type="button" className="btn btn-outline-primary btn-block" data-dismiss="modal" aria-label="Close"  onClick={closeModal} >Close</button>
                              </div>
                            </div> */}
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer d-flex">
                    <div className="row">
                      <div className="col-sm">
                        <button type="button" disabled={isUpdate} className="btn btn-outline-primary btn-block" onClick={saveReturns}>Save</button>
                      </div>
                      <div className="col-sm">
                        <button type="button" disabled={!isUpdate} className="btn btn-outline-primary btn-block"  onClick={updateReturns}>Update</button>
                      </div>
                      <div className="col-sm">
                        <button type="button"  className="btn btn-outline-primary btn-block">Reset</button>
                      </div>
                      <div className="col-sm">
                        <button type="button" className="btn btn-outline-primary btn-block" data-dismiss="modal" aria-label="Close" onClick={closeModal} >Close</button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            {/* )} */}

            {/* return success or  failure msg */}
            {showSuccessPopup && (
              <div className="modal fade show" style={{ display: 'block' }} role="dialog" aria-labelledby="successModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="successModalLabel">
                        {respStatus === 'true' ? (
                          <i className="bx bx-check-circle" style={{ color: 'green', marginRight: '10px', fontSize: '24px' }}></i>
                        ) : (
                          <i className="bx bx-x-circle" style={{ color: 'red', marginRight: '10px', fontSize: '24px' }}></i>
                        )}
                        {respStatus}
                      </h5>
                      <button type="button" className="close" onClick={handleSuccessClose} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">

                      {respStatus === 'true' ? (
                        <h5 style={{ color: 'green', marginRight: '10px', fontSize: '24px' }}>Data Save Successfully</h5>
                      ) : (
                        <h5 style={{ color: 'red', marginRight: '10px', fontSize: '24px' }}>Data Save Successfully</h5>
                      )}
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-primary" onClick={handleSuccessClose}>OK</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Import EPF Return Model */}
            <div className="modal fade" id="importReturn" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Uplaod FIles</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="col-md-12">
                      <input className="form-control" type="file" id="formFile" accept=".xlsx, .xls" onChange={handleFileChange} />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={uploadMonthly}>Upload</button>
                  </div>
                </div>
              </div>
            </div>

            <h5 className="mt-4">EPF Return For Month {selectedMonth}-{selectedYear}</h5>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Sn</th>
                  <th scope="col">UAN</th>
                  <th scope="col">Name</th>
                  <th scope="col">Gross Wages</th>
                  <th scope="col">EPF Wages</th>
                  <th scope="col">EDLI Wages</th>
                  <th scope="col">EPS Wages</th>
                  <th scope="col">EE(12%)</th>
                  <th scope="col">ER(3.67%)</th>
                  <th scope="col">EPS(8.33%)</th>
                  <th scope="col">NCP Days</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((employee, index) => (
                  <tr key={index}>
                    <th scope="row">{index}</th>
                    <th scope="row">{employee.ee_uan}</th>
                    <td>{employee.er_name}</td>
                    <td>{employee.gross_wages}</td>
                    <td>{employee.epf_wages}</td>
                    <td>{employee.edli_wages}</td>
                    <td>{employee.eps_wages}</td>
                    <td>{employee.ee_share}</td>
                    <td>{employee.diff_share}</td>
                    <td>{employee.eps_share}</td>
                    <td>{employee.ncp_days}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button className="btn btn-light" data-toggle="modal" data-target="#exampleModal" onClick={() => { fetchReturn(employee.id) }}>
                          <i className="bi bi-eye text-info"></i>
                        </button>
                        <button className="btn btn-light mx-1" data-toggle="modal" data-target="#exampleModal" onClick={() => { fetchReturn(employee.id) }}>
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
      )}

    </div>
  );
};

export default summary;