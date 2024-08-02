import { useState, useEffect } from "react"
import { getErId, getEstId } from "../Auth/authToken"
import { Link } from "react-router-dom";

const billMaster = () => {
 // Sample data
 const data = [
  { id: 1, company: 'Anandam', estId: 'NGNAG0012345000', particular: 'EPF Challan For Period Mar-23 To Apr-24', rate: 1000, amount: 12000, paymentMode: 'Cash', status: 'Paid', discount: 0 },
  { id: 2, company: 'Anandam', estId: 'NGNAG0012345000', particular: 'EPF Challan For Period Mar-20 To Apr-24', rate: 1000, amount: 12000, paymentMode: 'Cash', status: 'Paid', discount: 0 },
  { id: 3, company: 'Anandam', estId: 'NGNAG0012345000', particular: 'EPF Challan For Period Mar-21 To Apr-24', rate: 1000, amount: 12000, paymentMode: 'Cash', status: 'Paid', discount: 0 },
  // Add more data as needed
];

const itemsPerPage = 1; // Number of items per page
const [currentPage, setCurrentPage] = useState(1);

const totalPages = Math.ceil(data.length / itemsPerPage);

// Get current items based on the current page
const startIndex = (currentPage - 1) * itemsPerPage;
const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};

  
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
                        <button
                          style={{ "margin": "30px 10px 10px 0px" }}
                          type="submit"
                          className="btn btn-outline-primary btn-block"
                        >
                          Search
                        </button>
                      </div>
                      <div className="col-sm-2">
                        <button
                          style={{ "margin": "30px 10px 10px 0px" }}
                          type="submit"
                          className="btn btn-outline-primary btn-block"
                        >
                          <Link to="/auth/dashboard/bill/create"><span>Create Bill</span></Link>
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
                        <th scope="col">Particular</th>
                        <th scope="col">Rate</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Payment Mode</th>
                        <th scope="col">Status</th>
                        <th scope="col">Discount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map(item => (
                        <tr key={item.id}>
                          <th scope="row">{item.id}</th>
                          <td>{item.company}</td>
                          <td>{item.estId}</td>
                          <td>{item.particular}</td>
                          <td>{item.rate}</td>
                          <td>{item.amount}</td>
                          <td>{item.paymentMode}</td>
                          <td>{item.status}</td>
                          <td>{item.discount}</td>
                        </tr>
                      ))}
                    </tbody>
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
                        style={{ margin: '0 2px', backgroundColor: currentPage === index + 1 ? '#1e60aa' : 'white' , border:'0px'}}
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

export default billMaster;
