import { useState, useEffect } from "react"
import { getErId, getEstId } from "../Auth/authToken";
import {  getEmployeeByUANandEPFid, getSalaryByMonth } from "../../api/services";
import React, { useRef } from 'react';
import "./style.css"
import Swal from 'sweetalert2';


const salary = () => {

  const [employeeData, setEmployeeData] = useState([])
  const returnsYear = {
    "month": [{ "monthNum": 1, "monthText": "Jan" }, { "monthNum": 2, "monthText": "Feb" }, { "monthNum": 3, "monthText": "Mar" }, { "monthNum": 4, "monthText": "Apr" }, { "monthNum": 5, "monthText": "May" }, { "monthNum": 6, "monthText": "Jun" }, { "monthNum": 7, "monthText": "Jul" }, { "monthNum": 8, "monthText": "Aug" }, { "monthNum": 9, "monthText": "Sep" }, { "monthNum": 10, "monthText": "Oct" }, { "monthNum": 11, "monthText": "Nov" }, { "monthNum": 12, "monthText": "Dec" }],
    "Year": [2020, 2021, 2022, 2023, 2024]
  }
  const modalRef = useRef(null);
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
        set_ee_id(userData.data.set_ee_id);
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

  const GetSalaryByMonth = async () => {
    // api call
    try {
      const params = {
        "est_id": "2",
        "ee_id": 0,
        "month": 9,
        "year": 2024,
        "limit": 10,
        "offset": 1
    }
      const userData = await getSalaryByMonth(params);
      if (userData.status === true) {
        setEmployeeData(userData.data)
        IsSummary(false)
      }
      
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

  }

  const handleShow = () => {setShowModal(true)};
  const handleClose = () => {setShowModal(false), reset();}
  const handleSuccessClose = () => setShowSuccessPopup(false);
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
          {/* Import EPF Return Model */}
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
          <br />
          <br />
          <table className="table table-striped">
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
                  <th scope="row">{employee.id}</th>
                  <td>{employee.name}</td>
                  <td>{employee.gross}</td>
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
              ))}
            </tbody>
          </table>
        </section>
      </div>
   ):(
    <div className="main-container">
        <div className='main-title'>
          <h3>Return Filing</h3>
        </div>
        <section className="section">
          <br />
          <div className="row">
            <div className="col-sm">
              <button type="button" className="btn btn-outline-primary btn-block" data-toggle="modal" data-target="#exampleModal"  onClick={handleShow}>
                Add
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
                className="btn btn-outline-primary btn-block" data-toggle="modal" data-target="#importReturn"
              >
                ECR
              </button>
            </div>
            {/* <div className="col-md-4">
              <input className="form-control" type="file" id="formFile" />

            </div> */}
          </div>

          {/* Add Epf Return Model */}
         
            <div className="modal fade bd-example-modal-lg" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

                      <form>
                        <div className="row">
                          <div className="col mb-2">
                            <label htmlFor="inputUAN">UAN</label>
                            <input type="text" className="form-control" required onChange={(e) => set_ee_uan_no(e.target.value)} value={ee_uan_no} />
                          </div>
                          <div className="col mb-2">
                            <label htmlFor="inputPF">PF</label>
                            <input type="email" className="form-control" required onChange={(e) => set_ee_pf_no(e.target.value)} value={ee_pf_no} />
                          </div>
                          <div className="col mb-2">
                            <label htmlFor="inputName">Name</label>
                            <input type="text" className="form-control" required onChange={(e) => set_ee_name(e.target.value)} value={ee_name} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col mb-2">
                            <label htmlFor="inputNumber">Date Of Birth</label>
                            <input type="date" className="form-control" required onChange={(e) => set_ee_dob(e.target.value)} value={ee_dob} />
                          </div>
                          <div className="col mb-2">
                            <label htmlFor="inputTime">Date Of Joining</label>
                            <input type="date" className="form-control" required onChange={(e) => set_ee_doj(e.target.value)} value={ee_doj} />
                          </div>
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
                          </div>

                        </div>
                        <div className="row">
                          <div className="col-sm mb-2">
                            <label>Maritial Status</label>
                            <select
                              className="form-select"
                              aria-label="Default select example" value={ee_maritial_status}
                            >
                              <option value="M">Married</option>
                              <option value="U">UnMarried</option>
                            </select>

                          </div>
                          <div className="col-sm mb-2">
                            <label htmlFor="inputText">Father/Husband</label>
                            <input type="text" className="form-control" required onChange={(e) => set_ee_father_husband(e.target.value)} value={ee_father_husband} />
                          </div>
                          <div className="col-sm mb-2">
                            <label>Relation</label>
                            <select
                              className="form-select"
                              aria-label="Default select example" value={ee_relation} 
                            >
                              <option value="F">Father</option>
                              <option value="S">Spouse</option>
                            </select>

                          </div>
                          {/* <div className="col-sm mb-2">
                            <label htmlFor="inputText">Relation</label>
                            <input type="text" className="form-control" required onChange={(e) => set_ee_relation(e.target.value)} value={ee_relation} />
                          </div> */}
                        </div>
                        <div className="row">
                          <div className="col-sm mb-2">
                            <label htmlFor="inputColor">SubId</label>
                            <input type="number" className="form-control" onChange={(e) => set_ee_sub_id(e.target.value)} value={ee_sub_id} />
                          </div>
                          <div className="col-sm mb-2">
                            <label htmlFor="inputColor">EPF Wages</label>
                            <input type="number" className="form-control" required onChange={(e) => set_ee_epf_wages(e.target.value)} value={ee_epf_wages} />
                          </div>
                          <div className="col-sm mb-2">
                            <label htmlFor="inputPassword">EPS Wages</label>
                            <input type="number" className="form-control" required onChange={(e) => set_ee_gross_wages(e.target.value)} value={ee_gross_wages} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col mb-2">
                            <label htmlFor="inputNumber">Aadhar No</label>
                            <input type="text" className="form-control" required  />
                          </div>
                          <div className="col mb-2">
                            <label htmlFor="inputNumber">Date Of Exit</label>
                            <input type="date" className="form-control" required onChange={(e) => set_ee_dol(e.target.value)} value={ee_dol} />
                          </div>

                          <div className="col-sm">
                            <label htmlFor="inputColor">isAbove58</label>
                            <input type="number" className="form-control" onChange={(e) => set_ee_sub_id(e.target.value)} value={ee_sub_id} />
                          </div>
                        </div>

                      </form>

                    </div>
                  </div>
                </div>
                <div className="modal-footer">

                  {/* <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Close</button>
                  {!isUpdate ? (
                    <button type="button" className="btn btn-outline-primary" onClick={saveEEDetails}>
                      Save
                    </button>
                  ) : (
                    <button type="button" className="btn btn-outline-primary" onClick={UpdateEmployee}>
                      Update
                    </button>
                  )} */}

                </div>
              </div>
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
          {/* Import EPF Return Model */}
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
          <br />
          <br />
          <table className="table table-striped">
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
