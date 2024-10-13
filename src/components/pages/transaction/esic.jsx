/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react"
import { getErId, getEstId } from "../Auth/authToken";
import { fillEsicReturn, getEmployeeByEsic,  getEmployer, getEsicReturns, uploadSalary } from "../../api/services";
import React, { useRef } from 'react';
import "./style.css"
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';


const esic = () => {

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
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Success popup state
  const [showEsicPage, setShowEsicPage] = useState(false);

  const [isUpdate, set_isUpdate] = useState(false)
  const [isSaveEnable, set_isSaveEnable] = useState(false)
  const [SearchEE, setSearchEE] = useState('')
  const [ee_id, set_ee_id] = useState('');
  
  const [ee_name, set_ee_name] = useState('');
  // const [ee_esic_no, set_ee_esic_no] = useState('');
  const [ee_dob, set_ee_dob] = useState('');
  const [ee_doj, set_ee_doj] = useState('');
  const [ee_gender, set_ee_gender] = useState('');
  const [ee_maritial_status, set_ee_maritial_status] = useState('');
  const [ee_father_husband, set_ee_father_husband] = useState('');
  const [cal_gross_wages, set_cal_gross_wages] = useState('');
  const [ee_esic, set_ee_esic] = useState('');
  const [er_esic, set_er_esic] = useState('');
  const [search_esic, set_search_esic] = useState('');
  const [noOfDays, set_noOfDays] = useState('');
  const [editable, set_editable] = useState(false);



  const [editableIndex, setEditableIndex] = useState(null);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await getEsicReturn()
    };

    fetchData();

  }, []);


  const calculation = async (value) => {
    // api call
    try {
      const params = {
        "est_epf_id": getEstId()
      }
      const userData = await getEmployer(params);
      const esic_wages = value;

      set_ee_esic(esic_wages * userData.data.ee_esic / 100)
      set_er_esic(esic_wages *userData.data. er_esic / 100)

    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
  };
  const getEsicReturn = async () => {
    // api call
    try {
      const params = {
        "id": getErId()
      }
      const userData = await getEsicReturns(params);
      if (userData.status === true) {
        setEmployeeData(userData.data);

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

  const fetchEmployee = async () => {
    // api call
    try {

      const params = {
        "est_id": getErId(),
        "ee_esic_no": search_esic
      }
      const userData = await getEmployeeByEsic(params);

      if (userData.status === true) {
       
        set_ee_id(userData.data.id);
        set_ee_name(userData.data.ee_name);
        set_ee_dob(userData.data.ee_dob);
        set_ee_doj(userData.data.ee_doj);
        set_ee_gender(userData.data.ee_gender);
        set_ee_maritial_status(userData.data.ee_maritial_status);
        set_ee_father_husband(userData.data.ee_father_husband);
        // const currentDate = moment();
        // const yearDifference = currentDate.diff(moment(userData.data.ee_dob, 'YYYY-MM-DD'), 'years');
        // // alert(moment(userData.data.ee_dob, 'YYYY-MM-DD') + yearDifference)

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

  const saveReturns = async () => {
    // api call
    try {
      const params = {
        est_id: getErId(),
        ee_id: ee_id,
        ee_esic_no: search_esic,
        month: selectedMonth,
        year: selectedYear,
        dayspresent: noOfDays,
        gross_wages: cal_gross_wages,
        ee_share: ee_esic,
        er_share: er_esic,
      }
      const userData = await fillEsicReturn(params);
      if (userData.status === true) {
        setEmployeeData(userData.data);

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

  const updateReturns = async () => {
    // api call
    try {
      const params = {
        est_id: getErId(),
        ee_id: ee_id,
        ee_esic_no: search_esic,
        month: selectedMonth,
        year: selectedYear,
        dayspresent: noOfDays,
        gross_wages: cal_gross_wages,
        ee_share: ee_esic,
        er_share: er_esic,
      }
      const userData = await getEsicReturns(params);
      if (userData.status === true) {
        setEmployeeData(userData.data);

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
  const uploadEsicMonthly = async () => {
    // api call
    try {
      const params = {
        "id": getErId()
      }
      const userData = await getEsicReturns(params);
      if (userData.status === true) {
        setEmployeeData(userData.data);

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
  const addFromPrevious = async () => {
    // api call
    try {
      const params = {
        "id": getErId()
      }
      const userData = await getEsicReturns(params);
      if (userData.status === true) {
        setEmployeeData(userData.data);

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
  const fetchReturn = async () => {
    // api call
    try {
      const params = {
        "id": getErId()
      }
      const userData = await getEsicReturns(params);
      if (userData.status === true) {
        setEmployeeData(userData.data);

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

  const deleteReturn = async () => {
    // api call
    try {
      const params = {
        "id": getErId()
      }
      const userData = await getEsicReturns(params);
      if (userData.status === true) {
        setEmployeeData(userData.data);

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

  const searchMonthlyEE = async () => {
    // api call
    try {
      const params = {
        "id": getErId()
      }
      const userData = await getEsicReturns(params);
      if (userData.status === true) {
        setEmployeeData(userData.data);

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
  const showEsicReturnPage = async () => {
    // api call
    try {
      setShowEsicPage(true);
      const params = {
        "id": getErId()
      }
      const userData = await getEsicReturns(params);
      if (userData.status === true) {
        setEmployeeData(userData.data);

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

  const showEsicSummary = async () => {
    // api call
    try {
      setShowEsicPage(false);

    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
  };


  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };


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


  const handleSuccessClose = () => setShowSuccessPopup(false);


  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // getReturnByMonth(pageNumber);
  };

  const handleEditClick = (index) => {
    setEditableIndex(index);
    // Initialize form values with the current row's data
    setFormValues(employeeData[index]);
  };

  const handleInputChange = (e, field) => {
    setFormValues({ ...formValues, [field]: e.target.value });
  };

  const handleSaveClick = (index) => {
    // Here you would save the changes, e.g., update the employeeData
    // For now, just reset the editable index
    setEditableIndex(null);
    console.log('Updated Data:', formValues);
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



    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
  }



  const exportToExcel = () => {
    // Get the table element
    const table = document.getElementById('tableToExport');

    // Create a workbook and a worksheet from the table
    const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

    // Write the workbook to a file
    XLSX.writeFile(wb, 'table.xlsx');
  };

  return (

    <div>{!showEsicPage ? (
      <div className="main-container">
        <div className='main-title'>
          <h3>ESIC Return Filing</h3>
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
              <button type="button" className="btn btn-outline-primary btn-block rounded-4" onClick={showEsicReturnPage} >Next
                {/* <Link to="/auth/dashboard/monthlypf"><span >Next</span></Link> */}
              </button>
            </div>
            <div className="col-sm-2">
              <button
                type="file"
                className="btn btn-outline-primary btn-block rounded-4" data-toggle="modal" data-target="#importReturn"
              >
                Import
              </button>
            </div>

          </div>


          {/* Import Salary Return Model */}
          <div className="modal fade bd-example-modal-lg" id="importReturn" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
          <h5 className="mt-4">ESIC Return</h5>
          <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Sn</th>
          <th scope="col">MM-YY</th>
          <th scope="col">ESIC No</th>
          <th scope="col">Employee Name</th>
          <th scope="col">Days</th>
          <th scope="col">Gross</th>
          <th scope="col">EE Share</th>
          <th scope="col">ER Share</th>
          <th scope="col">Reason</th>
          <th scope="col">Date</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {employeeData.map((employee, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{employee.month}-{employee.year}</td>
            <td>{employee.esicNo}</td>
            <td>{employee.employeeName}</td>
            {editableIndex !== index ? ( <td>{employee.days}     </td>):(
              <td>  <input 
                type="number" 
                className="form-control rounded-4" 
                disabled={editableIndex !== index} 
                onChange={(e) => handleInputChange(e, 'days')} 
                value={editableIndex === index ? formValues.days : employee.days}
              /> </td>
            )}
           
            {editableIndex !== index ? ( <td>{employee.gross_wages}     </td>):(
              <td> <input 
                type="number" 
                className="form-control rounded-4" 
                disabled={editableIndex !== index} 
                onChange={(e) => handleInputChange(e, 'gross')} 
                value={editableIndex === index ? formValues.gross : employee.gross_wages}
              />    </td>
            )}
              
        
            <td>{employee.ee_share}</td>
            <td>{employee.er_share}</td>

            {editableIndex !== index ? ( <td>{employee.reason}     </td>):(
              <td> <input 
                type="text" 
                className="form-control rounded-4" 
                disabled 
                value={employee.reason}
              /></td>
            )}
            {editableIndex !== index ? ( <td>{employee.date}     </td>):(
              <td> <input 
                type="date" 
                className="form-control rounded-4" 
                disabled 
                value={employee.date}
              /></td>
            )}
        
            <td>
              <div className="d-flex align-items-center">
                <button className="btn btn-light" onClick={() => { }}>
                  <i className="bi bi-eye text-info"></i>
                </button>
                <button 
                  className="btn btn-light mx-1" 
                  onClick={() => handleEditClick(index)}
                >
                  <i className="bi bi-pencil-fill text-info"></i>
                </button>
                <button 
                  className="btn btn-light" 
                  disabled
                >
                  <i className="bi bi-trash text-danger"></i>
                </button>
                {editableIndex === index && (
                  <button 
                    className="btn btn-light mx-1" 
                    onClick={() => handleSaveClick(index)}
                  >
                    <i className="bi bi-check text-success"></i>
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
        </section>
      </div>) : (
      <div className="main-container">
        <div className='main-title'>
          <h3>Esic Return Filing</h3>
        </div>
        <section className="section">
          <br />
          <div className="row">
            <div className="col-sm">
              <button type="button" className="btn btn-outline-primary btn-block rounded-4 " onClick={openModal}>
                Add ({selectedMonth}-{selectedYear})
              </button>
            </div>
            <div className="col-sm">
              <button
                type="file"
                className="btn btn-outline-primary btn-block rounded-4" data-toggle="modal" data-target="#importReturn"
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
                className="btn btn-outline-primary btn-block rounded-4" data-toggle="modal" data-target="#confirmationModal"
              >
                Add From PF
              </button>
            </div>
            <div className="col-sm">
              <button
                type="button"
                className="btn btn-outline-primary btn-block rounded-4" onClick={showEsicSummary}
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
          <div className="modal fade bd-example-modal-lg" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header bg-primary">
                  <h5 className="modal-title" id="exampleModalLabel">ESIC Return Filing For {selectedMonth}-{selectedYear}</h5>
                  <button type="button" className="close text-white" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body text-dark">
                  <div className="row">
                    <div className="col-lg-12">

                      <form>
                        <div className="row">
                          <div className="col-md-4">
                            <input type="number" className="form-control rounded-4" placeholder="Enter ESIC Number" onChange={(e) => set_search_esic(e.target.value)} value={search_esic} />
                          </div>
                          <div className="col-sm">
                            <button type="button" className="btn btn-outline-primary rounded-4" onClick={fetchEmployee}>Search</button>
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

                        </div>

                        <div className="row">
                          <div className="col-sm">
                            <label htmlFor="inputEPFWages">No Of Days</label>
                            <input type="number" className="form-control rounded-4" disabled={isDisabled} onChange={(e) => set_noOfDays(e.target.value)} value={noOfDays} />
                          </div>

                          <div className="col-sm">
                            <label htmlFor="inputColor">Gross Wages</label>
                            <input type="number" className="form-control rounded-4" disabled={isDisabled} onBlur={(e) => calculation(e.target.value)} onChange={(e) => set_cal_gross_wages(e.target.value)} value={cal_gross_wages} />
                          </div>

                          <div className="col mb-3">
                            <label htmlFor="inputPassword">EE(1.75%)</label>
                            <input type="number" className="form-control rounded-4" disabled value={ee_esic} />
                          </div>
                          <div className="col mb-3">
                            <label htmlFor="inputPassword">ER(4.75%)</label>
                            <input type="number" className="form-control rounded-4" disabled value={er_esic} />
                          </div>
                        </div>

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
                      <button type="button" className="btn btn-outline-primary btn-block rounded-4" aria-label="Close" onClick={closeModal} >Close</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
          {/* )} */}


          {/* Import EPF Return Model */}
          {/* <div className="modal fade" id="importReturn" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                  <button type="button" className="btn btn-primary" onClick={uploadEsicMonthly}>Upload</button>
                </div>
              </div>
            </div>
          </div> */}
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
                  <td>{employee.ee_name}</td>
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
                      <button className="btn btn-light" onClick={() => { deleteReturn(employee.id) }} >
                        <i className="bi bi-trash text-danger"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* <tfoot>
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
              </tfoot> */}
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

export default esic;
