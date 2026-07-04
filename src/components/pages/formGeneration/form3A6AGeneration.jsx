import { useEffect, useState } from "react";
import { downlaodFile, generateECR, get3A, getYearsAndMonth } from "../../api/services";
import { getErId, getEstId } from "../Auth/authToken";
import Swal from "sweetalert2";

const form3A6AGeneration = () => {

  const [returnsYear, setReturnsYear] = useState('')
  const [fromDate, set_from_date] = useState('2023');
  const [toDate, set_to_date] = useState('');
  const [uan, set_uan] = useState('');
  const [currentItems, set_currentItems] = useState([]);
  const [isDownload, set_isDownload] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      await getYears();


    };

    fetchData();

  }, []);
  const getForm3A = async () => {
    // api call
    try {
      const params = {
        "est_id": getErId(),
        "uan": uan,
        "year": fromDate
      }
      const userData = await get3A(params);

      if (userData.status === true) {
        set_currentItems(userData.data)
        set_isDownload(true)

      } else {
        Swal.fire({
          title: userData.message,
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }

    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
  };

  const handleChange = (e) => {
    set_from_date(e.target.value);
  };

  const getYears = async () => {
    // api call

    try {

      const response = await getYearsAndMonth();
      setReturnsYear(response.data);
      // await getGraphDetails(fromMonth, toMonth, parseInt(response.data.yearTo[0].startYear), parseInt(response.data.yearTo[0].startYear) + 1)
      // await getBillDetailsForGraph(fromMonth, toMonth, parseInt(response.data.yearTo[0].startYear), parseInt(response.data.yearTo[0].startYear) + 1)


    } catch (error) {
      console.error('Error fetching data:', error);
      // setError('Error fetching data. Please try again.');
      // setLoading(false);
    }
  };

  const download = async () => {
    // api call
    try {
      const params = {
        "est_id": getErId(),
        "ee_id": 0,
        "month": fromDate,
        "year": fromDate
      }
      const userData = await generateECR(params);

      if (userData.status === true) {

        await downlaodFile(userData.url);
        // window.URL.revokeObjectURL(url);
        Swal.fire({
          position: 'top-right',
          icon: 'success',
          toast: true,
          title: userData.message,
          showConfirmButton: false,
          showCloseButton: true,
          timer: 1500,
        });

      } else {
        Swal.fire({
          position: 'top-right',
          icon: 'error',
          toast: true,
          title: userData.message,
          showConfirmButton: false,
          showCloseButton: true,
          timer: 1500,
        });
      }

      // Show success popup



    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
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
                      <div className="col-sm mb-2 rounded-4">
                        <label>Select Year</label>
                        <select
                          className="form-select rounded-4"
                          aria-label="Default select example" value={fromDate} onChange={handleChange}
                        >
                          {returnsYear && returnsYear.yearTo.map((returnYear) => (
                            // eslint-disable-next-line react/jsx-key
                            <option value={returnYear.startYear}>{returnYear.between}</option>
                          ))}
                        </select>

                      </div>

                      <div className="col-sm rounded-4">
                        <label htmlFor="inputEmail">UAN</label>
                        <input type="number" className="form-control rounded-4" onChange={(e) => set_uan(e.target.value)} value={uan} />
                      </div>
                      <div className="col-sm">
                        <button style={{ "margin": "24px 10px 10px 1px" }}
                          type="button"
                          className="btn btn-outline-primary btn-block rounded-4"
                          onClick={getForm3A}
                        >
                          Get
                        </button>
                      </div>
                      <div className="col-md-2">
                        <button type="button" className="btn btn-primary btn-block rounded-4" onClick={download} disabled={!isDownload} >
                          Download
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
                          <th scope="row">{index + 1}</th>
                          <th scope="row">{employee.ee_uan}</th>
                          <td>{employee.ee_name}</td>
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
