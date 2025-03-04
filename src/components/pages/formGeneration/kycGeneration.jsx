
import Header from "../../header";
import Sidebar from "../../sidebar";

const kycGeneration = () => {
  return (
    <div>
     
      <div className="main-container">
        <div className='main-title'>
          <h3>GENERATE KYC</h3>
        </div>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-center">Generate KYC</h5>

                  <form>
                    <div className="row">
                      <div className="col-sm">
                        <label htmlFor="inputText">UAN</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-sm">
                        <label htmlFor="inputEmail">PF</label>
                        <input type="email" className="form-control" />
                      </div>
                      <div className="col-sm">
                        <label htmlFor="inputPassword">Name</label>
                        <input type="password" className="form-control" />
                      </div>
                      <div className="col-sm">
                      <button style={{ "margin": "30px 10px 10px 0px" }}
                        type="submit"
                        className="btn btn-outline-primary btn-block"
                      >
                        Save
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

export default kycGeneration;
