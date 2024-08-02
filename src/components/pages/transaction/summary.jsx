
import { useState, useEffect } from "react"
import { getErId, getEstId } from "../Auth/authToken";
import { getEmployeeByUANandEPFid, getEpfReturnByMonth, getEmployer, fillEpfReturn } from "../../api/services";


const summary = () => {

  const summaryData = [
    { id: 1, firstName: 'Mark', lastName: 'Otto', handle: '@mdo' },
    { id: 2, firstName: 'Jacob', lastName: 'Thornton', handle: '@fat' },
    { id: 3, firstName: 'Larry', lastName: 'the Bird', handle: '@twitter' },
  ];

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
        "month": 1,
        "year": 2024,
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
      if (userData.status === false) {
        setModelMessage(userData.message)
        setTimeout(() => {
          setShowSuccessPopup(true);
        }, 300);

        handleClose();

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
      set_ee_epf(epf_wages * userData.data.ee_epf_rate / 100)
      set_er_epf(epf_wages * userData.data.er_diff_rate / 100)
      set_er_eps(epf_wages * userData.data.er_eps_rate / 100)

    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
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
    set_cal_gross_wages();
    set_cal_epf_wages();
    set_ee_eps_wages('')
    set_ee_edli_wages('')
    set_ee_epf('')
    set_er_epf('')
    set_er_eps('')
    set_search_pf('')
    set_search_uan('')
    setModelMessage('')


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
        "month": 1,
        "year": 2024
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



  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getReturnByMonth();
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
                  aria-label="Default select example"
                >
                  <option value="M">Jan</option>
                  <option value="U">Feb</option>
                </select>

              </div>
              <div className="col-sm">
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="M">2023</option>
                  <option value="U">2024</option>
                </select>
              </div>
              <div className="col-sm-2">
                <button type="button" className="btn btn-outline-primary btn-block" onClick={getReturnByMonth} >Next
                  {/* <Link to="/auth/dashboard/monthlypf"><span >Next</span></Link> */}
                </button>
              </div>
            </div>

            <br />
            <br />
            <table className="table table-striped">
              <thead>
                <tr>
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
                    <th scope="row">{employee.id}</th>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.handle}</td>
                    <td>{employee.handle}</td>
                    <td>{employee.handle}</td>
                    <td>{employee.handle}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th id="total" colSpan="2">Total :</th>
                  <td>200</td>
                  <td>200</td>
                  <td>200</td>
                  <td>200</td>
                  <td>200</td>
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
                <button type="button" className="btn btn-outline-primary btn-block" onClick={handleShow}>
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
            {showModal && (
              <div style={{ display: 'block' }} className="modal fade show" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">EPF Return Filing</h5>
                      <button type="button" className="close" onClick={handleClose} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body text-dark">
                      <div className="row">
                        <div className="col-lg-12">

                          <form>
                            <div className="row">
                              <div className="col-4">
                                <input type="number" className="form-control" placeholder="Enter UAN Number" onChange={(e) => set_search_uan(e.target.value)} value={search_uan} />
                              </div>
                              <div className="col-4">
                                <input type="text" className="form-control" placeholder="Enter PF Number" onChange={(e) => set_search_pf(e.target.value)} value={search_pf} />
                              </div>
                              <div className="col-4">
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
                            <div className="row">
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
                                <button type="button" className="btn btn-outline-primary btn-block" onClick={handleClose} aria-label="Close">Close</button>
                              </div>
                            </div>
                          </form>
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
                        <button className="btn btn-light" data-toggle="modal" data-target="#exampleModal" onClick={() => { fetchEmployee(employee.id) }}>
                          <i className="bi bi-eye text-info"></i>
                        </button>
                        <button className="btn btn-light mx-1" data-toggle="modal" data-target="#exampleModal" onClick={() => { fetchEmployee(employee.id) }}>
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
