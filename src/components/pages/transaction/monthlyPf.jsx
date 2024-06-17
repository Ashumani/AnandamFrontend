
import Header from "../../header";
import Sidebar from "../../sidebar";

const monthlyPf = () => {
  return (
    <div>
     <Header/>
     <Sidebar/>
      <div className="main-container">
        <div className='main-title'>
          <h3>EPF RETURN</h3>
        </div>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-center">Epf Return</h5>

                  <form>
                    <div className="row">
                      <div className="col mb-3">
                        <label htmlFor="inputText">UAN</label>
                        <input type="number" className="form-control" />
                      </div>
                      <div className="col mb-3">
                        <label htmlFor="inputEmail">PF</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col mt-4">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col mb-4">
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
                    <div className="row ">
                      <div className="col-1">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                        >
                          Save
                        </button>
                      </div>
                      <div className="col-1">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                        >
                          Update
                        </button>
                      </div>
                      <div className="col-1">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                        >
                          Reset
                        </button>
                      </div>
                      <div className="col-1">
                        <button
                          type="file"
                          className="btn btn-outline-secondary"
                        >
                          Import
                        </button>
                      </div>
                      <div className="col-1">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                        >
                          Export
                        </button>
                      </div>
                      <div className="col-1">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                        >
                          ECR
                        </button>
                      </div>
                    </div>
                  </form>

                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default monthlyPf;
