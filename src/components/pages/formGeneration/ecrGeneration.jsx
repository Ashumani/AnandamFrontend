/* eslint-disable react-hooks/rules-of-hooks */

import { useState, useEffect } from "react"
import { getErId, getEstId } from "../Auth/authToken";
import { downlaodFile, generateECR, getEpfReturnByMonth } from "../../api/services";
import Swal from 'sweetalert2';



const ecrGeneration = () => {

  const returnsYear = {
    "month": [{ "monthNum": 1, "monthText": "Jan" }, { "monthNum": 2, "monthText": "Feb" }, { "monthNum": 3, "monthText": "Mar" }, { "monthNum": 4, "monthText": "Apr" }, { "monthNum": 5, "monthText": "May" }, { "monthNum": 6, "monthText": "Jun" }, { "monthNum": 7, "monthText": "Jul" }, { "monthNum": 8, "monthText": "Aug" }, { "monthNum": 9, "monthText": "Sep" }, { "monthNum": 10, "monthText": "Oct" }, { "monthNum": 11, "monthText": "Nov" }, { "monthNum": 12, "monthText": "Dec" }],
    "Year": [2020, 2021, 2022, 2023, 2024]
  }
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedYear, setSelectedYear] = useState(2024);

  const itemsPerPage = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, set_totalPages] = useState(1);

  // Get current items based on the current page
  const [startIndex, set_startIndex] = useState('');
  const [currentItems, set_currentItems] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [ecrUrl, set_EcrURL] = useState('');
  const [isDownload, set_isDownload] = useState(false);

  const [total_gross_wages, set_total_gross_wages] = useState(0)
  const [total_epf_wages, set_total_epf_wages] = useState(0)
  const [total_edli_wages, set_total_edli_wages] = useState(0)
  const [total_eps_wages, set_total_eps_wages] = useState(0)
  const [total_ee_share, set_total_ee_share] = useState(0)
  const [total_eps_share, set_total_eps_share] = useState(0)
  const [total_diff_share, set_total_diff_share] = useState(0)
  const [total_ncp_days, set_total_ncp_days] = useState(0)
  const [total_refund, set_total_refund] = useState(0)

  const getReturnByMonth = async (pageNumber) => {
    // api call
    try {
      const params = {
        "est_id": getErId(),
        "ee_id": 0,
        "month": selectedMonth,
        "year": selectedYear,
        "limit": itemsPerPage,
        "offset": pageNumber
      }
      const userData = await getEpfReturnByMonth(params);
      set_isDownload(true)
      set_EcrURL(userData.url)
      setEmployeeData(userData.data)

      set_totalPages(Math.ceil(parseInt(userData.count) / itemsPerPage));

      // Get current items based on the current page
      // set_startIndex((currentPage - 1) * itemsPerPage);
      // set_currentItems(userData.data.slice(startIndex, startIndex + itemsPerPage));
      set_currentItems(userData.data);
      set_total_gross_wages(userData.total.total_gross_wages)
      set_total_epf_wages(userData.total.total_epf_wages)
      set_total_edli_wages(userData.total.total_edli_wages)
      set_total_eps_wages(userData.total.total_eps_wages)
      set_total_ee_share(userData.total.total_ee_share)
      set_total_eps_share(userData.total.total_eps_share)
      set_total_diff_share(userData.total.total_diff_share)
      set_total_ncp_days(userData.total.total_ncp_days)
      set_total_refund(userData.total.total_refund)



    } catch (error) {
      console.error('Login error ', error);
      // setError(error);
    }
  };


  const download = async () => {
    // api call
    try {
      const params = {
        "est_id": getErId(),
        "ee_id": 0,
        "month": selectedMonth,
        "year": selectedYear
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

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getReturnByMonth(pageNumber);
  };


  return (
    <div>

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
                          aria-label="Default select example" value={selectedMonth} onChange={handleMonthChange}
                        >
                          {returnsYear.month.map((returnYear) => (
                            // eslint-disable-next-line react/jsx-key
                            <option value={returnYear.monthNum}>{returnYear.monthText}</option>
                          ))}
                        </select>

                      </div>
                      <div className="col mb-4">
                        <select
                          className="form-select"
                          aria-label="Default select example" value={selectedYear} onChange={handleYearChange}
                        >
                          {returnsYear.Year.map((retYear) => (
                            // eslint-disable-next-line react/jsx-key
                            <option value={retYear}>{retYear}</option>
                          ))}
                        </select>

                      </div>
                      <div className="col-md-2">
                        <button type="button" className="btn btn-primary btn-block" onClick={() => { getReturnByMonth(1) }} >
                          Next
                        </button>
                      </div>
                    </div>



                  </form>

                  <div className="row">
                    <div className="col-sm">
                      <h5 className="mt-4">EPF Return For Month {selectedMonth}-{selectedYear}</h5>
                    </div>
                    <div className="col-md-2">
                      <button type="button" className="btn btn-primary btn-block" onClick={download} disabled={!isDownload} >
                        Download
                      </button>
                    </div>
                  </div>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Sn</th>
                        <th scope="col">UAN</th>
                        <th scope="col">Name</th>
                        <th scope="col">Gross Wages</th>
                        <th scope="col">EPF Wages</th>
                        <th scope="col">EDLI Wages</th>
                        <th scope="col">EPS Wages</th>
                        <th scope="col">EE(12%)</th>
                        <th scope="col">ER(3.67%)</th>
                        <th scope="col">EPS(8.33%)</th>
                        <th scope="col">NCP Days</th>
                        {/* <th scope="col">Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((employee, index) => {
                        const globalIndex = currentPage * itemsPerPage - itemsPerPage + index;
                        return (

                          <tr key={index}>
                            <th scope="row">{globalIndex + 1}</th>
                            <th scope="row">{employee.ee_uan}</th>
                            <td>{employee.er_name}</td>
                            <td>{employee.gross_wages}</td>
                            <td>{employee.epf_wages}</td>
                            <td>{employee.edli_wages}</td>
                            <td>{employee.eps_wages}</td>
                            <td>{employee.ee_share}</td>
                            <td>{employee.diff_share}</td>
                            <td>{employee.eps_share}</td>
                            <td>{employee.ncp_days}</td>
                            {/* <td>
                      <div className="d-flex align-items-center">
                        <button className="btn btn-light" data-toggle="modal" data-target="#exampleModal" onClick={() => { fetchEmployee(employee.id) }}>
                          <i className="bi bi-eye text-info"></i>
                        </button>
                        <button className="btn btn-light mx-1" data-toggle="modal" data-target="#exampleModal" >
                          <i className="bi bi-pencil-fill text-info"></i>
                        </button>
                        <button className="btn btn-light" disabled>
                          <i className="bi bi-trash text-danger"></i>
                        </button>
                      </div>
                    </td> */}
                          </tr>
                        )
                      })}
                    </tbody>
                    <tfoot>
                <tr>
                  <th id="total" colSpan="3">Total :</th>
                  <td>{total_gross_wages}</td>
                  <td>{total_epf_wages}</td>
                  <td>{total_edli_wages}</td>
                  <td>{total_eps_wages}</td>
                  <td>{total_ee_share}</td>
                  <td>{total_eps_share}</td>
                  <td>{total_diff_share}</td>
                  <td>{total_ncp_days}</td>
                  <td></td>
                </tr>
              </tfoot>
                  </table>
                  {/* Pagination Controls */}
                  <div className="pagination">
                    <button className="btn btn-primary"
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        style={{ margin: '0 2px', backgroundColor: currentPage === index + 1 ? '#1e60aa' : 'white', border: '0px' }}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button className="btn btn-primary"
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </button>
                  </div>

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