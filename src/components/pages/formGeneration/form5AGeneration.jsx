import Header from "../../header";
import Sidebar from "../../sidebar";

const form5AGeneration = () => {
  return (
    <div>
      <Header/>
      <Sidebar/>
      <div className="main-container">
        <div className='main-title'>
          <h3>GENERATE FORM 5A</h3>
        </div>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-center">Generate Form 5A</h5>

                  <form>
                    <div className="row">
                      <div className="col mb-2">
                        <label htmlFor="inputText">From</label>
                        <input type="date" className="form-control" />
                      </div>
                      <div className="col mb-2">
                        <label htmlFor="inputEmail">To</label>
                        <input type="date" className="form-control" />
                      </div>
                      <div className="col mt-4 text-center">
                        <legend>Or</legend>
                      </div>
                      <div className="col mb-3">
                        <label htmlFor="inputEmail">UAN</label>
                        <input type="number" className="form-control" />
                      </div>
                      <div className="col mt-4">
                        <button
                          type="submit"
                          className="btn btn-outline-secondary"
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
                        <th scope="col">UAN</th>
                        <th scope="col">PF</th>
                        <th scope="col">Name</th>
                        <th scope="col">DOB</th>
                        <th scope="col">DOJ</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Maritial Status</th>
                        <th scope="col">Father/Husband</th>
                        <th scope="col">Relation</th>
                        <th scope="col">Wages</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>NGNAG123450000123</td>
                        <td>123456789012</td>
                        <td>Manish Kirnapure</td>
                        <td>04-04-2024</td>
                        <td>04-04-2024</td>
                        <td>M</td>
                        <td>U</td>
                        <td>Ganeshrao</td>
                        <td>F</td>
                        <td>15000</td>
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

export default form5AGeneration;
