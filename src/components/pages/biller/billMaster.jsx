import { useState, useEffect } from "react"
import moment from 'moment';

import { getErId, getEstId } from "../Auth/authToken"
import { Link, useNavigate } from "react-router-dom";
import { getAllBill, getBill, searchBill } from "../../api/services";
import Swal from "sweetalert2";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import consultancyStamp from "../../../standalone_assets/images/consultancyStamp.png"
import "./bill.css"
import { toWords } from "number-to-words";

const billMaster = () => {
  const [amountToWord, setAmountToWord] = useState('');

  const [bankdetails, setBankDetails] = useState({});

  const [billType, setBillType] = useState("");
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
  const navigate = useNavigate();

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
        setBillType(response.data.bill_type)
        setAddress(response.data.est_address)
        setDate(response.data.date)
        setDOC(response.data.est_doc)
        set_rate(response.data.rate)
        setFinalBillArray(response.data.billData)
        set_totalAmount(response.data.amount)
        // setIsUpdate(true)
        selectBankdetails()

        // toWords(21000) returns "twenty-one thousand"
        const words = toWords(response.data.amount);

        // Capitalize first letter of each word
        const capitalizedWords = words
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        setAmountToWord(capitalizedWords)


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

  const selectBankdetails = async () => {
    if (billType == "consultant") {
      let Bank_details = {
        "account": "264102000000449",
        "pan": "AARPV4479R",
        "office": "Anandam Consultantncy",
        "bank_name": "Indian Overseas Bank",
        "branch": "Hudkeshwar(Nagpur)",
        "ifsc": "IOBA0002641"
      }
      setBankDetails(Bank_details)

    } else {
      let Bank_details = {
        "office": "Anandam Solution & Services",
        "account": "264102000000169",
        "pan": "AETPV0937Q",
        "bank_name": "Indian Overseas Bank",
        "branch": "Hudkeshwar(Nagpur)",
        "ifsc": "IOBA0002641"
      }
      setBankDetails(Bank_details)
    }
  }

  const generatePDF = async () => {
    await getBillById(bill_number);

    const element = document.querySelector("#pdf-content");
    if (!element) return;

    // 1. High-resolution canvas capturing
    const canvas = await html2canvas(element, {
      scale: 2,           // Sharp text resolution (2x Retina scale)
      useCORS: true,      // Loads local images and fonts cleanly
      logging: false,
      backgroundColor: "#ffffff", // Prevents transparent background fading
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF('p', 'mm', 'a4');

    // 2. A4 Dimensions & Margins
    const pdfWidth = pdf.internal.pageSize.getWidth();  // 210 mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297 mm
    const margin = 10;                                   // 10 mm margin
    const imgWidth = pdfWidth - margin * 2;             // 190 mm printable area

    // 3. Proportional height calculation (Prevents stretching)
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // 4. Add image safely within page limits
    pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);

    pdf.save(`Invoice_${bill_number || "Anandam"}.pdf`);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const handleEdit = (billId) => {

    navigate(`/auth/dashboard/bill/create/${billId}`);

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
                    <table className="table table-sm table-hover font-size-bill">
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
                            <td><button type="button" className="btn btn-outline-primary" style={{ "margin": "5px" }} data-toggle="modal" data-target=".bd-example-modal-xl" onClick={() => getBillById(item.id)}><i className="bi bi-file-pdf-fill"></i></button></td>
                            <td><button type="button" className="btn btn-outline-primary" style={{ "margin": "5px" }} onClick={() => handleEdit(item.id)}><i className="bi bi-pencil"></i></button></td>
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
                  <div id="pdf-content" className="invoice-template">

                    {/* Header */}
                    <div className="invoice-header d-flex justify-content-between">

                      <div className="invoice-logo">
                        <h1>INVOICE</h1>
                      </div>

                      <div className="text-right">
                        {/* <a href="/auth/dashboard" className="logo d-flex align-items-center">
                          <img className="d-none d-lg-block main_logo ml-4" style={{ width: '100%', "max-height": "250px" }} src={logo} alt="" />
                        </a> */}
                        <h1 className="anandamTitle"><b>{billType == "services" ? "Anandam Solution and Services" : "Anandam Consultancy"}</b></h1>

                        <div><h5>101, Anant Apartment</h5></div>
                        <div><h5>Near Rakshak Bandhu</h5></div>
                        <div><h5>Manewada Road, Nagpur-440024</h5></div>
                        <div><h5>0712-2748370</h5></div>
                        <div><h5>anand.esipf@gmail.com</h5></div>
                      </div>

                    </div>

                    {/* Details */}

                    <div className="row mt-3 ">

                      <div className="col-md-6 toSection">
                        <h5><b>To</b></h5>

                        <p><h4><b>{est_name}</b></h4></p>

                        <p><h5>{estDesignation}</h5></p>

                        <p><h5>{est_address}</h5></p>

                        <p><h5>{estCity}</h5></p>

                        <p><h5>{estMobile}</h5></p>

                        <p><h5>{estEmail}</h5></p>
                      </div>

                      <div className="col-md-6 text-right">


                        <table className="table table-borderless table-sm">

                          <tbody>

                            <tr>
                              <th>Invoice No.</th>
                              <td>{bill_number}</td>
                            </tr>

                            <tr>
                              <th>Date of Issue</th>
                              <td>{date ? moment(date).format("DD-MM-YYYY") : "N/A"}</td>
                            </tr>

                            <tr>
                              <th>Employer ID</th>
                              <td>{est_id}</td>
                            </tr>

                          </tbody>

                        </table>

                      </div>

                    </div>
                    {/* Item Table */}

                    <table className="table table-bordered mt-3">

                      <thead>

                        <tr>

                          <th width="8%">Item</th>

                          <th>Description</th>

                          <th width="15%">Rate</th>

                          <th width="18%">Amount</th>

                        </tr>

                      </thead>

                      <tbody>

                        {finalBillArray.map((employee, index) => (

                          <tr key={index}>

                            <td>{index + 1}</td>

                            <td>{employee.perticular}</td>

                            <td>₹ {rate}</td>

                            <td>₹ {employee.amount}</td>

                          </tr>

                        ))}

                        {/* Blank rows */}

                        {[...Array(Math.max(0, 1 - finalBillArray.length))].map((_, i) => (

                          <tr key={i}>

                            <td>&nbsp;</td>


                          </tr>

                        ))}

                      </tbody>

                    </table>

                    <br />
                    {/* Bottom */}

                    <div className="row mt-4">

                      <div className="col-md-6">

                        <h5>Bank Details</h5>

                        <table className="table table-borderless table-sm">

                          <tbody>

                            <tr>

                              <th>Bank</th>

                              <td>{bankdetails.bank_name}</td>

                            </tr>

                            <tr>

                              <th>Branch</th>

                              <td>{bankdetails.branch}</td>

                            </tr>

                            <tr>

                              <th>Account No.</th>

                              <td>{bankdetails.account}</td>

                            </tr>

                            <tr>

                              <th>IFSC</th>

                              <td>{bankdetails.ifsc}</td>

                            </tr>

                            <tr>

                              <th>PAN</th>

                              <td>{bankdetails.pan}</td>

                            </tr>

                          </tbody>

                        </table>
                      </div>

                      <div className="col-md-6">
                        <br></br>
                        <table className="table table-borderless">

                          <tbody>

                            <tr>

                              <th>Subtotal</th>

                              <td className="text-right">
                                ₹ {totalAmount}
                              </td>

                            </tr>

                            <tr>

                              <th>Discount</th>

                              <td className="text-right">
                                ₹ 0.00
                              </td>

                            </tr>

                            <tr className="invoice-total">

                              <th>Total</th>

                              <th className="text-right">
                                ₹ {totalAmount}
                              </th>

                            </tr>
                            <tr className="invoice-total">
                              <th></th>
                              <th className="text-right">Rs. {amountToWord} Only</th>


                            </tr>

                          </tbody>

                        </table>

                      </div>

                    </div>
                    <div className="row justify-content-end my-3">
                      <div className="col-auto text-right">
                        <img
                          className="main_logo mr-4"
                          style={{ width: '320px', maxHeight: '320px', objectFit: 'contain' }}
                          src={consultancyStamp}
                          alt="Stamp"
                        />
                      </div>
                    </div>
                    <br /><br /><br />
                    <div className="invoice-footer">


                      <p><h5>Payment Should make in favor of Anandam Solution And Services</h5></p>
                      <p><h5>For any Busniess enquiry please contact us Manewada Road, Nagpur-440024</h5></p>
                      <p><h5>Thank you for your business!</h5></p>


                    </div>

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
