import { useState, useEffect } from "react"
import { getErId, getEstId } from "../Auth/authToken"
import { Link } from "react-router-dom";
import { getAllBill, getBill, searchBill } from "../../api/services";
import Swal from "sweetalert2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./bill.css"

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

  const [est_name, setEstName] = useState('');
  const [est_id, setEstId] = useState('');
  const [er_name, setErName] = useState('');
  const [est_doc, setDOC] = useState('');
  const [est_address, setAddress] = useState('');
  const [bill_number, setBillNumber] = useState('');
  const [rate, set_rate] = useState('');
  const [estEmail, setEmail] = useState('')
  const [estMobile, setMobile] = useState('')
  const [estDesignation, setDesignation] = useState('')
  const [estCity, setCity] = useState('')
  const [date, setDate] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [finalBillArray, setFinalBillArray] = useState([]);

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

  const getBillById = async (id) => {

    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      const response = await getBill(id);

      if (response.status === true) {
        setBillNumber(id)
        setEstId(response.data.est_epf_id);
        setEstName(response.data.est_name)
        setErName(response.data.er_name)
        setEmail(response.data.er_email_id)
        setMobile(response.data.er_mobile_number)
        setDesignation(response.data.est_designation)
        setCity(response.data.est_city)
        setAddress(response.data.est_address)
        setDate(response.data.date)
        setDOC(response.data.est_doc)
        set_rate(response.data.rate)
        setFinalBillArray(response.data.billData)
        setTotalAmount(response.data.amount)
        setIsUpdate(true)

      } else {
        Swal.fire({
          title: response.message,
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }


    } catch (error) {
      console.error('Error fetching data:', error);
      // setError('Error fetching data. Please try again.');

    }
  };

  const generatePDF = async () => {
    await getBillById()
    // Capture the HTML content as a canvas
    html2canvas(document.querySelector("#pdf-content")).then(canvas => {
      const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' for page size
      const imgData = canvas.toDataURL("image/png");

      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
      pdf.save("invoice.pdf");
    });
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
                          <th scope="col">Action</th>
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
                            <td><button type="button" className="btn btn-outline-primary btn-block rounded-4 w-45" style={{ "margin": "5px" }} data-toggle="modal" data-target=".bd-example-modal-xl" onClick={() => getBillById(item.id)}>PDF</button></td>
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
          <div className="modal fade bd-example-modal-xl" tabIndex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Bill View</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div id="pdf-content">
                    <div className="row">
                      <h2 className='float-right'>Invoice</h2>

                    </div>
                    <div className='row'>
                      <div className='col-sm anandamTitle'>
                        <p><strong>Anandam Consultancy</strong></p>
                        <p><strong>101, Anant Appartment, Near Rakshak Bandhu</strong></p>
                        <p><strong>Manewada Road, Nagpur-440024</strong></p>
                        <p><strong>anand.esipf@gmail.com</strong></p>
                        <p><strong>0712-2748370</strong></p>
                      </div>
                      <div className='col-sm-4'>
                        <table>
                          <tbody className="text-black">
                            <tr>
                              <th>Invoice Number</th>
                              <td>{bill_number}</td>
                            </tr>
                            <tr>
                              <th>Invoice Date</th>
                              <td>{date}</td>
                            </tr>
                            <tr>
                              <th>Employer ID</th>
                              <td>{est_id}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-sm'>
                        <h5 className='text-head'>To</h5>
                        <p><strong>{est_name}</strong></p>
                        <p><strong>{estDesignation}</strong></p>
                        <p><strong>{est_address}</strong></p>
                        <p><strong>{estCity}</strong></p>
                        <p><strong>{estMobile}</strong></p>
                        <p><strong>{estEmail}</strong></p>
                      </div>
                      <div className='col-sm-4'></div>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-sm table-hover">
                        <thead>
                          <tr className='text-head'>
                            <th>S.N.</th>
                            <th>Descriptions</th>
                            <th>Rate</th>
                            <th>Total Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {finalBillArray.map((employee, index) => (
                            <tr key={index}>
                              <th scope="row">{index}</th>
                              <th scope="row">{employee.perticular}</th>
                              <td>Rs. {rate}</td>
                              <td>Rs. {employee.amount}</td>

                            </tr>
                          ))}
                          <tr>
                            <td colSpan="3">Total</td>
                            <td>Rs. {totalAmount}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <table>
                      <tbody className="text-black">
                        <tr>
                          <th><h5 className='text-head'>Bank Details</h5></th>
                        </tr>
                        <tr>
                          <th>Bank Name</th>
                          <td>Indian Overseas Bank</td>
                        </tr>
                        <tr>
                          <th>Branch</th>
                          <td>Hudkeshwar (Nagpur)</td>
                        </tr>
                        <tr>
                          <th>Account Number</th>
                          <td>264102000000449</td>
                        </tr>
                        <tr>
                          <th>IFSC Code</th>
                          <td>IOBA0002641</td>
                        </tr>
                        <tr>
                          <th>PAN</th>
                          <td>AARPV4479R</td>
                        </tr>
                      </tbody>
                    </table>
                    <p>Payment should be made in favor of Anandam Consultancy.</p>
                    <p>For any business enquiry, please contact us at 0712-2748370.</p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className='btn btn-outline-primary btn-block' onClick={generatePDF}>Download PDF</button>
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
