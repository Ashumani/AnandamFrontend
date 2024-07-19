
import Header from "../../header";
import Sidebar from "../../sidebar";
import { Link } from "react-router-dom";

const summary = () => {

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
          <h3>Summary</h3>
        </div>
        <section className="section">
          <br />
          <div className="row">
            <div className="col-2 mb-2">
              <div className="col">
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="M">Jan</option>
                  <option value="U">Feb</option>
                </select>
              </div>
            </div>
            <div className="col-2 mb-2">
              <div className="col">
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="M">2023</option>
                  <option value="U">2024</option>
                </select>
              </div>
            </div>
            <div className="col-md-2">
              <button type="button" className="btn btn-primary" >
                <Link to="http://localhost:5173/auth/dashboard/monthlypf"><span className="text-white">Go</span></Link>
              </button>
            </div>
          </div>

          <br />
          <br />
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Month</th>
                <th scope="col">Year</th>
                <th scope="col">Account 1</th>
                <th scope="col">Account 2</th>
                <th scope="col">Account 10</th>
                <th scope="col">Account 21</th>
                <th scope="col">Account 22</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default summary;
