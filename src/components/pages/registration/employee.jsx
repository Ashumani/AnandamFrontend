
import Sidebar from "../../sidebar";
import Header from "../../header";

const employee = () => {

  const employeeData = [
    { id: 1, firstName: 'Mark', lastName: 'Otto', handle: '@mdo' },
    { id: 2, firstName: 'Jacob', lastName: 'Thornton', handle: '@fat' },
    { id: 3, firstName: 'Larry', lastName: 'the Bird', handle: '@twitter' },
  ];

  return (
    <div>
      <Header />
      <Sidebar />
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
                  <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body text-dark">
                  <div className="row">
                    <div className="col-lg-12">

                      <form>
                        <div className="row">
                          <div className="col mb-3">
                            <label htmlFor="inputText">UAN</label>
                            <input type="text" className="form-control" />
                          </div>
                          <div className="col mb-3">
                            <label htmlFor="inputEmail">PF</label>
                            <input type="email" className="form-control" />
                          </div>
                          <div className="col mb-3">
                            <label htmlFor="inputPassword">Name</label>
                            <input type="password" className="form-control" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col mb-3">
                            <label htmlFor="inputNumber">Date Of Birth</label>
                            <input type="date" className="form-control" />
                          </div>
                          <div className="col mb-3">
                            <label htmlFor="inputTime">Date Of Joining</label>
                            <input type="date" className="form-control" />
                          </div>
                          <div className="col mt-4">
                            <label htmlFor="inputTime" className="form-label">Gender</label>
                            <div className="form-check form-check-inline">
                              <input className="form-check-input ml-1 mt-1" type="radio" name="gender" id="male" />
                              <label className="form-check-label ml-2" htmlFor="male">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input className="form-check-input mt-1" type="radio" name="gender" id="female" checked />
                              <label className="form-check-label ml-2" htmlFor="female">Female</label>
                            </div>
                          </div>

                        </div>
                        <div className="row">
                          <div className="col mb-4">
                            <label>Maritial Status</label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                              >
                                <option value="M">Married</option>
                                <option value="U">UnMarried</option>
                              </select>
                    
                          </div>
                          <div className="col mb-4">
                            <label htmlFor="inputText">Father/Husband</label>
                            <input type="text" className="form-control" />
                          </div>
                          <div className="col mb-4">
                            <label htmlFor="inputText">Relation</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col mb-3">
                            <label htmlFor="inputColor">EPF Wages</label>
                            <input type="number" className="form-control" />
                          </div>
                          <div className="col mb-3">
                            <label htmlFor="inputPassword">EPS Wages</label>
                            <input type="number" className="form-control" />
                          </div>
                        </div>


                      </form>

                    </div>
                  </div>
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
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.handle}</td>
                  <td>{employee.handle}</td>
                  <td>{employee.handle}</td>
                  <td>{employee.handle}</td>
                  <td>{employee.handle}</td>
                  <td>{employee.handle}</td>
                  <td>{employee.handle}</td>
                  <td>{employee.handle}</td>
                  <td>{employee.handle}</td>
                  <td>{employee.handle}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-light">
                        <i className="bi bi-eye text-info"></i>
                      </button>
                      <button className="btn btn-light mx-1">
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
