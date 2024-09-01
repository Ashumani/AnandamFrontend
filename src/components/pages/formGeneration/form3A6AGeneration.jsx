import { useState } from "react";
import { get3A } from "../../api/services";
import { getErId, getEstId } from "../Auth/authToken";

const form3A6AGeneration = () => {

  const [fromDate, set_from_date] = useState('2023');
  const [toDate, set_to_date] = useState('');
  const [uan, set_uan] = useState('');
  const [currentItems, set_currentItems] =useState([]);
  const getForm3A = async () => {
    // api call
    try {
      const params = {
        "est_id": getErId(),
        "uan": uan,
        "year": fromDate
      }
      const userData = await get3A(params);
      set_currentItems(userData.data)

    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
  };

  const handleChange = (e) => {
    set_from_date(e.target.value);
  };


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
                      {/* <div className="col-sm">
                        <label htmlFor="inputText">From</label>
                        <input type="date" className="form-control" onChange={(e) => set_from_date(e.target.value)} value={fromDate} />
                      </div>
                      <div className="col-sm">
                        <label htmlFor="inputEmail">To</label>
                        <input type="date" className="form-control" onChange={(e) => set_to_date(e.target.value)} value={toDate} />
                      </div> */}
                      <div className="col-sm mb-2">
                            <label>Maritial Status</label>
                            <select
                              className="form-select"
                              aria-label="Default select example" value={fromDate} onChange={handleChange}
                            >
                              <option value="2023">2023-24</option>
                              <option value="2024">2024-25</option>
                            </select>

                          </div>
                      <div className="col-sm">
                        <label htmlFor="inputEmail">UAN</label>
                        <input type="number" className="form-control" onChange={(e) => set_uan(e.target.value)} value={uan} />
                      </div>
                      <div className="col-sm">
                        <button style={{ "margin": "30px 10px 10px 10px" }}
                          type="button"
                          className="btn btn-outline-primary btn-block"
                          onClick={getForm3A}
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
                      {currentItems.map((employee, index) => (
                        <tr key={index}>
                          <th scope="row">{index+1}</th>
                          <th scope="row">{employee.ee_uan}</th>
                          <td>{employee.er_name}</td>
                          <td>{employee.month}-{employee.year}</td>
                          <td>{employee.gross_wages}</td>
                          <td>{employee.epf_wages}</td>
                          {/* <td>{employee.edli_wages}</td>
                          <td>{employee.eps_wages}</td>
                          <td>{employee.ee_share}</td> */}
                          <td>{employee.ee_share}</td>
                          <td>{employee.diff_share}</td>
                          <td>{employee.eps_share}</td>
                          <td>{employee.ncp_days}</td>
                          <td>{employee.ncp_days}</td>
                          <td>{employee.ncp_days}</td>
                         
                        </tr>
                      ))}
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
