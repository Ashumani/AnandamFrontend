import { useState, useEffect } from "react"
import { getErId, getEstId } from "../Auth/authToken";
import {  getEmployeeByUANandEPFid } from "../../api/services";

import "./style.css"
import Swal from 'sweetalert2';


const monthlyPf = () => {

  const employeeData = [
    { id: 1, name: 'Mark', gross: 8650, epfwages: 6000, edliwages: 6000, epswages: 6000, eeEpf: 720, erEpf: 220, erEps: 500, ncpdays: 0 },
    { id: 2, name: 'Mark', gross: 8650, epfwages: 6000, edliwages: 6000, epswages: 6000, eeEpf: 720, erEpf: 220, erEps: 500, ncpdays: 0 },
    { id: 3, name: 'Mark', gross: 8650, epfwages: 6000, edliwages: 6000, epswages: 6000, eeEpf: 720, erEpf: 220, erEps: 500, ncpdays: 0 },
    { id: 4, name: 'Mark', gross: 8650, epfwages: 6000, edliwages: 6000, epswages: 6000, eeEpf: 720, erEpf: 220, erEps: 500, ncpdays: 0 },
    { id: 5, name: 'Mark', gross: 8650, epfwages: 6000, edliwages: 6000, epswages: 6000, eeEpf: 720, erEpf: 220, erEps: 500, ncpdays: 0 },
  ];
  const [showModal, setShowModal] = useState(false);
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

  const saveReturns = async () => {
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
      
        // Show success popup
        
        setTimeout(() => {
          setShowSuccessPopup(true);
        }, 300);

        handleClose();
      

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

  }

  const handleShow = () => {setShowModal(true)};
  const handleClose = () => {setShowModal(false), reset();}
  const handleSuccessClose = () => setShowSuccessPopup(false);
  return (
    <div>

      <div className="main-container">
        <div className='main-title'>
          <h3>Return Filing</h3>
        </div>
        <section className="section">
          <br />
          <div className="row">
            <div className="col-sm">
              <button type="button" className="btn btn-outline-primary btn-block"  onClick={handleShow}>
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
                            <div className="col mb-3">
                              <label htmlFor="inputColor">Gross Wages</label>
                              <input type="number" className="form-control" />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputPassword">EPF Wages</label>
                              <input type="number" className="form-control" />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputPassword">EDLI Wages</label>
                              <input type="number" className="form-control" />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputPassword">EPS Wages</label>
                              <input type="number" className="form-control" />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputPassword">EE</label>
                              <input type="number" className="form-control" />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputPassword">ER</label>
                              <input type="number" className="form-control" />
                            </div>
                            <div className="col mb-3">
                              <label htmlFor="inputPassword">EPS</label>
                              <input type="number" className="form-control" />
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm">
                              <button type="button" className="btn btn-outline-primary btn-block" onClick={fetchEmployee}>Save</button>
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
                <th scope="col">Gross Wages</th>
                <th scope="col">EPF Wages</th>
                <th scope="col">EDLI Wages</th>
                <th scope="col">EPS Wages</th>
                <th scope="col">EE(12%)</th>
                <th scope="col">ER(3.67%)</th>
                <th scope="col">EPS(8.33%)</th>
                <th scope="col">NCP Days</th>
              </tr>
            </thead>
            <tbody>
              {employeeData.map((employee, index) => (
                <tr key={index}>
                  <th scope="row">{index}</th>
                  <th scope="row">{employee.id}</th>
                  <td>{employee.name}</td>
                  <td>{employee.gross}</td>
                  <td>{employee.epfwages}</td>
                  <td>{employee.edliwages}</td>
                  <td>{employee.epswages}</td>
                  <td>{employee.eeEpf}</td>
                  <td>{employee.erEpf}</td>
                  <td>{employee.erEps}</td>
                  <td>{employee.ncpdays}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default monthlyPf;
