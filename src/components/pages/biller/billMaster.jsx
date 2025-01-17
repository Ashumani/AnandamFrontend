import { useState, useEffect } from "react"
import { getErId, getEstId } from "../Auth/authToken"
import { Link } from "react-router-dom";
import { getAllBill, searchBill } from "../../api/services";

const billMaster = () => {
  // Sample data
  const data = [
    { id: 1, company: 'Anandam', estId: 'NGNAG0012345000', particular: 'EPF Challan For Period Mar-23 To Apr-24', rate: 1000, amount: 12000, paymentMode: 'Cash', status: 'Paid', discount: 0 },
    { id: 2, company: 'Anandam', estId: 'NGNAG0012345000', particular: 'EPF Challan For Period Mar-20 To Apr-24', rate: 1000, amount: 12000, paymentMode: 'Cash', status: 'Paid', discount: 0 },
    { id: 3, company: 'Anandam', estId: 'NGNAG0012345000', particular: 'EPF Challan For Period Mar-21 To Apr-24', rate: 1000, amount: 12000, paymentMode: 'Cash', status: 'Paid', discount: 0 },
    // Add more data as needed
  ];
  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, set_totalPages] = useState(1);

  // Get current items based on the current page
  const [startIndex, set_startIndex] = useState('');
  const [currentItems, set_currentItems] = useState([]);

  const [totalAmount, set_totalAmount] = useState('');
  const [totalDiscount, set_totalDiscount] = useState('');
  const [totalPaidAmount, set_totalPaidAmount] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      await getAll(0);
    };

    fetchData();

  }, []);

  const getAll = async (pageNumber) => {
    // api call
    const params = {
      "est_epf_id": getEstId(),
      "limit": itemsPerPage,
      "offset": pageNumber
    }
    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await getAllBill(params);
      if (response.status == true) {
        // setEmployeeData(response.data);

        set_totalPages(Math.ceil(response.data.length / itemsPerPage));

        // Get current items based on the current page
        set_startIndex((currentPage - 1) * itemsPerPage);
        set_totalPages(Math.ceil(response.count / itemsPerPage));
        set_currentItems(response.data);
        set_totalAmount(response.total[0].totalamount)
        set_totalDiscount(response.total[0].totaldiscount)
        set_totalPaidAmount(response.total[0].totalpaidamount)
      }


    } catch (error) {
      console.error('Error fetching data:', error);
      // setError('Error fetching data. Please try again.');
      // setLoading(false);
    }
  };


  const [searchName, setSearchName] = useState('')
  const getBillByName = async () => {

    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await searchBill(searchName);

      if (response.status == true) {
        // setEmployeeData(response.data);

        set_totalPages(Math.ceil(response.data.length / itemsPerPage));

        // Get current items based on the current page
        set_startIndex((currentPage - 1) * itemsPerPage);
        set_totalPages(Math.ceil(response.count / itemsPerPage));
        set_currentItems(response.data);

      }

    } catch (error) {
      console.error('Error fetching data:', error);
      // setError('Error fetching data. Please try again.');

    }
  };

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

                  <div className="row">
                    <div className="col-sm-2">
                      <label htmlFor="inputEmail">PF</label>
                      <input type="email" className="form-control rounded-4" />
                    </div>
                    <div className="col-sm-2">
                      <label htmlFor="inputPassword">Name</label>
                      <input type="text" className="form-control rounded-4" onChange={(e) => setSearchName(e.target.value)} />
                    </div>
                    <div className="col-sm-2">
                      <button
                        style={{ "margin": "23px 10px 10px 0px" }}
                        type="button"
                        className="btn btn-outline-primary btn-block rounded-4"
                        onClick={getBillByName}
                      >
                        Search
                      </button>
                    </div>
                    <div className="col-sm-2">
                      <Link to="/auth/dashboard/bill/create">
                        <button
                          style={{ "margin": "23px 10px 10px 0px" }}
                          type="button"
                          className="btn btn-outline-primary btn-block rounded-4"
                        >
                          Create Bill
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-sm table-hover">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Est Id</th>
                          <th scope="col">Particular</th>
                          <th scope="col">Rate</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Pay Mode</th>
                          <th scope="col">Discount</th>
                          <th scope="col">Amt Paid</th>
                          <th scope="col">Status</th>

                        </tr>
                      </thead>
                      <tbody>
                        {currentItems.map(item => (
                          <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.est_name}</td>
                            <td>{item.est_epf_id}</td>
                            {/* <td>{item.particular}</td> */}
                            <td>
                              <table>
                                <tbody>
                                  {item.billData.map(billItem => (
                                    <tr key={billItem.bill_id}>
                                      <td>{billItem.perticular}</td>
                                      <td>{billItem.amount}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </td>
                            <td>{item.rate}</td>
                            <td>{item.amount}</td>
                            <td>{item.paymentMode}</td>
                            <td>{item.discount}</td>
                            <td>{item.amount_paid}</td>
                            <td>{item.status}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th id="total" colSpan="5">Total :</th>
                          <td colSpan="2">{totalAmount}</td>
                          <td>{totalDiscount}</td>
                          <td>{totalPaidAmount}</td>
                          <td></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

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

export default billMaster;
