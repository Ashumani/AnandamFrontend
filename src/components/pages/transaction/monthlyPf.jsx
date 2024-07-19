
import Header from "../../header";
import Sidebar from "../../sidebar";
import "./style.css"


const monthlyPf = () => {

  const employeeData = [
    { id: 1, name: 'Mark', gross: 8650, epfwages: 6000, edliwages: 6000, epswages: 6000, eeEpf: 720, erEpf: 220, erEps: 500, ncpdays: 0 },
    { id: 2, name: 'Mark', gross: 8650, epfwages: 6000, edliwages: 6000, epswages: 6000, eeEpf: 720, erEpf: 220, erEps: 500, ncpdays: 0 },
    { id: 3, name: 'Mark', gross: 8650, epfwages: 6000, edliwages: 6000, epswages: 6000, eeEpf: 720, erEpf: 220, erEps: 500, ncpdays: 0 },
    { id: 4, name: 'Mark', gross: 8650, epfwages: 6000, edliwages: 6000, epswages: 6000, eeEpf: 720, erEpf: 220, erEps: 500, ncpdays: 0 },
    { id: 5, name: 'Mark', gross: 8650, epfwages: 6000, edliwages: 6000, epswages: 6000, eeEpf: 720, erEpf: 220, erEps: 500, ncpdays: 0 },
  ];

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="main-container">
        <div className='main-title'>
          <h3>Return Filing</h3>
        </div>
        <section className="section">
          <br />
          <div className="row">
            <div className="col-sm">
              <button type="button" className="btn btn-primary btn-block" data-toggle="modal" data-target="#exampleModal">
                Add
              </button>
            </div>
            <div className="col-sm">
              <button
                type="file"
                className="btn btn-outline-primary btn-block"
              >
                Import
              </button>
            </div>
            <div className="col-sm">
              <button
                type="button"
                className="btn btn-outline-primary btn-block"
              >
                Export
              </button>
            </div>
            <div className="col-sm">
              <button
                type="button"
                className="btn btn-outline-primary btn-block"
              >
                ECR
              </button>
            </div>
            {/* <div className="col-md-4">
              <input className="form-control" type="file" id="formFile" />

            </div> */}
          </div>


          <div className="modal fade bd-example-modal-lg" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">EPF Return Filing</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body text-dark">
                  <div className="row">
                    <div className="col-lg-12">

                      <form>
                        <div className="row">
                          <div className="col-4">
                            <input type="number" className="form-control" placeholder="Enter UAN Number" />
                          </div>
                          <div className="col-4">
                            <input type="text" className="form-control" placeholder="Enter PF Number" />
                          </div>
                          <div className="col-4">
                            <button type="button" className="btn btn-outline-primary">Search</button>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col mb-2">
                            <label htmlFor="inputPassword">Name</label>
                            <input type="text" className="form-control" />
                          </div>
                          <div className="col mb-2">
                            <label htmlFor="inputNumber">Gender</label>
                            <input type="text" className="form-control" />
                          </div>
                          <div className="col mb-2">
                            <label htmlFor="inputNumber">Father/husband</label>
                            <input type="text" className="form-control" />
                          </div>
                          <div className="col mb-2">
                            <label htmlFor="inputNumber">Maritial Status</label>
                            <input type="text" className="form-control" />
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
                          <div className="col mb-3">
                            <label htmlFor="inputDate">EPS Exmpted</label>
                            <input type="date" className="form-control" />
                          </div>
                          <div className="col mb-3">
                            <label htmlFor="inputColor">Gross Wages</label>
                            <input type="number" className="form-control" />
                          </div>
                          <div className="col mb-3">
                            <label htmlFor="inputPassword">EPF Wages</label>
                            <input type="number" className="form-control" />
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
                            <button type="button" className="btn btn-outline-primary btn-block">Save</button>
                          </div>
                          <div className="col-sm">
                            <button type="button" className="btn btn-outline-primary btn-block">Update</button>
                          </div>
                          <div className="col-sm">
                            <button type="button" className="btn btn-outline-primary btn-block">Reset</button>
                          </div>
                          <div className="col-sm">
                            <button type="button" className="btn btn-outline-primary btn-block" data-dismiss="modal" aria-label="Close">Close</button>
                          </div>
                        </div>
                      </form>


                    </div>
                  </div>
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
