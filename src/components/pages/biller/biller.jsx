import { createBill, getBill, getEmployer, paymentReceived, updateBill } from '../../api/services';
import { useState, useEffect } from "react"
import { getEstId } from "../Auth/authToken";
import moment from 'moment';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import "./bill.css"


const ecr = () => {

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
    const [modalTotal, setModalTotal] = useState(0)

    const [IsUpdate, setIsUpdate] = useState(false);


    const [receivedAmountDate, set_receivedAmountDate] = useState('')
    const [receivedAmount, set_receivedAmount] = useState('')
    const [discountOnReceivedAmount, set_discountOnReceivedAmount] = useState('')
    const [gstOnReceived, set_gstOnReceived] = useState('')
    const [paymentMode, set_paymentMode] = useState('')

    const biller = async () => {

        if (bill_number) {
            await getBillById()
        } else {
            await fetchEmployer()
        }
    }

    const fetchEmployer = async () => {
        const params = {
            "est_epf_id": est_id
        }
        try {
            // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
            const response = await getEmployer(params);
            setEstId(response.data.est_epf_id);
            setEstName(response.data.est_name)
            setErName(response.data.er_name)
            //   setEmail(response.data.er_email_id)
            //   setMobile(response.data.er_mobile_number)
            setAddress(response.data.est_address)
            setDOC(response.data.est_doc)
            set_rate(response.data.rate)
            setEmail(response.data.er_email_id)
            setMobile(response.data.er_mobile_number)
            setDesignation(response.data.est_designation)
            setCity(response.data.est_city)



        } catch (error) {
            console.error('Error fetching data:', error);
            // setError('Error fetching data. Please try again.');

        }
    };
    const getBillById = async () => {

        try {
            // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
            const response = await getBill(bill_number);
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


        } catch (error) {
            console.error('Error fetching data:', error);
            // setError('Error fetching data. Please try again.');

        }
    };
    const calculation = async () => {

        try {
            const date1 = moment(fromDate, 'YYYY-MM');
            const date2 = moment(toDate, 'YYYY-MM');
            const differenceInMonths = date2.diff(date1, 'months');

            let newItems = [];

            if (checkedPf) {
                newItems.push({
                    perticular: "EPF Challan For Period " + fromDate + " To " + toDate,
                    rate: rate,
                    amount: rate * differenceInMonths,
                    billNumber: bill_number
                });
            }

            if (checkedEsic) {
                newItems.push({
                    perticular: "ESIC Challan For Period " + fromDate + " To " + toDate,
                    rate: rate,
                    amount: rate * differenceInMonths,
                    billNumber: bill_number
                });
            }

            if (checkedCoverage && coverageAmount > 0) {
                newItems.push({
                    perticular: "EPF Registration Charge",
                    rate: coverageAmount,
                    amount: coverageAmount,
                    billNumber: bill_number
                });
            }

            if (checkedOther && otherAmount > 0) {
                newItems.push({
                    perticular: otherReason,
                    rate: otherAmount,
                    amount: otherAmount,
                    billNumber: bill_number
                });
            }

            // Update state with new items and calculate total amount
            setFinalBillArray(prevArray => {
                const updatedArray = [...prevArray, ...newItems];
                const newTotalAmount = updatedArray.reduce((total, bill) => parseInt(total) + parseInt(bill.amount), 0);
                setTotalAmount(newTotalAmount);
                return updatedArray;
            });

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
            setModalTotal(rate * differenceInMonths - modalTotal)
            let item = {
                "perticular": "EPF Challan For Period " + fromDate + " To " + toDate,
                "rate": rate,
                "amount": rate * differenceInMonths,
                "billNumber": bill_number
            }
            // setFinalBillArray(prevArray => [...prevArray, item]);
        } else if (event.target.id == "flexSwitchCheckPf" && !event.target.checked) {
            setCheckedPf(event.target.checked);
            setModalTotal(rate * differenceInMonths - modalTotal)
            setpfAmount(0)
        }
        if (event.target.id == "flexSwitchCheckEsic" && event.target.checked) {
            setCheckedEsic(event.target.checked);
            setEsicAmount(rate * differenceInMonths)
            setModalTotal(rate * differenceInMonths + modalTotal)
            let item = {
                "perticular": "ESIC Challan For Period " + fromDate + " To " + toDate,
                "rate": rate,
                "amount": rate * differenceInMonths,
                "billNumber": bill_number
            }
            // setFinalBillArray(prevArray => [...prevArray, item]);
        } else if (event.target.id == "flexSwitchCheckEsic" && !event.target.checked) {
            setCheckedEsic(event.target.checked);
            setModalTotal(rate * differenceInMonths - modalTotal)
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

    const calculate = async () => {
        setModalTotal(modalTotal + coverageAmount);
    }

    const remove = async (index) => {


        // Get the amount of the item at the specified index
        const itemToRemove = finalBillArray[index];

        setTotalAmount(totalAmount - itemToRemove);
        const newArray = finalBillArray.filter((_, idx) => idx !== index);
        // Update the state with the new array
        setFinalBillArray([]);
        setFinalBillArray(prevArray => {
            const updatedArray = [...prevArray, ...newArray];
            const newTotalAmount = updatedArray.reduce((total, bill) => parseInt(total) + parseInt(bill.amount), 0);
            setTotalAmount(newTotalAmount);
            return updatedArray;
        });
    }

    const addBill = async () => {
        let params = {
            "est_epf_id": est_id,
            "est_esic_id": "12345678",
            "rate": rate,
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

    const update = async () => {
        let params = {
            "est_epf_id": est_id,
            "est_esic_id": "12345678",
            "rate": rate,
            "amount": totalAmount,
            "billData": finalBillArray
        }

        try {
            // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
            const data = await updateBill(bill_number, params);
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


    const savePaymentReceived = async () => {
        let params = {
            "bill_id": bill_number,
            "paymentMode":paymentMode,
            "date": receivedAmountDate,
            "perticular": "",
            "amount": receivedAmount,
            "gst": gstOnReceived,
            "discount": discountOnReceivedAmount
        }
        try {
            // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
            const data = await paymentReceived(params);
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
    const generatePDF = () => {
        // Capture the HTML content as a canvas
        html2canvas(document.querySelector("#pdf-content")).then(canvas => {
            const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' for page size
            const imgData = canvas.toDataURL("image/png");

            // Add the image to the PDF
            pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
            pdf.save("invoice.pdf");
        });
    };
    const handlePaymentModeChange = (e) => {
        set_paymentMode(e.target.value);
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
                                            <input type="text" className="form-control rounded-4" onChange={(e) => setEstId(e.target.value)} value={est_id} />
                                        </div>
                                        <div className="col-sm">
                                            <label htmlFor="inputText" >Bill Number</label>
                                            <input type="text" className="form-control rounded-4" onChange={(e) => setBillNumber(e.target.value)} value={bill_number} />
                                        </div>
                                        <div className="col-sm-2">
                                            <button type="button" className="btn btn-outline-primary rounded-4" style={{ "margin": "30px 10px 10px 10px" }} onClick={biller}>Get Details</button>
                                        </div>
                                    </div>
                                </form>

                                <div className="row">
                                    <div className="col-sm">
                                        <label htmlFor="inputText" >Company Name</label>
                                        <input type="text" className="form-control rounded-4" required onChange={(e) => setEstName(e.target.value)} value={est_name} />
                                    </div>
                                    <div className="col-sm">
                                        <label htmlFor="inputText" >Employer Name</label>
                                        <input type="text" className="form-control rounded-4" required onChange={(e) => setErName(e.target.value)} value={er_name} />
                                    </div>
                                    <div className="col-sm">
                                        <label htmlFor="inputText" >Date Of Coverage</label>
                                        <input type="text" className="form-control rounded-4" required onChange={(e) => setDOC(e.target.value)} value={est_doc} />
                                    </div>
                                    <div className="col-sm">
                                        <label htmlFor="inputText" >Address</label>
                                        <input type="text" className="form-control rounded-4" required onChange={(e) => setAddress(e.target.value)} value={est_address} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm">
                                        <label htmlFor="inputText" >From</label>
                                        <input type="month" className="form-control rounded-4" required onChange={(e) => setFromDate(e.target.value)} value={fromDate} />
                                    </div>
                                    <div className="col-sm">
                                        <label htmlFor="inputText" >To</label>
                                        <input type="month" className="form-control rounded-4" required onChange={(e) => setToDate(e.target.value)} value={toDate} />
                                    </div>
                                    <div className="col-sm">
                                        <button type="button" className="btn btn-outline-primary btn-block rounded-4" style={{ "margin": "30px 5px 10px 10px" }} data-toggle="modal" data-target="#exampleModal">Next</button>
                                    </div>
                                    {!IsUpdate ? (<div className="col-sm">
                                        <button type="button" className="btn btn-outline-primary btn-block rounded-4" style={{ "margin": "30px 5px 10px 10px" }} onClick={addBill}>Save</button>
                                    </div>) : (<div className="col-sm">
                                        <button type="button" className="btn btn-outline-primary btn-block rounded-4" style={{ "margin": "30px 5px 10px 10px" }} onClick={update}>Update</button>
                                    </div>)}
                                    <div className="col-sm">
                                        <button type="button" className="btn btn-outline-primary btn-block rounded-4" style={{ "margin": "30px 5px 10px 10px" }} data-toggle="modal" data-target=".bd-example-modal-xl">Make PDF</button>
                                    </div>
                                    <div className="col-sm">
                                        <button type="button" className="btn btn-outline-primary btn-block rounded-4" style={{ "margin": "30px 5px 10px 10px" }} data-toggle="modal" data-target="#exampleModal">Email PDF</button>
                                    </div>
                                    <div className="col-sm">
                                        <button type="button" className="btn btn-outline-primary btn-block rounded-4" style={{ "margin": "30px 5px 10px 10px" }} data-toggle="modal" data-target="#exampleModal">Print PDF</button>
                                    </div>
                                    <div className="col-sm">
                                        <button type="button" className="btn btn-outline-primary btn-block rounded-4" style={{ "margin": "30px 5px 10px 10px" }} data-toggle="modal" data-target="#receivedModal" disabled={!IsUpdate}>Received</button>
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
                                                            {/* <input className="form-control rounded-4" type="text" id="flexSwitchCheckDefault" /> */}
                                                            <input style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', textAlign: 'right' }} className="form-control rounded-4 float-right" type="text" id="flexSwitchCheckDefault" disabled value={pfAmount} />
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
                                                            {/* <input className="form-control rounded-4" type="text" id="flexSwitchCheckDefault" /> */}
                                                            {/* <label className="form-check-label float-right">{esicAmount}</label> */}
                                                            <input style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', textAlign: 'right' }} className="form-control rounded-4 float-right" type="text" id="flexSwitchCheckDefault" disabled value={esicAmount} />
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
                                                                <input style={{ outline: 'none', backgroundColor: 'transparent', textAlign: 'right' }} className="form-control rounded-4 float-right" type="number" id="flexSwitchCheckDefault" disabled={!checkedCoverage} onChange={(e) => setCoverageAmount(e.target.value)} value={coverageAmount} />
                                                            </div>

                                                        ) : (
                                                            <div className="form-check form-switch">
                                                                <input style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', textAlign: 'right' }} className="form-control rounded-4 float-right" type="text" id="flexSwitchCheckDefault" disabled={!checkedCoverage} onChange={(e) => { setCoverageAmount(e.target.value); calculate(); }} value={coverageAmount} />
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
                                                                <input style={{ outline: 'none', backgroundColor: 'transparent', textAlign: 'right' }} className="form-control rounded-4 float-right" type="text" id="flexSwitchCheckDefault" disabled={!checkedOther} onChange={(e) => setOtherReason(e.target.value)} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className='col-sm-4'>
                                                        {checkedOther ? (
                                                            <div className="form-check form-switch">
                                                                <input style={{ outline: 'none', backgroundColor: 'transparent', textAlign: 'right' }} className="form-control rounded-4" type="number" id="flexSwitchCheckDefault" disabled={!checkedOther} onChange={(e) => { setOtherAmount(e.target.value); }} value={otherAmount} />
                                                            </div>
                                                        ) : (
                                                            <div className="form-check form-switch">
                                                                <input style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', textAlign: 'right' }} className="form-control rounded-4" type="number" id="flexSwitchCheckDefault" disabled={!checkedOther} onChange={(e) => { setOtherAmount(e.target.value); }} value={otherAmount} />
                                                            </div>
                                                        )}

                                                    </div>
                                                </div>
                                                <hr />
                                                {/* <h5><p className="float-right">Total : {modalTotal}</p></h5> */}
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
                                                        <button className="btn btn-light" onClick={() => remove(index)}>
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
                                                                <tbody>
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
                                                        <tbody>
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

                                <div className="modal fade" id="receivedModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Received Amount</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="col-sm mb-2">
                                                    <label>Payment Mode</label>
                                                    <select
                                                        className="form-select rounded-4"
                                                        aria-label="Default select example" value={paymentMode} onChange={handlePaymentModeChange}
                                                    >
                                                        <option value="Cash">Cash</option>
                                                        <option value="Online">Online</option>
                                                    </select>

                                                </div>
                                                <div className="col-sm">
                                                    <label htmlFor="inputText" >Received Date</label>
                                                    <input type="date" className="form-control rounded-4" required onChange={(e) => set_receivedAmountDate(e.target.value)} value={receivedAmountDate} />
                                                </div>
                                                <div className="col-sm">
                                                    <label htmlFor="inputText" >Amount Received</label>
                                                    <input type="text" className="form-control rounded-4" required onChange={(e) => set_receivedAmount(e.target.value)} value={receivedAmount} />
                                                </div>
                                                <div className="col-sm">
                                                    <label htmlFor="inputText" >Discount</label>
                                                    <input type="text" className="form-control rounded-4" required onChange={(e) => set_discountOnReceivedAmount(e.target.value)} value={discountOnReceivedAmount} />
                                                </div>
                                                <div className="col-sm">
                                                    <label htmlFor="inputText" >GST Amount</label>
                                                    <input type="text" className="form-control rounded-4" required onChange={(e) => set_gstOnReceived(e.target.value)} value={gstOnReceived} />
                                                </div>

                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary" onClick={savePaymentReceived}>Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </section>

        </div>
    );
};

export default ecr;
