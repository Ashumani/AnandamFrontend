
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
   
      <div className="main-container">
        <div className='main-title'>
          <h3>Summary</h3>
        </div>
        <section className="section">
          <br />
          <div className="row">
            <div className="col-sm">
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="M">Jan</option>
                  <option value="U">Feb</option>
                </select>
             
            </div>
            <div className="col-sm">
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="M">2023</option>
                  <option value="U">2024</option>
                </select>
              </div>
                        <div className="col-sm-2">
              <button type="button" className="btn btn-outline-primary btn-block" >
                <Link to="/auth/dashboard/monthlypf"><span >Next</span></Link>
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
            <tfoot>
              <tr>
                <th id="total"  colSpan="2">Total :</th>
                <td>200</td>
                <td>200</td>
                <td>200</td>
                <td>200</td>
                <td>200</td>
              </tr>
            </tfoot>
          </table>
        </section>
      </div>
    </div>
  );
};

export default summary;
