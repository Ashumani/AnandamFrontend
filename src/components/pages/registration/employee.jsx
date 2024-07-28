/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from "react"
import { getEstId } from "../Auth/authToken";
import { getAllEmployee, getEERegister, getEmployee, updateEmployeer } from "../../api/services";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
const employee = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks


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
  const [ee_father_husband, set_ee_father_husband] = useState('F');
  const [ee_relation, set_ee_relation] = useState('');
  const [ee_gross_wages, set_ee_gross_wages] = useState('');
  const [ee_epf_wages, set_ee_epf_wages] = useState('');
  const [ee_sub_id, set_ee_sub_id] = useState('');

  const [employeeData, setEmployeeData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        "est_epf_id": getEstId()
      }
      try {
        // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
        const response = await getAllEmployee(params);
        if (response.status == true) {
          setEmployeeData(response.data);
        }


      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const saveEEDetails = async () => {
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


      await getEERegister(params);
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
      closeModal()
      const userData = await getEmployee(id);
      if (userData.status === true) {
        set_ee_id(userData.data.set_ee_id);
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
      console.log('======', params)

      await updateEmployeer(params);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useEffect();
      reset();

    } catch (error) {
      console.error('Login error ', error);
      setError(error);
    }
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
    set_ee_father_husband('');
    set_ee_relation('');
    set_ee_gross_wages('');
    set_ee_epf_wages('');
    set_ee_sub_id('');
    
  }
  const closeModal = () => {
    const modalElement = document.getElementById('exampleModal');
    setIsUpdate(false)
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.hide();
    }
  };
  return (
    <div>

      <div className="main-container">
        <div className='main-title'>
          <h3>EMPLOYEE REGISTRATION</h3>
        </div>
        <section className="section">
          <br />
          <div className="row">
            <div className="col-md-2">
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Add Employee
              </button>
            </div>
            <div className="col-md-4">
              <input className="form-control" type="file" id="formFile" />
            </div>
            <div className="col-md-2">
              <button type="button" className="btn btn-primary" >
                Upload
              </button>
            </div>
          </div>


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
                              aria-label="Default select example" value={ee_maritial_status} onChange={handleMaritalStatusChange}
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
                              aria-label="Default select example" value={ee_maritial_status} onChange={handleRelationChange}
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
                            <label htmlFor="inputNumber">Date Of Exit</label>
                            <input type="date" className="form-control" required onChange={(e) => set_ee_dob(e.target.value)} value={ee_dob} />
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

                  <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={reset}>Close</button>
                  {!isUpdate ? (
                    <button type="submit" className="btn btn-outline-primary" onClick={saveEEDetails}>
                      Save
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-outline-primary"  onClick={UpdateEmployee}>
                      Update
                    </button>
                  )}

                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">UAN</th>
                <th scope="col">PFNO</th>
                <th scope="col">Aadhar</th>
                <th scope="col">Name</th>
                <th scope="col">DOB</th>
                <th scope="col">DOJ</th>
                <th scope="col">Gender</th>
                <th scope="col">MaritialStatus</th>
                <th scope="col">Father/Husband</th>
                <th scope="col">Relation</th>
                <th scope="col">EPF Waages</th>
                <th scope="col">Eps Wages</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {employeeData.map((employee, index) => (
                <tr key={index}>
                  <th scope="row">{employee.id}</th>
                  <td>{employee.ee_uan_no}</td>
                  <td>{employee.ee_pf_no}</td>
                  <td>{employee.ee_aadhar_no}</td>
                  <td>{employee.ee_name}</td>
                  <td>{employee.ee_dob}</td>
                  <td>{employee.ee_doj}</td>
                  <td>{employee.ee_gender}</td>
                  <td>{employee.ee_maritial_status}</td>
                  <td>{employee.ee_father_husband}</td>
                  <td>{employee.ee_relation}</td>
                  <td>{employee.ee_gross_wages}</td>
                  <td>{employee.ee_epf_wages}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-light" data-toggle="modal" data-target="#exampleModal" onClick={()=>{fetchEmployee(employee.id)}}>
                        <i className="bi bi-eye text-info"></i>
                      </button>
                      <button className="btn btn-light mx-1" data-toggle="modal" data-target="#exampleModal" onClick={()=>{fetchEmployee(employee.id)}}>
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
    </div>
  );
};

export default employee;
