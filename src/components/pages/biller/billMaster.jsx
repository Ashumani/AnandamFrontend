
import Header from "../../header";
import Sidebar from "../../sidebar";
import { Link } from "react-router-dom";

const billMaster = () => {
  return (
    <div>
      
      <div className="main-container">
        <div className='main-title'>
          <h3>Billing</h3>
        </div>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-center">Billing</h5>

                  <form>
                    <div className="row">
                      <div className="col-sm-2">
                        <label htmlFor="inputEmail">PF</label>
                        <input type="email" className="form-control" />
                      </div>
                      <div className="col-sm-2">
                        <label htmlFor="inputPassword">Name</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="col-sm-2">
                      <button style={{ "margin": "30px 10px 10px 0px" }}
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                      >
                        Search
                      </button>
                      
                    </div>
   <div className="col-sm-2">
                      <button style={{ "margin": "30px 10px 10px 0px" }}
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                      >
                          <Link to="/auth/dashboard/bill/create"><span >Create Bill</span></Link>
                      </button>
                      
                    </div>
                    </div>
                    
                  </form>

                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Company Name</th>
                        <th scope="col">Est Id</th>
                        <th scope="col">Perticular</th>
                        <th scope="col">Rate</th>
                        <th scope="col">Anount</th>
                        <th scope="col">PaymentMode</th>
                        <th scope="col">Status</th>
                        <th scope="col">Discount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Anandam</td>
                        <td>NGNAG0012345000</td>
                        <td>EPF Challan For Period Mar-23 To Apr-24</td>
                        <td>1000</td>
                        <td>12000</td>
                        <td>Cash</td>
                        <td>Paid</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <th scope="row">1</th>
                        <td>Anandam</td>
                        <td>NGNAG0012345000</td>
                        <td>EPF Challan For Period Mar-23 To Apr-24</td>
                        <td>1000</td>
                        <td>12000</td>
                        <td>Cash</td>
                        <td>Paid</td>
                        <td>0</td>
                      </tr><tr>
                        <th scope="row">1</th>
                        <td>Anandam</td>
                        <td>NGNAG0012345000</td>
                        <td>EPF Challan For Period Mar-23 To Apr-24</td>
                        <td>1000</td>
                        <td>12000</td>
                        <td>Cash</td>
                        <td>Paid</td>
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

export default billMaster;
