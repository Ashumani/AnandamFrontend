
import Sidebar from "../../sidebar";
import Header from "../../header";

const employee = () => {
  return (
    <div>
       <Header/>
       <Sidebar/>
      <div className="main-container">
        <div className='main-title'>
          <h3>EMPLOYEE REGISTRATION</h3>
        </div>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-center">
                    Employee Registration
                  </h5>

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
                      <div className="col mb-6">
                        <label htmlFor="inputTime">Gender</label>
                        <div className="col">
                          <input
                            className="form-check-input ml-2"
                            type="checkbox"
                            id="gridCheck1"
                          />
                          <label
                            className="form-check-label ml-4"
                            htmlFor="gridCheck1"
                          >
                            Male
                          </label>

                          <input
                            className="form-check-input ml-2"
                            type="checkbox"
                            id="gridCheck2"
                            checked
                          />
                          <label
                            className="form-check-label ml-4"
                            htmlFor="gridCheck2"
                          >
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col mb-4">
                        <label>Maritial Status</label>
                        <div className="col">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option value="M">Married</option>
                            <option value="U">UnMarried</option>
                          </select>
                        </div>
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

                    <div className="row mb-3">
                      <div className="col-sm-10">
                        <button
                          type="submit"
                          className="btn btn-outline-secondary"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default employee;
