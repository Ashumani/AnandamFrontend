import Header from "../../header";
import Sidebar from "../../sidebar";

const ecrGeneration = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="main-container">
        <div className='main-title'>
          <h3>GENERATE ECR</h3>
        </div>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-center">
                    Generate ECR (Electronic Challan Cum Return)
                  </h5>
                  <form>
                    <div className="row">
                      <div className="col mb-4">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option value="M">Jan</option>
                          <option value="U">Feb</option>
                        </select>

                      </div>
                      <div className="col mb-4">
                        <select
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option value="M">2023</option>
                          <option value="U">2024</option>
                        </select>

                      </div>
                      <div className="col-md-2">
                        <button type="button" className="btn btn-primary btn-block" >
                          Upload
                        </button>
                      </div>
                    </div>



                  </form>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">UAN</th>
                        <th scope="col">Name</th>
                        <th scope="col">Month-Year</th>
                        <th scope="col">Gross Wages</th>
                        <th scope="col">EPF Wages</th>
                        <th scope="col">EDLI Wages</th>
                        <th scope="col">EPS Wages</th>
                        <th scope="col">EE SHARE</th>
                        <th scope="col">ER SHARE</th>
                        <th scope="col">EPS</th>
                        <th scope="col">Refund</th>
                        <th scope="col">NCP Days</th>
                        <th scope="col">Remark</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>123456789012</td>
                        <td>Manish</td>
                        <td>01-2024</td>
                        <td>15000</td>
                        <td>10000</td>
                        <td>10000</td>
                        <td>10000</td>
                        <td>1200</td>
                        <td>367</td>
                        <td>833</td>
                        <td>0</td>
                        <td>0</td>
                        <td>0</td>
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

export default ecrGeneration;