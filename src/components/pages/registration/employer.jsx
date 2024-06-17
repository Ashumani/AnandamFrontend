
import Header from "../../header";
import Sidebar from "../../sidebar";

const employer = () => {
  return (
    <div>
      <Header/>
      <Sidebar/>

      <div className="main-container">
        <div className='main-title'>
          <h3>EMPLOYEER REGISTRATION</h3>
        </div>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <form>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title text-center">
                      Employer Registration
                    </h5>

                    <div className="row">
                      <div className="form-group col-md-3">
                        <label htmlFor="inputText">EPF No</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="inputEmail">ESIC No</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="inputEmail">Company Type</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="inputText">Date of Coverage</label>
                        <input type="date" className="form-control" />
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="inputPassword">Company Name</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputEmail">Employer Namee</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>

                    <div className="row">
                      <div className="form-group col-md-4">
                        <label htmlFor="inputText">Email id</label>
                        <input type="email" className="form-control" />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="inputPassword">Contact Number</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="inputPassword">Address</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title text-center">
                      Retruns Parameter
                    </h5>

                    <div className="row">
                      <div className="form-group col-md-3">
                        <label htmlFor="inputText">EPF </label>
                        <input type="number" className="form-control" />
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="inputEmail">EPS</label>
                        <input type="number" className="form-control" />
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="inputEmail">ER</label>
                        <input type="number" className="form-control" />
                      </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="inputText">TDS</label>
                        <input type="number" className="form-control" />
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-outline-secondary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default employer;
