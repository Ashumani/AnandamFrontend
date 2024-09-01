import { createBill, getEmployer } from '../../api/services';
import { useState, useEffect } from "react"
import { getEstId } from "../Auth/authToken";
import moment from 'moment';
import Swal from 'sweetalert2';

const ecr = () => {

    const [est_name, setEstName] = useState('');
    const [est_id, setEstId] = useState('');
    const [er_name, setErName] = useState('');
    const [est_doc, setDOC] = useState('');
    const [est_address, setAddress] = useState('');
    const [bill_number, setBillNumber] = useState('');
    const [rate, set_rate] = useState('');

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const [checkedPf, setCheckedPf] = useState(false);
    const [checkedEsic, setCheckedEsic] = useState(false);

    const [checkedCoverage, setCheckedCoverage] = useState(false);

    const [checkedOther, setCheckedOther] = useState(false);

    const [pfAmount, setpfAmount] = useState(0);
    const [esicAmount, setEsicAmount] = useState(0);
    const [otherAmount, setOtherAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [coverageAmount, setCoverageAmount] = useState(0);
    const [finalBillArray, setFinalBillArray] = useState([]);
    const [otherReason, setOtherReason] = useState('');

    const fetchEmployer = async () => {
        const params = {
            "est_epf_id": est_id
        }
        try {
            // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
            const response = await getEmployer(params);
            setEstName(response.data.est_name)
            setErName(response.data.er_name)
            //   setEmail(response.data.er_email_id)
            //   setMobile(response.data.er_mobile_number)
            setAddress(response.data.est_address)
            setDOC(response.data.est_doc)
            set_rate(response.data.rate)

        } catch (error) {
            console.error('Error fetching data:', error);
            // setError('Error fetching data. Please try again.');

        }
    };
    const calculation = async () => {

        try {
            let item = {
                "perticular": "",
                "rate": "",
                "amount": "",
                "billNumber": bill_number
            }

            if (checkedCoverage && coverageAmount > 0) {
                item.perticular = "EPF Registration Charge"
                item.rate = coverageAmount
                item.amount = coverageAmount
                setFinalBillArray(prevArray => [...prevArray, item]);
            }

            if (checkedOther && otherAmount > 0) {
                item.perticular = otherReason
                item.rate = otherAmount
                item.amount = otherAmount
                setFinalBillArray(prevArray => [...prevArray, item]);
            }

            const totalAmount = finalBillArray.reduce((total, bill) => total + bill.amount, 0);
            setTotalAmount(totalAmount);
            resetModel();

        } catch (error) {
            console.error('Error fetching data:', error);
            // setError('Error fetching data. Please try again.');
        }
    };


    const handleChange = (event) => {
        // Define your dates using year-month format
        const date1 = moment(fromDate, 'YYYY-MM');
        const date2 = moment(toDate, 'YYYY-MM');
        // Calculate the difference in months
        const differenceInMonths = date2.diff(date1, 'months');

        if (event.target.id == "flexSwitchCheckPf" && event.target.checked) {
            setCheckedPf(event.target.checked);
            setpfAmount(rate * differenceInMonths)
            let item = {
                "perticular": "EPF Challan For Period " + fromDate + " To " + toDate,
                "rate": rate,
                "amount": rate * differenceInMonths,
                "billNumber": bill_number
            }
            setFinalBillArray(prevArray => [...prevArray, item]);
        } else if (event.target.id == "flexSwitchCheckPf" && !event.target.checked) {
            setCheckedPf(event.target.checked);
            setpfAmount(0)
        }
        if (event.target.id == "flexSwitchCheckEsic" && event.target.checked) {
            setCheckedEsic(event.target.checked);
            setEsicAmount(rate * differenceInMonths)
            let item = {
                "perticular": "ESIC Challan For Period " + fromDate + " To " + toDate,
                "rate": rate,
                "amount": rate * differenceInMonths,
                "billNumber": bill_number
            }
            setFinalBillArray(prevArray => [...prevArray, item]);
        } else if (event.target.id == "flexSwitchCheckEsic" && !event.target.checked) {
            setCheckedEsic(event.target.checked);
            setEsicAmount(0)
        }

        if (event.target.id == "flexSwitchCheckCoverage") {
            setCheckedCoverage(event.target.checked);
            setCoverageAmount(0)
        }
        if (event.target.id == "flexSwitchCheckOther") {
            setCheckedOther(event.target.checked);
            setOtherAmount(0)
        }
    };

    const addBill = async () => {
        let params = {
            "est_epf_id": est_id,
            "est_esic_id": "12345678",
            "rate":rate,
            "amount": totalAmount,
            "billData": finalBillArray
        }
        try {
            // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
            const data = await createBill(params);
            if (data.status === true) {
                Swal.fire({
                  position: 'top-right',
                  icon: 'success',
                  toast: true,
                  title: data.message,
                  showConfirmButton: false,
                  showCloseButton: true,
                  timer: 1500,
                });
              } else {
                Swal.fire({
                  position: 'top',
                  icon: 'error',
                  toast: true,
                  title: data.message,
                  showConfirmButton: true,
                  showCloseButton: true,
                  timer: 1500,
                });
              }
           
        } catch (error) {
            console.error('Error fetching data:', error);
            // setError('Error fetching data. Please try again.');

        }
    };

    const resetModel = () => {

        setFromDate('');
        setToDate('');
        setCheckedPf(false);
        setCheckedEsic(false);
        setCheckedCoverage(false);
        setCheckedOther(false);
        setpfAmount(0);
    };

    const resetPage = () => {

        setEstName('');
        setEstId('');
        setErName('');
        setDOC('');
        setAddress('');
        setBillNumber('');
        set_rate('');
        setFromDate('');
        setToDate('');
        setCheckedPf(false);
        setCheckedEsic(false);
        setCheckedCoverage(false);
        setCheckedOther(false);
        setpfAmount(0);
    };

    return (

        <div className="main-container">
            <div className='main-title'>
                <h3>CREATE BILL</h3>
            </div>
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-center">Create Bill</h5>

                                <form>
                                    <div className="row">
                                        <div className="col-sm">
                                            <label htmlFor="inputText" >Est Id</label>
                                            <input type="text" className="form-control" onChange={(e) => setEstId(e.target.value)} value={est_id} />
                                        </div>
                                        <div className="col-sm">
                                            <label htmlFor="inputText" >Bill Number</label>
                                            <input type="text" className="form-control" onChange={(e) => setBillNumber(e.target.value)} value={bill_number} />
                                        </div>
                                        <div className="col-sm-2">
                                            <button type="button" className="btn btn-outline-primary btn-block" style={{ "margin": "30px 10px 10px 10px" }} onClick={fetchEmployer}>Get Details</button>
                                        </div>
                                    </div>
                                </form>

                                <div className="row">
                                    <div className="col-sm">
                                        <label htmlFor="inputText" >Company Name</label>
                                        <input type="text" className="form-control" required onChange={(e) => setEstName(e.target.value)} value={est_name} />
                                    </div>
                                    <div className="col-sm">
                                        <label htmlFor="inputText" >Employer Name</label>
                                        <input type="text" className="form-control" required onChange={(e) => setErName(e.target.value)} value={er_name} />
                                    </div>
                                    <div className="col-sm">
                                        <label htmlFor="inputText" >Date Of Coverage</label>
                                        <input type="text" className="form-control" required onChange={(e) => setDOC(e.target.value)} value={est_doc} />
                                    </div>
                                    <div className="col-sm">
                                        <label htmlFor="inputText" >Address</label>
                                        <input type="text" className="form-control" required onChange={(e) => setAddress(e.target.value)} value={est_address} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm">
                                        <label htmlFor="inputText" >From</label>
                                        <input type="month" className="form-control" required onChange={(e) => setFromDate(e.target.value)} value={fromDate} />
                                    </div>
                                    <div className="col-sm">
                                        <label htmlFor="inputText" >To</label>
                                        <input type="month" className="form-control" required onChange={(e) => setToDate(e.target.value)} value={toDate} />
                                    </div>
                                    <div className="col-sm">
                                        <button type="button" className="btn btn-outline-primary btn-block" style={{ "margin": "30px 5px 10px 10px" }} data-toggle="modal" data-target="#exampleModal">Next</button>
                                    </div>
                                    <div className="col-sm">
                                        <button type="button" className="btn btn-outline-primary btn-block"  style={{ "margin": "30px 5px 10px 10px" }} onClick={addBill}>Save</button>
                                    </div>
                                    <div className="col-sm">
                                        <button type="button" className="btn btn-outline-primary btn-block"  style={{ "margin": "30px 5px 10px 10px" }} data-toggle="modal" data-target="#exampleModal">Make PDF</button>
                                    </div>
                                    <div className="col-sm">
                                        <button type="button" className="btn btn-outline-primary btn-block"  style={{ "margin": "30px 5px 10px 10px" }} data-toggle="modal" data-target="#exampleModal">Email PDF</button>
                                    </div>
                                    <div className="col-sm">
                                        <button type="button" className="btn btn-outline-primary btn-block"  style={{ "margin": "30px 5px 10px 10px" }} data-toggle="modal" data-target="#exampleModal">Print PDF</button>
                                    </div>
                                    <div className="col-sm">
                                        <button type="button" className="btn btn-outline-primary btn-block"  style={{ "margin": "30px 5px 10px 10px" }} data-toggle="modal" data-target="#exampleModal">Received</button>
                                    </div>
                                </div>

                                {/* Model */}
                                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Bill Parameter</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <div className='row'>
                                                    <div className='col-sm'>
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckPf" checked={checkedPf} onChange={handleChange} />
                                                            <label className="form-check-label">PF Challan</label>
                                                        </div>
                                                    </div><div className='col-md'>
                                                        <div className="form-check form-switch">
                                                            {/* <input className="form-control" type="text" id="flexSwitchCheckDefault" /> */}
                                                            <input style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', textAlign: 'right' }} className="form-control float-right" type="text" id="flexSwitchCheckDefault" disabled value={pfAmount} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-sm'>
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckEsic" checked={checkedEsic} onChange={handleChange} />
                                                            <label className="form-check-label">ESIC Challan</label>
                                                        </div>
                                                    </div><div className='col-md'>
                                                        <div className="form-check form-switch">
                                                            {/* <input className="form-control" type="text" id="flexSwitchCheckDefault" /> */}
                                                            {/* <label className="form-check-label float-right">{esicAmount}</label> */}
                                                            <input style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', textAlign: 'right' }} className="form-control float-right" type="text" id="flexSwitchCheckDefault" disabled value={esicAmount} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-sm'>
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckCoverage" checked={checkedCoverage} onChange={handleChange} />
                                                            <label className="form-check-label">Coverage Amount</label>
                                                        </div>
                                                    </div>
                                                    <div className='col-sm-4'>
                                                        {checkedCoverage ? (
                                                            <div className="form-check form-switch">
                                                                <input style={{ outline: 'none', backgroundColor: 'transparent', textAlign: 'right' }} className="form-control float-right" type="text" id="flexSwitchCheckDefault" disabled={!checkedCoverage} onChange={(e) => setCoverageAmount(e.target.value)} value={coverageAmount} />
                                                            </div>

                                                        ) : (
                                                            <div className="form-check form-switch">
                                                                <input style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', textAlign: 'right' }} className="form-control float-right" type="text" id="flexSwitchCheckDefault" disabled={!checkedCoverage} onChange={(e) => setCoverageAmount(e.target.value)} value={coverageAmount} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='row mt-2'>
                                                    <div className='col-sm-2'>
                                                        <div className="form-check form-switch">
                                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckOther" checked={checkedOther} onChange={handleChange} />
                                                            <label className="form-check-label">Others</label>
                                                        </div>
                                                    </div>
                                                    <div className='col-sm-6'>
                                                        {checkedOther && (
                                                            <div className="form-check form-switch">
                                                                <input style={{ outline: 'none', backgroundColor: 'transparent', textAlign: 'right' }} className="form-control float-right" type="text" id="flexSwitchCheckDefault" disabled={!checkedOther} onChange={(e) => setOtherReason(e.target.value)} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='col-sm-4'>
                                                        {checkedOther ? (
                                                            <div className="form-check form-switch">
                                                                <input style={{ outline: 'none', backgroundColor: 'transparent', textAlign: 'right' }} className="form-control" type="text" id="flexSwitchCheckDefault" disabled={!checkedOther} onChange={(e) => setOtherAmount(e.target.value)} value={otherAmount} />
                                                            </div>
                                                        ) : (
                                                            <div className="form-check form-switch">
                                                                <input style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', textAlign: 'right' }} className="form-control" type="text" id="flexSwitchCheckDefault" disabled={!checkedOther} onChange={(e) => setOtherAmount(e.target.value)} value={otherAmount} />
                                                            </div>
                                                        )}

                                                    </div>
                                                </div>
                                                <hr />
                                                <h5><p className="float-right">Total : 0</p></h5>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={calculation}>Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Perticular</th>
                                            <th scope="col">Rate</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {finalBillArray.map((employee, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index}</th>
                                                <th scope="row">{employee.perticular}</th>
                                                <td>{employee.rate}</td>
                                                <td>{employee.amount}</td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <button className="btn btn-light">
                                                            <i className="bi bi-trash text-danger"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th id="total" colSpan="3">Total : </th>
                                            <td>{totalAmount}</td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                                {/* <div className="row">
                                    <div className="col-sm-2">
                                        <button type="button" className="btn btn-outline-primary btn-block" style={{ "margin": "2px 5px 10px 10px" }} data-toggle="modal" data-target="#exampleModal">Save</button>
                                    </div>
                                    <div className="col-sm-2">
                                        <button type="button" className="btn btn-outline-primary btn-block" style={{ "margin": "2px 5px 10px 10px" }} data-toggle="modal" data-target="#exampleModal">Make PDF</button>
                                    </div>
                                    <div className="col-sm-2">
                                        <button type="button" className="btn btn-outline-primary btn-block" style={{ "margin": "2px 5px 10px 10px" }} data-toggle="modal" data-target="#exampleModal">Email PDF</button>
                                    </div>
                                    <div className="col-sm-2">
                                        <button type="button" className="btn btn-outline-primary btn-block" style={{ "margin": "2px 5px 10px 10px" }} data-toggle="modal" data-target="#exampleModal">Print PDF</button>
                                    </div>
                                    <div className="col-sm-2">
                                        <button type="button" className="btn btn-outline-primary btn-block" style={{ "margin": "2px 5px 10px 10px" }} data-toggle="modal" data-target="#exampleModal">Received</button>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                    </div>
                </div>

            </section>

        </div>
    );
};

export default ecr;
