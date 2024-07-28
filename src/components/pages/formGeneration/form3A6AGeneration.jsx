import Header from "../../header";
import Sidebar from "../../sidebar";

const form3A6AGeneration = () => {
  return (
    <div>
     
      <div className="main-container">
        <div className='main-title'>
          <h3>GNERATE 3A/6A</h3>
        </div>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-center">Generate 3A/6A</h5>
                  <form>
                    <div className="row">
                      <div className="col-sm">
                        <label htmlFor="inputText">From</label>
                        <input type="date" className="form-control" />
                      </div>
                      <div className="col-sm">
                        <label htmlFor="inputEmail">To</label>
                        <input type="date" className="form-control" />
                      </div>
                      <div className="col-sm">
                        <label htmlFor="inputEmail">UAN</label>
                        <input type="number" className="form-control" />
                      </div>
                      <div className="col-sm">
                        <button style={{ "margin":"30px 10px 10px 10px"}}
                          type="submit"
                          className="btn btn-outline-primary btn-block"
                        >
                          Get
                        </button>
                      </div>
                    </div>
                  </form>

                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Month</th>
                        <th scope="col">Gross Wages</th>
                        <th scope="col">EPF Wages</th>
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
                        <td>Manish</td>
                        <td>01-2024</td>
                        <td>15000</td>
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

export default form3A6AGeneration;
