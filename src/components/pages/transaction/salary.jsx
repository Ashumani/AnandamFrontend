/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react"
import { getErId, getEstId } from "../Auth/authToken";
import { getEmployeeByUANandEPFid, getSalaryByMonth, getSalaryReturn, getSalarySummary, saveSalaryReturn, uploadSalary } from "../../api/services";
import React, { useRef } from 'react';
import "./style.css"
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

const salary = () => {

  const [employeeData, setEmployeeData] = useState([])
  const returnsYear = {
    "month": [{ "monthNum": 1, "monthText": "Jan" }, { "monthNum": 2, "monthText": "Feb" }, { "monthNum": 3, "monthText": "Mar" }, { "monthNum": 4, "monthText": "Apr" }, { "monthNum": 5, "monthText": "May" }, { "monthNum": 6, "monthText": "Jun" }, { "monthNum": 7, "monthText": "Jul" }, { "monthNum": 8, "monthText": "Aug" }, { "monthNum": 9, "monthText": "Sep" }, { "monthNum": 10, "monthText": "Oct" }, { "monthNum": 11, "monthText": "Nov" }, { "monthNum": 12, "monthText": "Dec" }],
    "Year": [2020, 2021, 2022, 2023, 2024]
  }
  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isDisabled, set_isDisabled] = useState(true);


  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, set_totalPages] = useState(1);

  // Get current items based on the current page
  const [startIndex, set_startIndex] = useState('');
  const [currentItems, set_currentItems] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedYear, setSelectedYear] = useState(2024);

  // xtra
  const [showModal, setShowModal] = useState(false);
  const [summary, IsSummary] = useState(true);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Success popup state

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
  const [ee_sub_id, set_ee_sub_id] = useState('');
  const [isUpdate, set_isUpdate] = useState(true);

  const [ee_rate, set_ee_rate] = useState(0);
  const [ee_basic, set_ee_basic] = useState(0);
  const [ee_da, set_ee_da] = useState(0);
  const [ee_hra, set_ee_hra] = useState(0);
  const [ee_others, set_ee_others] = useState(0);
  const [ee_days, set_ee_days] = useState(0);
  const [ee_ot, set_ee_ot] = useState(0);
  const [ee_epf, set_ee_epf] = useState(0);
  const [ee_esic, set_ee_esic] = useState(0);
  const [ee_adv, set_ee_adv] = useState(0);
  const [ee_tds, set_ee_tds] = useState(0);
  const [ee_deduction, set_ee_deduction] = useState(0);
  const [ee_netpay, set_ee_netpay] = useState(0);
  const [ee_pt, set_ee_pt] = useState(0);
  const [cal_gross_wages, set_cal_gross_wages] = useState(0);
  const [ee_mswf, set_ee_mswf] = useState(0);
  const [ee_sal_id, set_ee_sal_id] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      GetSalarySummary(1);
    };

    fetchData();

  }, []);


  const fetchEmployee = async () => {
    // api call
    try {
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
        set_isDisabled(false)
      }else {
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
      // setError(error);
    }
  };
  const ViewSalaryByMonth = async (pageNumber, month, year) => {
    try {
      setSelectedMonth(month)
      setSelectedYear(year)
      const params = {
        "est_id": getErId(),
        "ee_id": ee_id,
        "month": month,
        "year": year,
        "limit": itemsPerPage,
        "offset": pageNumber
      }
      setEmployeeData([])
      const userData = await getSalaryByMonth(params);
      if (userData.status === true) {
        setEmployeeData(userData.data)
        set_totalPages(Math.ceil(userData.count / itemsPerPage));

        // Get current items based on the current page
        set_startIndex((currentPage - 1) * itemsPerPage);
        set_currentItems(userData.data);

      }
      IsSummary(false)

    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
  }
  const GetSalaryByMonth = async (pageNumber) => {
    // api call
    try {

      const params = {
        "est_id": getErId(),
        "ee_id": ee_id,
        "month": selectedMonth,
        "year": selectedYear,
        "limit": itemsPerPage,
        "offset": pageNumber
      }
      setEmployeeData([])
      const userData = await getSalaryByMonth(params);
      if (userData.status === true) {
        setEmployeeData(userData.data)
        set_totalPages(Math.ceil(userData.count / itemsPerPage));

        // Get current items based on the current page
        set_startIndex((currentPage - 1) * itemsPerPage);
        set_currentItems(userData.data);

      }
      IsSummary(false)

    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
  };

  const GetSalarySummary = async (pageNumber) => {
    // api call
    try {
      const params = {
        "est_id": getErId(),
        "ee_id": 0,
        "month": selectedMonth,
        "year": selectedYear,
        "limit": itemsPerPage,
        "offset": pageNumber
      }
      console.log(params)
      const userData = await getSalarySummary(params);
      if (userData.status === true) {
        setEmployeeData(userData.data)

      }

    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
  };

  const GetSalaryById = async (id) => {
    // api call
    try {

      const userData = await getSalaryReturn(id);
      if (userData.status === true) {
        set_ee_id(userData.data.set_ee_id);
        set_ee_name(userData.data.ee_name);
        set_ee_uan_no(userData.data.ee_uan_no);
        set_search_uan(userData.data.ee_uan_no);
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
        set_ee_rate(userData.data.rate);
        set_ee_basic(userData.data.basic);
        set_ee_da(userData.data.da);
        set_ee_hra(userData.data.hra);
        set_ee_others(userData.data.others);
        set_ee_days(userData.data.days);
        set_ee_ot(userData.data.ot);
        set_ee_epf(userData.data.epf);
        set_ee_esic(userData.data.esic);
        set_ee_adv(userData.data.adv);
        set_ee_tds(userData.data.tds);
        set_ee_deduction(userData.data.deduction);
        set_ee_netpay(userData.data.netpay);
        set_ee_pt(userData.data.pt);
        set_ee_mswf(userData.data.mswf);
        set_cal_gross_wages(userData.data.gross)
        openModal();
        set_isUpdate(false);


      }

    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
  };

  const saveReturns = async () => {
    // api call
    try {
      if (parseInt(ee_basic) < 1 || parseInt(ee_days) < 1) {
        Swal.fire({
          title: 'Warning',
          text: 'Basic salary and Days cannot be zero',
          icon: 'warning',
          confirmButtonText: 'Okay'
        });
        return;
      }
      const params = {
        "ee_id": ee_id,
        "uan": ee_uan_no,
        "est_id": getErId(),
        "month": selectedMonth,
        "year": selectedYear,
        "rate": ee_rate,
        "basic": ee_basic,
        "da": ee_da,
        "hra": ee_hra,
        "others": ee_others,
        "no_of_days": ee_days,
        "ot": ee_ot,
        "gross": cal_gross_wages,
        "pt": ee_pt,
        "pf": ee_epf,
        "esic": ee_esic,
        "adv": ee_adv,
        "tds": ee_tds,
        "mswf": ee_mswf,
        "deduction": ee_deduction,
        "netpay": ee_netpay
      }
      const data = await saveSalaryReturn(params);
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

        // getAll();
      } else {
        const uan = data.data.map((x) => x.ee_uan);
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
      // setError(error);
    }
  };

  const updateReturns = async () => {
    // api call
    try {
      const params = {
        "ee_id": ee_id,
        "uan": ee_uan_no,
        "est_id": getErId(),
        "month": selectedMonth,
        "year": selectedYear,
        "rate": ee_rate,
        "basic": ee_basic,
        "da": ee_da,
        "hra": ee_hra,
        "others": ee_others,
        "no_of_days": ee_days,
        "ot": ee_ot,
        "gross": cal_gross_wages,
        "pt": ee_pt,
        "pf": ee_epf,
        "esic": ee_esic,
        "adv": ee_adv,
        "tds": ee_tds,
        "mswf": ee_mswf,
        "deduction": ee_deduction,
        "netpay": ee_netpay
      }
      const data = await saveSalaryReturn(ee_sal_id, params);
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

        // getAll();
      } else {
        const uan = data.data.map((x) => x.ee_uan);
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
      // setError(error);
    }
  };


  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  //   getReturnByMonth(pageNumber);
  // };



  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const calculation = async () => {
    const pf = (parseInt(ee_basic) + parseInt(ee_da)) * 12 / 100
    const gross = parseInt(ee_basic) + parseInt(ee_da) + parseInt(ee_hra) + parseInt(ee_others) + parseInt(ee_ot)
    const esic = Math.round(gross * 0.75 / 100)
    let pt = 0
    if (set_ee_gender == "Male") {
      if (gross < 7500) {
        pt = 200
      } else if (gross > 7499 && gross < 10000) {
        pt = 175
      } else {
        pt = 200
      }
    } else {
      if (gross > 24499) {
        pt = 200
      } else {
        pt = 0
      }
    }

    const deduction = pf + esic + parseInt(ee_adv) + parseInt(ee_tds) + pt
    set_ee_epf(pf)
    set_ee_esic(esic)
    set_cal_gross_wages(gross)
    if (parseInt(selectedMonth) == 6 || parseInt(selectedMonth) == 12) {
      set_ee_mswf(20)
    }

    set_ee_pt(pt)

    if (parseInt(cal_gross_wages) <= 10000) {
      set_ee_tds(0)
    } else if (parseInt(cal_gross_wages) <= 20000) {
      set_ee_tds(parseInt(cal_gross_wages) - 10000) * 0.1
    } else {
      set_ee_tds((10000 * 0.1) + (parseInt(cal_gross_wages) - 20000) * 0.2)
    }
    set_ee_netpay(gross - deduction)
    set_ee_deduction(deduction)
  }

  const SummaryBack = async () => {
    GetSalarySummary(1);
    IsSummary(true)

  }
  const reset = async () => {
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
    set_ee_rate(0)
    set_ee_basic(0)
    set_ee_da(0)
    set_ee_hra(0)
    set_ee_others(0)
    set_ee_days(0)
    set_ee_ot(0)
    set_ee_epf(0)
    set_ee_esic(0)
    set_ee_adv(0)
    set_ee_tds(0)
    set_ee_deduction(0)
    set_ee_netpay(0)
    set_ee_pt(0)
    set_ee_mswf(0)

  }

  const handleShow = () => { setShowModal(true) };
  const handleClose = () => { setShowModal(false), reset(); }
  const handleSuccessClose = () => setShowSuccessPopup(false);


  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadSalaryReturn = async () => {
    if (!file) {
      alert('Please choose a file first.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      const id = getErId()

      // console.log('======', params)

      const data = await uploadSalary(id, formData);
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

        // getAll();
      } else {
        const uan = data.data.map((x) => x.ee_uan);
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
      // setError(error);
    }
  }


  const closeModal = () => {
    window.location.reload();
    const modalElement = modalRef.current;
    if (modalElement) {
      // eslint-disable-next-line no-undef
      const modal = new bootstrap.Modal(modalElement);
      modal.close();
    }
  };

  const openModal = () => {
    const modalElement = modalRef.current;
    // console.log(modalElement)
    if (modalElement) {
      // eslint-disable-next-line no-undef
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  };


  const exportToExcel = () => {
    // Get the table element
    const table = document.getElementById('tableToExport');

    // Create a workbook and a worksheet from the table
    const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    // Write the workbook to a file
    XLSX.writeFile(wb, 'table.xlsx');
  };

  return (
    <div>
      {summary ? (
        <div className="main-container">
          <div className='main-title'>
            <h3>Return Filing</h3>
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
                <button type="button" className="btn btn-outline-primary btn-block" onClick={() => { GetSalaryByMonth(1) }} >Next
                  {/* <Link to="/auth/dashboard/monthlypf"><span >Next</span></Link> */}
                </button>
              </div>
              <div className="col-sm-2">
                <button
                  type="file"
                  className="btn btn-outline-primary btn-block" data-toggle="modal" data-target="#importReturn"
                >
                  Import
                </button>
              </div>

            </div>

            {/* return success or  failure msg */}
            {showSuccessPopup && (
              <div className="modal fade show" style={{ display: 'block' }} role="dialog" aria-labelledby="successModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="successModalLabel">Success</h5>
                      <button type="button" className="close" onClick={handleSuccessClose} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <p>Data has been saved successfully!</p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-primary" onClick={handleSuccessClose}>OK</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Import Salary Return Model */}
            <div className="modal fade" id="importReturn" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    ...
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                  </div>
                </div>
              </div>
            </div>
            <h5 className="mt-4">Salary Summary</h5>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Sn</th>
                  <th scope="col">MM-YY</th>
                  <th scope="col">EE</th>
                  <th scope="col">Rate</th>
                  <th scope="col">Basic</th>
                  <th scope="col">DA</th>
                  <th scope="col">HRA</th>
                  <th scope="col">Others</th>
                  <th scope="col">No of Days</th>
                  <th scope="col">OT</th>
                  <th scope="col">Gross</th>
                  <th scope="col">PT</th>
                  <th scope="col">PF</th>
                  <th scope="col">ESIC</th>
                  <th scope="col">Adv</th>
                  <th scope="col">TDS</th>
                  <th scope="col">MSWF</th>
                  <th scope="col">Tot Deduct.</th>
                  <th scope="col">Net Pay</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {employeeData.map((employee, index) => (
                  <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{employee.month}-{employee.year}</td>
                    <td>{employee.totalee}</td>
                    <td>{employee.totalgross}</td>
                    <td>{employee.totalbasic}</td>
                    <td>{employee.totalda}</td>
                    <td>{employee.totalhra}</td>
                    <td>{employee.totalothers}</td>
                    <td>{employee.totalno_of_days}</td>
                    <td>{employee.totalot}</td>
                    <td>{employee.totalgross}</td>
                    <td>{employee.totalpt}</td>
                    <td>{employee.totalpf}</td>
                    <td>{employee.totalesic}</td>
                    <td>{employee.totaladv}</td>
                    <td>{employee.totaltds}</td>
                    <td>{employee.totalmswf}</td>
                    <td>{employee.totaldeduction}</td>
                    <td>{employee.totalnetpay}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button className="btn btn-light" onClick={() => { ViewSalaryByMonth(1, employee.month, employee.year) }}>
                          <i className="bi bi-eye text-info"></i>
                        </button>
                        <button className="btn btn-light mx-1" onClick={() => { ViewSalaryByMonth(1, employee.month, employee.year) }}>
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
          </section>
        </div>
      ) : (
        <div className="main-container">
          <div className='main-title'>
            <h3>Salary Filing</h3>
          </div>
          <section className="section">
            <br />
            <div className="row">
              <div className="col-sm">
                <button type="button" className="btn btn-outline-primary btn-block" data-toggle="modal" data-target="#exampleModal" onClick={handleShow}>
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
                  className="btn btn-outline-primary btn-block" onClick={exportToExcel}
                >
                  Export
                </button>
              </div>
              <div className="col-sm">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-block" data-toggle="modal" data-target="#importReturn"
                >
                  ECR
                </button>
              </div>
              <div className="col-sm">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-block" onClick={SummaryBack}
                >
                  BACK
                </button>
              </div>
              {/* <div className="col-md-4">
              <input className="form-control" type="file" id="formFile" />

            </div> */}
            </div>

            {/* Add Epf Return Model */}

            {isModalOpen && (<div className="modal fade bd-example-modal-lg" id="exampleModal" ref={modalRef} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header bg-primary">
                    <h5 className="modal-title text-white" id="exampleModalLabel">Salary Return Filing For {selectedMonth}-{selectedYear}</h5>
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
                              <label htmlFor="inputPassword">Rate</label>
                              <input type="number" className="form-control" disabled={isDisabled} onChange={(e) => set_ee_rate(e.target.value)} value={ee_rate} />
                            </div>
                            <div className="col-sm">
                              <label htmlFor="inputPassword">Basic</label>
                              <input type="number" className="form-control" disabled={isDisabled} id="basic" onBlur={calculation} onChange={(e) => { set_ee_basic(e.target.value) }} value={ee_basic} />
                            </div>
                            <div className="col-sm">
                              <label htmlFor="inputPassword">DA</label>
                              <input type="number" className="form-control" disabled={isDisabled} id="da" onBlur={calculation} onChange={(e) => { set_ee_da(e.target.value) }} value={ee_da} />
                            </div>
                            <div className="col-sm">
                              <label htmlFor="inputPassword">HRA</label>
                              <input type="number" className="form-control" disabled={isDisabled} id="hra" onBlur={calculation} onChange={(e) => { set_ee_hra(e.target.value) }} value={ee_hra} />
                            </div>
                            <div className="col-sm">
                              <label htmlFor="inputPassword">Others</label>
                              <input type="number" className="form-control" disabled={isDisabled} id="others" onBlur={calculation} onChange={(e) => { set_ee_others(e.target.value) }} value={ee_others} />
                            </div>
                            <div className="col-sm">
                              <label htmlFor="inputPassword">Days</label>
                              <input type="number" className="form-control" disabled={isDisabled} id="days" onChange={(e) => set_ee_days(e.target.value)} value={ee_days} />
                            </div>
                            <div className="col-sm">
                              <label htmlFor="inputPassword">OT</label>
                              <input type="number" className="form-control" disabled={isDisabled} id="ot" onBlur={calculation} onChange={(e) => { set_ee_ot(e.target.value); }} value={ee_ot} />
                            </div>
                            <div className="col-sm">
                              <label htmlFor="inputColor">Gross Wages</label>
                              <input type="number" className="form-control" id="gross" disabled onChange={(e) => { set_cal_gross_wages(e.target.value); }} value={cal_gross_wages} />
                            </div>

                          </div>
                          <div className="row">
                            <div className="col-sm">
                              <label htmlFor="inputEPFWages">PT</label>
                              <input type="number" className="form-control" disabled onChange={(e) => set_ee_pt(e.target.value)} value={ee_pt} />
                            </div>

                            <div className="col-sm">
                              <label htmlFor="inputPassword">PF</label>
                              <input type="number" className="form-control" disabled onChange={(e) => set_ee_epf(e.target.value)} value={ee_epf} />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputPassword">ESIC</label>
                              <input type="number" className="form-control" disabled onChange={(e) => set_ee_esic(e.target.value)} value={ee_esic} />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputPassword">Adv</label>
                              <input type="number" className="form-control" disabled={isDisabled}  onChange={(e) => set_ee_adv(e.target.value)} value={ee_adv} />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputPassword">TDS</label>
                              <input type="number" className="form-control" disabled onChange={(e) => set_ee_tds(e.target.value)} value={ee_tds} />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputPassword">MSWF</label>
                              <input type="number" className="form-control" disabled onChange={(e) => set_ee_mswf(e.target.value)} value={ee_mswf} />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputPassword">Deduction</label>
                              <input type="number" className="form-control" disabled onChange={(e) => set_ee_deduction(e.target.value)} value={ee_deduction} />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputPassword">NetPay</label>
                              <input type="number" className="form-control" disabled onChange={(e) => set_ee_netpay(e.target.value)} value={ee_netpay} />
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
                        <button type="button" disabled={!isUpdate || isDisabled} className="btn btn-outline-primary btn-block" onClick={saveReturns}>Save</button>
                      </div>
                      <div className="col-sm">
                        <button type="button" disabled={isUpdate} className="btn btn-outline-primary btn-block" onClick={updateReturns}>Update</button>
                      </div>
                      <div className="col-sm">
                        <button type="button" className="btn btn-outline-primary btn-block">Reset</button>
                      </div>
                      <div className="col-sm">
                        <button type="button" className="btn btn-outline-primary btn-block" aria-label="Close" onClick={closeModal} >Close</button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>)}


            {/* return success or  failure msg */}
            {showSuccessPopup && (
              <div className="modal fade show" style={{ display: 'block' }} role="dialog" aria-labelledby="successModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="successModalLabel">Success</h5>
                      <button type="button" className="close" onClick={handleSuccessClose} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <p>Data has been saved successfully!</p>
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
                    <button type="button" className="btn btn-primary" onClick={uploadSalaryReturn}>Upload</button>
                  </div>
                </div>
              </div>
            </div>
            <h5 className="mt-4">Salary For Month {selectedMonth}-{selectedYear}</h5>
            <table className="table table-striped" id="tableToExport">
              <thead>
                <tr>
                  <th scope="col">Sn</th>
                  <th scope="col">UAN</th>
                  <th scope="col">Name</th>
                  <th scope="col">Rate</th>
                  <th scope="col">Basic</th>
                  <th scope="col">DA</th>
                  <th scope="col">HRA</th>
                  <th scope="col">Others</th>
                  <th scope="col">No of Days</th>
                  <th scope="col">OT</th>
                  <th scope="col">Gross</th>
                  <th scope="col">PT</th>
                  <th scope="col">PF</th>
                  <th scope="col">ESIC</th>
                  <th scope="col">Adv</th>
                  <th scope="col">TDS</th>
                  <th scope="col">MSWF</th>
                  <th scope="col">Tot Deduct.</th>
                  <th scope="col">Net Pay</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {employeeData.map((employee, index) => (
                  <tr key={index}>
                    <th scope="row">{index}</th>
                    <th scope="row">{employee.uan}</th>
                    <td>{employee.ee_name}</td>
                    <td>{employee.rate}</td>
                    <td>{employee.basic}</td>
                    <td>{employee.da}</td>
                    <td>{employee.hra}</td>
                    <td>{employee.others}</td>
                    <td>{employee.no_of_days}</td>
                    <td>{employee.ot}</td>
                    <td>{employee.gross}</td>
                    <td>{employee.pt}</td>
                    <td>{employee.pf}</td>
                    <td>{employee.esic}</td>
                    <td>{employee.adv}</td>
                    <td>{employee.tds}</td>
                    <td>{employee.mswf}</td>
                    <td>{employee.deduction}</td>
                    <td>{employee.netpay}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button className="btn btn-light" onClick={() => { GetSalaryById(employee.id) }}>
                          <i className="bi bi-eye text-info"></i>
                        </button>
                        <button className="btn btn-light mx-1" onClick={() => { GetSalaryById(employee.id) }}>
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
          </section>
        </div>
      )}
    </div>
  );
};

export default salary;
