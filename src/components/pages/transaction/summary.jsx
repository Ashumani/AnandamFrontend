/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from "react"
import { getErId, getEstId } from "../Auth/authToken";
import { getEmployeeByUANandEPFid, getEpfReturnByMonth, getEmployer, fillEpfReturn, uploadMonthlyReturn, getSummary, downlaodFile, fetchEpfReturn, updateEpfReturn, sameAsPrev, deleteReturnById, generateECR, searchMonthlyEmployee, getYear } from "../../api/services";
import Swal from 'sweetalert2';
import React, { useRef } from 'react';
import moment from "moment";

const summary = () => {


  const returnsYear = {
    "month": [{ "monthNum": 1, "monthText": "Jan" }, { "monthNum": 2, "monthText": "Feb" }, { "monthNum": 3, "monthText": "Mar" }, { "monthNum": 4, "monthText": "Apr" }, { "monthNum": 5, "monthText": "May" }, { "monthNum": 6, "monthText": "Jun" }, { "monthNum": 7, "monthText": "Jul" }, { "monthNum": 8, "monthText": "Aug" }, { "monthNum": 9, "monthText": "Sep" }, { "monthNum": 10, "monthText": "Oct" }, { "monthNum": 11, "monthText": "Nov" }, { "monthNum": 12, "monthText": "Dec" }],
    "Year": [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]
  }
  const [ee_above58, set_ee_above58] = useState('')
  const [returnsYearInSystem, set_returnsYearInSystem] = useState([])
  const [isDisabled, set_isDisabled] = useState(true);
  const [isSaveEnable, set_isSaveEnable] = useState(true);

  const modalRef = useRef(null);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedReturnYear, setSelectedRturnYear] = useState('');
  const[selectedSubId, set_selectedSubId] = useState(0)
  const [sub_Ids, set_sub_Ids] = useState([])

  const itemsPerPage = 10; // Number of items per page
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
  const [searchEE, setSearchEE] = useState('Success');
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
  const [total_acc, set_total_acc] = useState('');

  const [total_gross_wages, set_total_gross_wages] = useState(0)
  const [total_epf_wages, set_total_epf_wages] = useState(0)
  const [total_edli_wages, set_total_edli_wages] = useState(0)
  const [total_eps_wages, set_total_eps_wages] = useState(0)
  const [total_ee_share, set_total_ee_share] = useState(0)
  const [total_eps_share, set_total_eps_share] = useState(0)
  const [total_diff_share, set_total_diff_share] = useState(0)
  const [total_ncp_days, set_total_ncp_days] = useState(0)
  const [total_refund, set_total_refund] = useState(0)


  useEffect(() => {
    const fetchData = async () => {
      getAllSummary();
      getAllYear();
    };

    fetchData();

  }, []);

  const getAllSummary = async () => {
    // api call
    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await getSummary(getErId(), selectedYear);
      if (response.status == true) {
        set_totalPages(Math.ceil(response.count / itemsPerPage));
        set_currentItems(response.data);
        set_total_acc1(response.total.total_acc1);
        set_total_acc2(response.total.total_acc2);
        set_total_acc10(response.total.total_acc10);
        set_total_acc21(response.total.total_acc21);
        set_total_acc22(response.total.total_acc22);
        set_total_acc(response.total.total_acc);

      }


    } catch (error) {
      console.error('Error fetching data:', error);

    }
  };

  const getAllYear = async () => {
    // api call
    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await getYear(getErId());

      set_returnsYearInSystem(response.data)
      set_sub_Ids(response.est_sub_id)
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
        const currentDate = moment();
        const yearDifference = currentDate.diff(moment(userData.data.ee_dob, 'YYYY-MM-DD'), 'years');
        set_ee_above58(yearDifference > 58 ? 'Yes' : 'No')
        // alert(moment(userData.data.ee_dob, 'YYYY-MM-DD') + yearDifference)

        set_isDisabled(false)


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
      // setError(error);
    }
  };

  const fetchReturn = async (id) => {
    // api call
    try {
      reset1();
      set_isUpdate(true);
      openModal('EpfReturnFillingModel')
      const userData = await fetchEpfReturn(id);
      if (userData.status === true) {
        const currentDate = moment();
        const yearDifference = currentDate.diff(moment(userData.data.ee_dob, 'DD-MM-YYYY'), 'years');
        set_ee_above58(yearDifference > 58 ? 'Yes' : 'No')
        set_eReturn_id(userData.data.id);
        set_ee_id(userData.data.ee_id);
        set_ee_name(userData.data.ee_name);
        set_ee_uan_no(userData.data.ee_uan);
        set_search_uan(userData.data.ee_uan)
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
        set_isDisabled(false)
      }

    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
  };


  const [err, setErrors] = useState({})

  const validate = async () => {

    try {

      var valid = true;
      var t = {};

      // Check for required fields
      if (!ee_uan_no) {
        t.ee_uan_no = "ee_uan_no is required";
        valid = false;
      }

      if (!ee_name) {
        t.ee_name = "ee_name is required";
        valid = false;
      }

      if (!selectedMonth) {
        t.selectedMonth = "selectedMonth is required";
        valid = false;
      }

      if (!selectedYear) {
        t.selectedYear = "selectedYear is required";
        valid = false;
      }

      if (!cal_gross_wages) {
        t.cal_gross_wages = "cal_gross_wages is required";
        valid = false;
      }

      if (!cal_epf_wages) {
        t.cal_epf_wages = "cal_epf_wages is required";
        valid = false;
      }

      if (!ee_edli_wages) {
        t.ee_edli_wages = "ee_edli_wages is required";
        valid = false;
      }

      if (!ee_epf) {
        t.ee_epf = "ee_epf is required";
        valid = false;
      }

      if (!er_epf) {
        t.er_epf = "er_epf is required";
        valid = false;
      }

      if (!er_eps) {
        t.er_eps = "er_eps is required";
        valid = false;
      }
      setErrors(t)
      return valid
    } catch (error) {
      throw new Error()
    }
  }

  const saveReturns = async () => {
    // api call
    try {

      const valid = await validate()

      if (!valid) {
        Swal.fire({
          title: 'Error',
          text: 'Mandatory parameters are required : ',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      } else {
        const params = {
          "est_id": getErId(),
          "ee_id": ee_id,
          "ee_uan": ee_uan_no,
          "est_epf_id": getEstId(),
          "ee_name": ee_name,
          "month": selectedMonth,
          "year": selectedYear,
          "gross_wages": cal_gross_wages,
          "epf_wages": cal_epf_wages,
          "edli_wages": ee_edli_wages,
          "eps_wages": ee_eps_wages,
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
          getReturnByMonth(1, selectedMonth, selectedYear)

          closeModal('EpfReturnFillingModel');


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
      }

      // Show success popup



    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
  };

  const addFromPrevious = async () => {
    // api call
    try {
      const params = {
        "est_id": getErId(),
        "ee_id": 0,
        "month": selectedMonth,
        "year": selectedYear
      }
      const userData = await sameAsPrev(params);

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
        getReturnByMonth(1, selectedMonth, selectedYear)

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

  const deleteReturn = async (id) => {
    // api call
    try {

      const userData = await deleteReturnById(id);

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
        getReturnByMonth(1, selectedMonth, selectedYear)



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


      const valid = true //await validate()

      if (!valid) {
        Swal.fire({
          title: 'Error',
          text: 'Mandatory parameters are required : ',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      } else {

        const params = {
          "id": eReturn_id,
          "est_id": getErId(),
          "ee_id": ee_id,
          "ee_uan": ee_uan_no,
          "est_epf_id": getEstId(),
          "ee_name": ee_name,
          "month": selectedMonth,
          "year": selectedYear,
          "gross_wages": cal_gross_wages,
          "epf_wages": cal_epf_wages,
          "edli_wages": ee_edli_wages,
          "eps_wages": ee_eps_wages,
          "ee_share": ee_epf,
          "diff_share": er_epf,
          "eps_share": er_eps,
          "ncp_days": 0
        }
        const userData = await updateEpfReturn(eReturn_id, params);

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
          getReturnByMonth(1, selectedMonth, selectedYear)

          closeModal('EpfReturnFillingModel');

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
      }


    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
  };

  const genECR = async (month, year) => {
    // api call
    try {
      const params = {
        "est_id": getErId(),
        "ee_id": 0,
        "month": month,
        "year": year
      }
      const userData = await generateECR(params);

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
      const epfwages_if_above = epf_wages < 15000 ? epf_wages : 15000
      set_ee_eps_wages(epf_wages <= 15000 ? epf_wages : 15000)
      set_ee_edli_wages(epf_wages <= 15000 ? epf_wages : 15000)
      set_ee_epf(Math.round(epf_wages * userData.data.ee_epf_rate / 100))
      let years = moment().diff(ee_dob, 'years');

      if (years > 58) {
        set_er_epf(Math.round(epfwages_if_above * userData.data.ee_epf_rate / 100))
        set_ee_eps_wages(0)
        set_er_eps(0)

      } else {
        set_er_epf(Math.round(epfwages_if_above * userData.data.er_diff_rate / 100))
        set_er_eps(Math.round(epfwages_if_above * userData.data.er_eps_rate / 100))

      }
      set_isSaveEnable(false)

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

  const handleSuccessClose = () => setShowSuccessPopup(false);




  const getReturnByMonth = async (pageNumber, month, year) => {
    // api call
    try {
      setSelectedMonth(month)
      setSelectedYear(year)
      const params = {
        "est_id": getErId(),
        "ee_id": 0,
        "est_sub_id": 0,
        "month": month,
        "year": year,
        "limit": itemsPerPage,
        "offset": pageNumber
      }
      const userData = await getEpfReturnByMonth(params);
      setEmployeeData(userData.data)
      setMonthly(false)
      set_totalPages(Math.ceil(userData.count / itemsPerPage));

      // Get current items based on the current page
      set_startIndex((currentPage - 1) * itemsPerPage);
      set_currentItems(userData.data);
      set_total_gross_wages(userData.total.total_gross_wages)
      set_total_epf_wages(userData.total.total_epf_wages)
      set_total_edli_wages(userData.total.total_edli_wages)
      set_total_eps_wages(userData.total.total_eps_wages)
      set_total_ee_share(userData.total.total_ee_share)
      set_total_eps_share(userData.total.total_eps_share)
      set_total_diff_share(userData.total.total_diff_share)
      set_total_ncp_days(userData.total.total_ncp_days)
      set_total_refund(userData.total.total_refund)


    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
  };

  const searchMonthlyEE = async () => {
    // api call
    try {
      const params = {
        "est_id": getErId(),
        "search": searchEE,
        "month": selectedMonth,
        "year": selectedYear,
        "limit": itemsPerPage,
        "offset": 1
      }
      const userData = await searchMonthlyEmployee(params);
      setEmployeeData(userData.data)
      setMonthly(false)
      set_totalPages(Math.ceil(userData.count / itemsPerPage));

      // Get current items based on the current page
      set_startIndex((currentPage - 1) * itemsPerPage);
      set_currentItems(userData.data);
      set_total_gross_wages(userData.total.total_gross_wages)
      set_total_epf_wages(userData.total.total_epf_wages)
      set_total_edli_wages(userData.total.total_edli_wages)
      set_total_eps_wages(userData.total.total_eps_wages)
      set_total_ee_share(userData.total.total_ee_share)
      set_total_eps_share(userData.total.total_eps_share)
      set_total_diff_share(userData.total.total_diff_share)
      set_total_ncp_days(userData.total.total_ncp_days)
      set_total_refund(userData.total.total_refund)


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
        closeModal('importReturn')
        Swal.fire({
          title: data.message,
          icon: 'success',
          confirmButtonText: 'Okay'
        });
        if (monthly) { getAllSummary() } else { getReturnByMonth(1, selectedMonth, selectedYear) }


      } else {
        // const uan = data.data.map((x) => x.ee_uan);

        Swal.fire({
          title: data.message,
          icon: 'error',
          confirmButtonText: 'Okay'

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
    getReturnByMonth(pageNumber, selectedMonth, selectedYear);
  };



  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleReturnYearChange = (e) => {
    setSelectedRturnYear(e.target.value);
  };

 
  const handleSelectSubIdChange = (e) => {
    set_selectedSubId(e.target.value);
  };



  const closeModal = (modelName) => {
    var modal = document.getElementById(modelName);
    var bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();
    reset1()
  };

  const openModal = (modelName) => {
    var modal = document.getElementById(modelName);
    var bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
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
                  className="form-select rounded-4"
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
                  className="form-select rounded-4"
                  aria-label="Default select example" value={selectedYear} onChange={handleYearChange}
                >
                  {returnsYear.Year.map((retYear) => (
                    // eslint-disable-next-line react/jsx-key
                    <option value={retYear}>{retYear}</option>
                  ))}
                </select>
              </div>
              <div className="col-sm-2">
                <button type="button" className="btn btn-outline-primary btn-block rounded-4 rounded-4" onClick={() => { getReturnByMonth(1, selectedMonth, selectedYear) }} >Next
                  {/* <Link to="/auth/dashboard/monthlypf"><span >Next</span></Link> */}
                </button>
              </div>
              <div className="col-sm-2">
                <button
                  type="file"
                  className="btn btn-outline-primary btn-block rounded-4 rounded-4" onClick={() => { openModal('importReturn') }}
                >
                  Import
                </button>
              </div>

            </div>
            <div className="modal fade" id="importReturn" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Uplaod FIles</h5>
                    <button type="button" className="close" onClick={() => { closeModal('importReturn') }} aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="col-md-12">
                      <input className="form-control rounded-4" type="file" id="formFile" accept=".xlsx, .xls" onChange={handleFileChange} />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => { closeModal('importReturn') }}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={uploadMonthly}>Upload</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4 mb-2">
              <div className="col-sm">

                <h5 >EPF Summary </h5>
              </div>
              <div className="col-sm-3">
                <select
                  className="form-select rounded-4"
                  aria-label="Default select example" value={selectedSubId} onChange={handleSelectSubIdChange}
                >
                  {sub_Ids.map((est_sub_ids) => (
                    // eslint-disable-next-line react/jsx-key
                    <option value={est_sub_ids.est_sub_id}>{est_sub_ids.est_sub_id}</option>
                  ))}
                </select>
              </div>
              <div className="col-sm-3">
                <select
                  className="form-select rounded-4"
                  aria-label="Default select example" value={selectedYear} onChange={handleReturnYearChange}
                >
                  {returnsYearInSystem.map((retYear) => (
                    // eslint-disable-next-line react/jsx-key
                    <option value={retYear.start_months}>{retYear.financial_year}</option>
                  ))}
                </select>
              </div>

            </div>

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
                  <th scope="col">Total</th>
                  <th scope="col">Action</th>
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
                    <td>{employee.total}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button className="btn btn-light" data-toggle="modal" data-target="#exampleModal" onClick={() => { getReturnByMonth(1, moment(employee.month, 'MMM').month() + 1, employee.year) }}>
                          <i className="bi bi-eye text-info"></i>
                        </button>

                        {/* <button className="btn btn-light" onClick={() => { deleteReturn(employee.id) }} >
                          <i className="bi bi-trash text-danger"></i>
                        </button> */}
                        <button className="btn btn-light" onClick={() => { genECR(moment(employee.month, 'MMM').month() + 1, employee.year) }} >
                          <i className="bi bi-download"></i>
                        </button>
                      </div>
                    </td>
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
                  <td>{total_acc}</td>
                  <td></td>
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
                <button type="button" className="btn btn-outline-primary btn-block rounded-4 " onClick={() => { openModal('EpfReturnFillingModel') }}>
                  Add ({selectedMonth}-{selectedYear})
                </button>
              </div>
              <div className="col-sm">
                <button
                  type="file"
                  className="btn btn-outline-primary btn-block rounded-4" onClick={() => { openModal('importReturn') }}
                >
                  Import
                </button>
              </div>
              <div className="col-sm">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-block rounded-4" data-toggle="modal" data-target="#importReturn"
                >
                  Export
                </button>
              </div>
              <div className="col-sm">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-block rounded-4" data-toggle="modal" data-target="#confirmationModal"
                >
                  Same as Prev
                </button>
              </div>
              <div className="col-sm">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-block rounded-4" onClick={() => { genECR(selectedMonth, selectedYear) }}
                >
                  ECR
                </button>
              </div>
              <div className="col-sm">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-block rounded-4" onClick={monthlyBack}
                >
                  BACK
                </button>
              </div>
              <div className="col-sm">
                <input type="text" className="form-control rounded-4" placeholder="Search" onChange={(e) => setSearchEE(e.target.value)} onBlur={searchMonthlyEE} />
              </div>
              {/* <div className="col-md-4">
              <input className="form-control rounded-4" type="file" id="formFile" />

            </div> */}
            </div>

            {/* Add Epf Return Model */}
            {/* {showModal && ( */}
            {/* <div style={{ display: 'block' }} className="modal fade show" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}
            <div className="modal fade bd-example-modal-lg" id="EpfReturnFillingModel" ref={modalRef} role="dialog" aria-labelledby="EpfReturnFillingModelLabel" aria-hidden="true">
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header bg-primary">
                    <h5 className="modal-title" id="EpfReturnFillingModelLabel">EPF Return Filing For {selectedMonth}-{selectedYear}</h5>
                    <button type="button" className="close text-white" aria-label="Close" onClick={() => { closeModal('EpfReturnFillingModel') }}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body text-dark">
                    <div className="row">
                      <div className="col-lg-12">

                        <form>
                          <div className="row">
                            <div className="col-md-4">
                              <input type="number" className="form-control rounded-4" placeholder="Enter UAN Number" onChange={(e) => set_search_uan(e.target.value)} value={search_uan} />
                            </div>
                            <div className="col-md-4">
                              <input type="text" className="form-control rounded-4" placeholder="Enter PF Number" onChange={(e) => set_search_pf(e.target.value)} value={search_pf} />
                            </div>
                            <div className="col-sm">
                              <button type="button" className="btn btn-outline-primary" onClick={fetchEmployee}>Search</button>
                            </div>

                          </div>
                          <div className="row">
                            <div className="col mb-2">
                              <label htmlFor="inputPassword">Name</label>
                              <input type="text" className="form-control rounded-4" disabled onChange={(e) => set_ee_name(e.target.value)} value={ee_name} />
                            </div>
                            <div className="col mb-2">
                              <label htmlFor="inputNumber">Gender</label>
                              <input type="text" className="form-control rounded-4" disabled onChange={(e) => set_ee_gender(e.target.value)} value={ee_gender} />
                            </div>
                            <div className="col mb-2">
                              <label htmlFor="inputNumber">Father/husband</label>
                              <input type="text" className="form-control rounded-4" disabled onChange={(e) => set_ee_father_husband(e.target.value)} value={ee_father_husband} />
                            </div>
                            <div className="col mb-2">
                              <label htmlFor="inputNumber">Maritial Status</label>
                              <input type="text" className="form-control rounded-4" disabled onChange={(e) => set_ee_maritial_status(e.target.value)} value={ee_maritial_status} />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col mb-3">
                              <label htmlFor="inputNumber">Date Of Birth</label>
                              <input type="text" className="form-control rounded-4" disabled onChange={(e) => set_ee_dob(e.target.value)} value={ee_dob} />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputTime">Date Of Joining</label>
                              <input type="text" className="form-control rounded-4" disabled onChange={(e) => set_ee_doj(e.target.value)} value={ee_doj} />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputDate">Above 58</label>
                              <input type="text" className="form-control rounded-4" disabled onChange={(e) => set_ee_above58(e.target.value)} value={ee_above58} />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputColor">Gross Wages</label>
                              <input type="number" className="form-control rounded-4" disabled onChange={(e) => set_ee_gross_wages(e.target.value)} value={ee_gross_wages} />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputPassword">EPF Wages</label>
                              <input type="number" className="form-control rounded-4" disabled onChange={(e) => set_ee_epf_wages(e.target.value)} value={ee_epf_wages} />
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-sm">
                              <label htmlFor="inputColor">Gross Wages</label>
                              <input type="number" className="form-control rounded-4" disabled={isDisabled} onChange={(e) => set_cal_gross_wages(e.target.value)} value={cal_gross_wages} />
                            </div>
                            <div className="col-sm">
                              <label htmlFor="inputEPFWages">EPF Wages</label>
                              <input type="number" className="form-control rounded-4" disabled={isDisabled} onBlur={(e) => calculation(e.target.value)} onChange={(e) => set_cal_epf_wages(e.target.value)} value={cal_epf_wages} />
                            </div>

                            <div className="col-sm">
                              <label htmlFor="inputPassword">EDLI Wages</label>
                              <input type="number" className="form-control rounded-4" disabled value={ee_edli_wages} />
                            </div>
                            <div className="col-sm">
                              <label htmlFor="inputPassword">EPS Wages</label>
                              <input type="number" className="form-control rounded-4" disabled value={ee_eps_wages} />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputPassword">EE</label>
                              <input type="number" className="form-control rounded-4" disabled value={ee_epf} />
                            </div>

                            <div className="col mb-3">
                              <label htmlFor="inputPassword">EPS</label>
                              <input type="number" className="form-control rounded-4" disabled value={er_eps} />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputPassword">ER</label>
                              <input type="number" className="form-control rounded-4" disabled value={er_epf} />
                            </div>
                          </div>
                          {/* <div className="row">
                              <div className="col-sm">
                                <button type="button" className="btn btn-outline-primary btn-block rounded-4" onClick={saveReturns}>Save</button>
                              </div>
                              <div className="col-sm">
                                <button type="button" className="btn btn-outline-primary btn-block rounded-4">Update</button>
                              </div>
                              <div className="col-sm">
                                <button type="button" className="btn btn-outline-primary btn-block rounded-4">Reset</button>
                              </div>
                              <div className="col-sm">
                                <button type="button" className="btn btn-outline-primary btn-block rounded-4" data-dismiss="modal" aria-label="Close"  onClick={() => { closeModal('exampleModal') }} >Close</button>
                              </di  v>
                            </div> */}
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer d-flex">
                    <div className="row">
                      <div className="col-sm">
                        <button type="button" disabled={isUpdate || isSaveEnable} className="btn btn-outline-primary btn-block rounded-4" onClick={saveReturns}>Save</button>
                      </div>
                      <div className="col-sm">
                        <button type="button" disabled={!isUpdate} className="btn btn-outline-primary btn-block rounded-4" onClick={updateReturns}>Update</button>
                      </div>
                      <div className="col-sm">
                        <button type="button" className="btn btn-outline-primary btn-block rounded-4">Reset</button>
                      </div>
                      <div className="col-sm">
                        <button type="button" className="btn btn-outline-primary btn-block rounded-4" aria-label="Close" onClick={() => { closeModal('EpfReturnFillingModel') }} >Close</button>
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
                      <input className="form-control rounded-4" type="file" id="formFile" accept=".xlsx, .xls" onChange={handleFileChange} />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={uploadMonthly}>Upload</button>
                  </div>
                </div>
              </div>
            </div>
            <div id="confirmationModal" className="modal fade">
              <div className="modal-dialog modal-confirm">
                <div className="modal-content">
                  <div className="modal-header">
                    <div className="icon-box">
                      <i className="material-icons">&#xE5CD;</i>
                    </div>
                    <h4 className="modal-title">Are you sure?</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                  </div>
                  <div className="modal-body text-black">
                    <p>Import Prevoius Month data to selected Month</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-info" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-danger" onClick={addFromPrevious}>Add</button>
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
                  <th scope="col">EPS(8.33%)</th>
                  <th scope="col">ER(3.67%)</th>
                  <th scope="col">NCP Days</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>


                {currentItems.map((employee, index) => {
                  const globalIndex = currentPage * itemsPerPage - itemsPerPage + index;
                  return (

                    <tr key={index}>
                      <th scope="row">{globalIndex + 1}</th>
                      <th scope="row">{employee.ee_uan}</th>
                      <td>{employee.ee_name}</td>
                      <td>{employee.gross_wages}</td>
                      <td>{employee.epf_wages}</td>
                      <td>{employee.edli_wages}</td>
                      <td>{employee.eps_wages}</td>
                      <td>{employee.ee_share}</td>
                      <td>{employee.eps_share}</td>
                      <td>{employee.diff_share}</td>
                      <td>{employee.ncp_days}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <button className="btn btn-light" data-toggle="modal" data-target="#exampleModal" onClick={() => { fetchReturn(employee.id) }}>
                            <i className="bi bi-eye text-info"></i>
                          </button>
                          <button className="btn btn-light mx-1" data-toggle="modal" data-target="#exampleModal" onClick={() => { fetchReturn(employee.id) }}>
                            <i className="bi bi-pencil-fill text-info"></i>
                          </button>
                          <button className="btn btn-light" onClick={() => { deleteReturn(employee.id) }} >
                            <i className="bi bi-trash text-danger"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th id="total" colSpan="3">Total :</th>
                  <td>{total_gross_wages}</td>
                  <td>{total_epf_wages}</td>
                  <td>{total_edli_wages}</td>
                  <td>{total_eps_wages}</td>
                  <td>{total_ee_share}</td>
                  <td>{total_eps_share}</td>
                  <td>{total_diff_share}</td>
                  <td>{total_ncp_days}</td>
                  <td></td>
                </tr>
              </tfoot>
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
