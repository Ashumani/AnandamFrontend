/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react"
import { getErId, getEstId } from "../Auth/authToken";
import { getEmployeeByUANandEPFid, getSalaryByMonth, getSalaryReturn, getSalarySummary, saveSalaryReturn, uploadSalary } from "../../api/services";
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


  useEffect(() => {
    const fetchData = async () => {
        await fetchEmployee()
    };

    fetchData();

  }, []);


  const fetchEmployee = async () => {
    // api call
    try {
      const params = {
        "est_id": getErId()
      }
      const userData = await getEmployeeByUANandEPFid(params);
      if (userData.status === true) {
        setEmployeeData(userData.data);
    
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




  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };


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
                <button type="button" className="btn btn-outline-primary btn-block rounded-4" onClick={() => {  }} >Next
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
            <h5 className="mt-4">ESIC Return</h5>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Sn</th>
                  <th scope="col">MM-YY</th>
                  <th scope="col">ESIC No</th>
                  <th scope="col">Employe Name</th>
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
                    <th scope="row">{index}</th>
                    <td>{employee.month}-{employee.year}</td>
                    <td>{employee.month}-{employee.year}</td>
                    <td>{employee.month}-{employee.year}</td>
                    <td>{employee.month}-{employee.year}</td>
                    <td><input type="email" className="form-control rounded-4" required disabled /></td>
                    <td><input type="email" className="form-control rounded-4" required disabled /></td>
                    <td><input type="email" className="form-control rounded-4" required disabled /></td>
                    <td><input type="email" className="form-control rounded-4" required disabled /></td>
                    <td><input type="date" className="form-control rounded-4" required disabled /></td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button className="btn btn-light" onClick={() => { }}>
                          <i className="bi bi-eye text-info"></i>
                        </button>
                        <button className="btn btn-light mx-1" onClick={() => { }}>
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
     
 
  );
};

export default esic;
