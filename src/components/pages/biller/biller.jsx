import { createBill, getBill, getEmployer, paymentReceived, updateBill } from '../../api/services';
import { useState, useEffect } from "react"
import { getEstId } from "../Auth/authToken";
import moment from 'moment';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import consultancyStamp from "../../../standalone_assets/images/consultancyStamp.png"

import "./bill.css"
import { useParams } from 'react-router-dom';
import { toWords } from 'number-to-words';


const ecr = () => {

    const [bankdetails, setBankDetails] = useState({});
    const [amountToWord, setAmountToWord] = useState('');
    const [est_name, setEstName] = useState('');
    const [est_id, setEstId] = useState('');
    const [esic_est_id, setESICEstId] = useState('');
    const [er_name, setErName] = useState('');
    const [est_doc, setDOC] = useState('');
    const [est_address, setAddress] = useState('');
    const [bill_number, setBillNumber] = useState('');
    const [bill_number_map, setBillNumberMap] = useState('');
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
    const [showTypeModal, setShowTypeModal] = useState(false);
    const [billType, setBillType] = useState("consultant");


    const [receivedAmountDate, set_receivedAmountDate] = useState('')
    const [receivedAmount, set_receivedAmount] = useState('')
    const [discountOnReceivedAmount, set_discountOnReceivedAmount] = useState('')
    const [gstOnReceived, set_gstOnReceived] = useState('')
    const [paymentMode, set_paymentMode] = useState('')

    const { id } = useParams();


    useEffect(() => {
        if (id) {
            biller(id)
        } else if (getEstId()) {
            setShowTypeModal(true)
            fetchEmployer(getEstId())

        }


    }, [id]);

    const biller = async (bill_number) => {

        if (est_id)  {
            await fetchEmployer(bill_number)
        } else{
            let billno = bill_number
            resetPage()
            setBillNumberMap(billno)
            await getBillById(billno)
        }
    }

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
    const fetchEmployer = async (est_id) => {
        resetModel();
        resetPage();

        const params = {
            "est_epf_id": est_id
        }
        try {
            // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
            const response = await getEmployer(params);

            if (response.status === true) {
                setEstId(response.data.est_epf_id);
                setESICEstId(response.data.est_esic_id)
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

    const getBillById = async (bill_number) => {

        try {
            // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
            const response = await getBill(bill_number);

            if (response.status === true) {
                setBillType(response.data.bill_type);
                setEstId(response.data.est_epf_id);
                setESICEstId(response.data.est_esic_id)
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
                setBillNumberMap(response.data.bill_number_map)
                setBillNumber(response.data.id)
                setIsUpdate(true)
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
    const calculation = async () => {
        try {
            if (!fromDate || !toDate) {
                alert("Please select both From and To dates.");
                return;
            }

            // 1. Parse Moment objects once
            const date1 = moment(fromDate, 'YYYY-MM');
            const date2 = moment(toDate, 'YYYY-MM');

            // Calculate total months (inclusive)
            const differenceInMonths = date2.diff(date1, 'months') + 1;

            // 2. Prepare common date metadata
            const formattedFrom = date1.format('MM-YYYY');
            const formattedTo = date2.format('MM-YYYY');
            const periodText = `For Period ${formattedFrom} To ${formattedTo}`;

            const dateMeta = {
                fromMonth: date1.month() + 1,
                toMonth: date2.month() + 1,
                fromYear: date1.year(),
                toYear: date2.year(),
                billNumber: bill_number,
            };

            let newItems = [];

            // 3. Push items conditionally
            if (checkedPf) {
                newItems.push({
                    ...dateMeta,
                    perticular: `EPF Challan ${periodText}`,
                    rate: rate,
                    amount: rate * differenceInMonths,
                });
            }

            if (checkedEsic) {
                newItems.push({
                    ...dateMeta,
                    perticular: `ESIC Challan ${periodText}`,
                    rate: rate,
                    amount: rate * differenceInMonths,
                });
            }

            if (checkedCoverage && coverageAmount > 0) {
                newItems.push({
                    ...dateMeta,
                    perticular: "EPF Registration Charge",
                    rate: coverageAmount,
                    amount: coverageAmount,
                });
            }

            if (checkedOther && otherAmount > 0) {
                newItems.push({
                    ...dateMeta,
                    perticular: otherReason,
                    rate: otherAmount,
                    amount: otherAmount,
                });
            }

            // 4. Update state safely
            setFinalBillArray((prevArray) => {
                const updatedArray = [...prevArray, ...newItems];
                const newTotalAmount = updatedArray.reduce(
                    (total, item) => total + (Number(item.amount) || 0),
                    0
                );
                setTotalAmount(newTotalAmount);
                const words = toWords(newTotalAmount);

                // Capitalize first letter of each word
                const capitalizedWords = words
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                setAmountToWord(capitalizedWords)

                return updatedArray;
            });

            // 5. Cleanup UI
            resetModel();
            closeModal('exampleModal');

        } catch (error) {
            console.error('Error during bill calculation:', error);
        }
    };

    const handleChange = (event) => {
        const { id, checked } = event.target;

        // Parse date range
        const date1 = moment(fromDate, 'YYYY-MM');
        const date2 = moment(toDate, 'YYYY-MM');
        const differenceInMonths = (date1.isValid() && date2.isValid())
            ? date2.diff(date1, 'months') + 1
            : 1;

        const calculatedAmount = rate * differenceInMonths;
        const periodText = `For Period ${date1.format('MM-YYYY')} To ${date2.format('MM-YYYY')}`;

        // Common date payload for objects
        const datePayload = {
            fromMonth: date1.month() + 1,
            toMonth: date2.month() + 1,
            fromYear: date1.year(),
            toYear: date2.year(),
            billNumber: bill_number,
            fromDate,
            toDate
        };

        switch (id) {
            case "flexSwitchCheckPf": {
                setCheckedPf(checked);
                if (checked) {
                    setpfAmount(calculatedAmount);
                    setModalTotal(prev => prev + calculatedAmount);

                    const item = {
                        ...datePayload,
                        perticular: `EPF Challan ${periodText}`,
                        rate,
                        amount: calculatedAmount,
                    };
                    // setFinalBillArray(prev => [...prev, item]);
                } else {
                    setpfAmount(0);
                    setModalTotal(prev => prev - calculatedAmount);
                }
                break;
            }

            case "flexSwitchCheckEsic": {
                setCheckedEsic(checked);
                if (checked) {
                    setEsicAmount(calculatedAmount);
                    setModalTotal(prev => prev + calculatedAmount);

                    const item = {
                        ...datePayload,
                        perticular: `ESIC Challan ${periodText}`,
                        rate,
                        amount: calculatedAmount,
                    };
                    // setFinalBillArray(prev => [...prev, item]);
                } else {
                    setEsicAmount(0);
                    setModalTotal(prev => prev - calculatedAmount);
                }
                break;
            }

            case "flexSwitchCheckCoverage": {
                setCheckedCoverage(checked);
                if (!checked) {
                    // Subtract old coverage amount from running total when unchecked
                    setModalTotal(prev => prev - (coverageAmount || 0));
                }
                setCoverageAmount(0);
                break;
            }

            case "flexSwitchCheckOther": {
                setCheckedOther(checked);
                if (!checked) {
                    // Subtract old other amount from running total when unchecked
                    setModalTotal(prev => prev - (otherAmount || 0));
                }
                setOtherAmount(0);
                break;
            }

            default:
                break;
        }
    };
    const calculate = async () => {
        setModalTotal(modalTotal + coverageAmount);
    }

    const remove = async (index) => {


        // Get the amount of the item at the specified index
        const itemToRemove = finalBillArray[index];

        const newArray = finalBillArray.filter((_, idx) => idx !== index);
        const newTotalAmount = newArray.reduce(
            (total, bill) => total + (Number(bill.amount) || 0),
            0
        );
        setFinalBillArray(newArray);
        setTotalAmount(newTotalAmount);
        setAmountToWord(
            newTotalAmount > 0
                ? toWords(newTotalAmount)
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
                : ''
        );
    }

    const addBill = async () => {
        let params = {
            "bill_type": billType,
            "est_epf_id": est_id,
            "est_esic_id": esic_est_id,
            "rate": rate,
            "amount": totalAmount,
            "billData": finalBillArray,
            toMonth: moment(toDate, "YYYY-MM").month() + 1,
            fromMonth: moment(fromDate, "YYYY-MM").month() + 1,
            toYear: moment(toDate, "YYYY-MM").year(),
            fromYear: moment(fromDate, "YYYY-MM").year()
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
                setFinalBillArray([])
                setTotalAmount('')


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
            "bill_type": billType,
            "est_epf_id": est_id,
            "est_esic_id": "",
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
            "paymentMode": paymentMode,
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
    const closeModal = (modalOp) => {
        var modal = document.getElementById(modalOp);
        var bootstrapModal = bootstrap.Modal.getInstance(modal);
        bootstrapModal.hide();
        resetModel()
    };

    const openModal = (modalOp) => {
        var modal = document.getElementById(modalOp);
        var bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
    };
    const resetModel = () => {

        set_paymentMode('Cash')
        set_receivedAmountDate('')
        set_receivedAmount('')
        set_discountOnReceivedAmount('')
        set_gstOnReceived('')
        setCheckedPf(false)
        setCheckedEsic(false)
        setCheckedCoverage(false)
        setCheckedOther(false)
        setpfAmount('')
        setEsicAmount('')
        setOtherAmount('')
        setCoverageAmount('')
        setOtherReason('')


    };

    const resetPage = () => {

        setEstName('');
        setEstId('');
        setESICEstId('')
        setErName('');
        setDOC('');
        setAddress('');
        setBillNumber('');
        set_rate('');
        setFromDate('');
        setToDate('');
        setFinalBillArray([]);
        setTotalAmount(0);
        setAmountToWord('');
        setBillNumberMap('');

    };
    const test =() =>{
        alert(billType)
    }
    // const generatePDF = () => {
    //     // Capture the HTML content as a canvas
    //     html2canvas(document.querySelector("#pdf-content")).then(canvas => {
    //         const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' for page size
    //         const imgData = canvas.toDataURL("image/png");

    //         // Add the image to the PDF
    //         pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
    //         pdf.save("invoice.pdf");
    //     });
    // };

    const generatePDF = () => {
        const input = document.getElementById("pdf-content");

        html2canvas(input, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#fff",
            windowWidth: input.scrollWidth,
            windowHeight: input.scrollHeight
        }).then(canvas => {

            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF("p", "mm", "a4");

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = pageWidth;
            const imgHeight = canvas.height * imgWidth / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

            pdf.save("invoice.pdf");
        });
    };
    const handlePaymentModeChange = (e) => {
        set_paymentMode(e.target.value);
    };

    return (
        <div className="main-container billing-page">
            <div className="main-title">
                <h3>Create Bill</h3>
            </div>

            <section className="section">
                <div className="card-body billing-card">

                    {/* Header */}
                    <div className="billing-page-header">
                        <div>
                            <span className="billing-eyebrow">INVOICE MANAGEMENT</span>
                            <h4>Generate Bill</h4>
                            <p>Create, update and manage employer billing in one place.</p>
                        </div>
                        <div className="billing-status">
                            <span className={`status-dot ${IsUpdate ? 'is-edit' : ''}`}></span>
                            {IsUpdate ? 'Editing existing bill' : 'New bill'}
                        </div>
                    </div>

                    {/* Search / Lookup */}
                    <div className="form-section">

                    {/* Bill Type */}
                    <div className="form-section">
                        <div className="form-section-title">
                            <span className="section-icon"><i className="bi bi-receipt"></i></span>
                            <div>
                                <strong>Bill Type</strong>
                                <small>Billing category selected for this invoice</small>
                            </div>
                        </div>

                        <div className="bill-type-wrapper">
                            <div className="btn-group bill-type-group" role="group">
                                <input type="radio" className="btn-check" name="billType" id="services" value="services" checked={billType === 'services'} disabled />
                                <label className="btn btn-outline-primary" htmlFor="services">
                                    <i className="bi bi-gear me-2"></i>Services
                                </label>

                                <input type="radio" className="btn-check" name="billType" id="consultant" value="consultant" checked={billType === 'consultant'} disabled />
                                <label className="btn btn-outline-primary" htmlFor="consultant">
                                    <i className="bi bi-person-workspace me-2"></i>Consultant
                                </label>
                            </div>
                        </div>
                    </div>

                        <div className="form-section-title">
                            <span className="section-icon"><i className="bi bi-search"></i></span>
                            <div>
                                <strong>Find Employer / Bill</strong>
                                <small>Search by establishment ID or bill number</small>
                            </div>
                        </div>

                        <div className="row align-items-end">
                            <div className="col-12 col-md-6 col-lg-3 mb-3">
                                <label>Establishment ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter establishment ID"
                                    value={est_id}
                                    onChange={(e) => setEstId(e.target.value)}
                                />
                            </div>

                            <div className="col-12 col-md-6 col-lg-3 mb-3">
                                <label>Bill Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter bill number"
                                    value={bill_number_map}
                                    onChange={(e) => setBillNumberMap(e.target.value)}
                                />
                            </div>

                            <div className="col-12 col-md-6 col-lg-3 mb-3">
                                <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                    onClick={() => biller(est_id ? est_id : bill_number_map)}
                                >
                                    <i className="bi bi-search me-2"></i>
                                    Get Details
                                </button>
                            </div>

                            <div className="col-12 col-md-6 col-lg-3 mb-3">
                                <button
                                    type="button"
                                    className="btn btn-outline-primary w-100"
                                    onClick={resetPage}
                                >
                                    <i className="bi bi-arrow-clockwise me-2"></i>
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Employer Details */}
                    <div className="form-section">
                        <div className="form-section-title">
                            <span className="section-icon"><i className="bi bi-building"></i></span>
                            <div>
                                <strong>Employer Details</strong>
                                <small>Basic establishment and contact information</small>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-3 mb-3">
                                <label>Company Name</label>
                                <input type="text" className="form-control" value={est_name} onChange={(e) => setEstName(e.target.value)} />
                            </div>
                            <div className="col-12 col-md-6 col-lg-3 mb-3">
                                <label>Employer Name</label>
                                <input type="text" className="form-control" value={er_name} onChange={(e) => setErName(e.target.value)} />
                            </div>
                            <div className="col-12 col-md-6 col-lg-3 mb-3">
                                <label>Date Of Coverage</label>
                                <input type="text" className="form-control" value={est_doc} onChange={(e) => setDOC(e.target.value)} />
                            </div>
                            <div className="col-12 col-md-6 col-lg-3 mb-3">
                                <label>Address</label>
                                <input type="text" className="form-control" value={est_address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* Billing Period */}
                    <div className="form-section">
                        <div className="form-section-title">
                            <span className="section-icon"><i className="bi bi-calendar3"></i></span>
                            <div>
                                <strong>Billing Period</strong>
                                <small>Select the period for which the bill will be generated</small>
                            </div>
                        </div>

                        <div className="row align-items-end">
                            <div className="col-12 col-md-4 mb-3">
                                <label>From Month</label>
                                <input type="month" className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                            </div>
                            <div className="col-12 col-md-4 mb-3">
                                <label>To Month</label>
                                <input type="month" className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                            </div>
                            <div className="col-12 col-md-4 mb-3">
                                <button type="button" className="btn btn-primary w-100" onClick={() => openModal('billParameterModal')}>
                                    <i className="bi bi-sliders me-2"></i>
                                    Configure Bill
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bill Items */}
                    <div className="bill-items-card">
                        <div className="bill-items-header">
                            <div>
                                <h5>Bill Items</h5>
                                <span>{finalBillArray.length} item{finalBillArray.length === 1 ? '' : 's'} added</span>
                            </div>
                            <button type="button" className="btn btn-outline-primary" onClick={() => openModal('billParameterModal')}>
                                <i className="bi bi-plus-lg me-2"></i>Add Item
                            </button>
                        </div>

                        <div className="table-responsive billing-items-table">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Particular</th>
                                        <th>Rate</th>
                                        <th>Amount</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {finalBillArray.length > 0 ? finalBillArray.map((item, index) => (
                                        <tr key={`${item.perticular}-${index}`}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="particular-cell">
                                                    <span className="item-icon"><i className="bi bi-file-earmark-text"></i></span>
                                                    <span>{item.perticular}</span>
                                                </div>
                                            </td>
                                            <td>₹ {item.rate}</td>
                                            <td><strong>₹ {item.amount}</strong></td>
                                            <td className="text-center">
                                                <button type="button" className="btn btn-sm btn-light danger-action" onClick={() => remove(index)} title="Remove item">
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5">
                                                <div className="empty-bill-state">
                                                    <i className="bi bi-receipt"></i>
                                                    <strong>No bill items added</strong>
                                                    <span>Click “Add Item” or “Configure Bill” to add billing components.</span>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="3" className="text-end">Total Amount</td>
                                        <td><strong className="grand-total">₹ {totalAmount || 0}</strong></td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        {amountToWord && (
                            <div className="amount-words">
                                <span>Amount in words</span>
                                <strong>Rupees {amountToWord} Only</strong>
                            </div>
                        )}
                    </div>

                    {/* Primary Actions */}
                    <div className="billing-action-bar">
                        <div className="billing-action-primary">
                            {!IsUpdate ? (
                                <button type="button" className="btn btn-primary" onClick={addBill}>
                                    <i className="bi bi-check2-circle me-2"></i>Save Bill
                                </button>
                            ) : (
                                <button type="button" className="btn btn-primary" onClick={update}>
                                    <i className="bi bi-pencil-square me-2"></i>Update Bill
                                </button>
                            )}

                            <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#billViewModal" onClick={selectBankdetails}>
                                <i className="bi bi-file-earmark-pdf me-2"></i>Preview PDF
                            </button>
                        </div>

                        <div className="billing-action-secondary">
                            <button type="button" className="btn btn-outline-primary" disabled={!IsUpdate} onClick={() => openModal('receivedModal')}>
                                <i className="bi bi-cash-stack me-2"></i>Received Payment
                            </button>
                        </div>
                    </div>

                    {/* Bill Parameter Modal */}
                    <div className="modal fade" id="billParameterModal" tabIndex="-1" role="dialog" aria-labelledby="billParameterModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                            <div className="modal-content modern-modal">
                                <div className="modal-header">
                                    <div>
                                        <h5 className="modal-title" id="billParameterModalLabel">Configure Bill</h5>
                                        <small>Select billing components and amounts</small>
                                    </div>
                                    <div className="modal-rate-box">
                                        <label>Rate</label>
                                        <input type="number" className="form-control" value={rate} onChange={(e) => set_rate(e.target.value)} />
                                    </div>
                                    <button type="button" className="modal-close-btn" onClick={() => closeModal('billParameterModal')} aria-label="Close">
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>

                                <div className="modal-body">
                                    <div className="bill-parameter-row">
                                        <div className="bill-parameter-label">
                                            <div className="form-check form-switch mb-0">
                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckPf" checked={checkedPf} onChange={handleChange} />
                                            </div>
                                            <span><strong>PF Challan</strong><small>Provident Fund contribution</small></span>
                                        </div>
                                        <input className="form-control bill-parameter-amount" type="text" disabled value={pfAmount} />
                                    </div>

                                    <div className="bill-parameter-row">
                                        <div className="bill-parameter-label">
                                            <div className="form-check form-switch mb-0">
                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckEsic" checked={checkedEsic} onChange={handleChange} />
                                            </div>
                                            <span><strong>ESIC Challan</strong><small>Employee State Insurance</small></span>
                                        </div>
                                        <input className="form-control bill-parameter-amount" type="text" disabled value={esicAmount} />
                                    </div>

                                    <div className="bill-parameter-row">
                                        <div className="bill-parameter-label">
                                            <div className="form-check form-switch mb-0">
                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckCoverage" checked={checkedCoverage} onChange={handleChange} />
                                            </div>
                                            <span><strong>Coverage Amount</strong><small>Registration / coverage charges</small></span>
                                        </div>
                                        <input className="form-control bill-parameter-amount" type="number" disabled={!checkedCoverage} value={coverageAmount} onChange={(e) => setCoverageAmount(e.target.value)} placeholder="₹ 0" />
                                    </div>

                                    <div className="bill-parameter-row">
                                        <div className="bill-parameter-label">
                                            <div className="form-check form-switch mb-0">
                                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckOther" checked={checkedOther} onChange={handleChange} />
                                            </div>
                                            <span><strong>Other Charges</strong><small>Additional billing item</small></span>
                                        </div>
                                        <div className="other-charge-fields">
                                            <input className="form-control" type="text" disabled={!checkedOther} value={otherReason} onChange={(e) => setOtherReason(e.target.value)} placeholder="Description" />
                                            <input className="form-control bill-parameter-amount" type="number" disabled={!checkedOther} value={otherAmount} onChange={(e) => setOtherAmount(e.target.value)} placeholder="₹ 0" />
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <div className="modal-total">Current selection <strong>₹ {modalTotal || 0}</strong></div>
                                    <div>
                                        <button type="button" className="btn btn-secondary me-2" onClick={() => closeModal('billParameterModal')}>Cancel</button>
                                        <button type="button" className="btn btn-primary" onClick={calculation}>
                                            <i className="bi bi-plus-circle me-2"></i>Add to Bill
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PDF Preview Modal */}
                    <div className="modal fade" id="billViewModal" tabIndex="-1" role="dialog" aria-labelledby="billViewModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                            <div className="modal-content pdf-modal">
                                <div className="modal-header">
                                    <div>
                                        <h5 className="modal-title" id="billViewModalLabel">Invoice Preview</h5>
                                        <small>Review the invoice before downloading</small>
                                    </div>
                                    <button type="button" className="modal-close-btn" data-dismiss="modal" aria-label="Close">
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                                <div className="modal-body pdf-preview-body">
                                    <div id="pdf-content" className="invoice-template">
                                        <div className="invoice-header">
                                            <div className="invoice-logo">
                                                <h1>INVOICE</h1>
                                            </div>
                                            <div className="invoice-company">
                                                <h2>{billType === 'services' ? 'Anandam Solution and Services' : 'Anandam Consultancy'}</h2>
                                                <div>101, Anant Apartment</div>
                                                <div>Near Rakshak Bandhu</div>
                                                <div>Manewada Road, Nagpur-440024</div>
                                                <div>0712-2748370</div>
                                                <div>anand.esipf@gmail.com</div>
                                            </div>
                                        </div>

                                        <div className="invoice-meta-row">
                                            <div className="invoice-client">
                                                <span className="invoice-label">BILL TO</span>
                                                <h3>{est_name || 'N/A'}</h3>
                                                <div>{estDesignation}</div>
                                                <div>{est_address}</div>
                                                <div>{estCity}</div>
                                                <div>{estMobile}</div>
                                                <div>{estEmail}</div>
                                            </div>
                                            <div className="invoice-number-box">
                                                <div><span>Invoice No.</span><strong>{bill_number_map || 'N/A'}</strong></div>
                                                <div><span>Date of Issue</span><strong>{date ? moment(date).format('DD-MM-YYYY') : moment().format('DD-MM-YYYY')}</strong></div>
                                                <div><span>Employer ID</span><strong>{est_id || 'N/A'}</strong></div>
                                            </div>
                                        </div>

                                        <table className="table invoice-items-table">
                                            <thead>
                                                <tr><th>#</th><th>Description</th><th>Rate</th><th>Amount</th></tr>
                                            </thead>
                                            <tbody>
                                                {finalBillArray.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.perticular}</td>
                                                        <td>₹ {item.rate}</td>
                                                        <td>₹ {item.amount}</td>
                                                    </tr>
                                                ))}
                                                {finalBillArray.length === 0 && (
                                                    <tr><td colSpan="4" className="text-center">No items added</td></tr>
                                                )}
                                            </tbody>
                                        </table>

                                        <div className="invoice-bottom-grid">
                                            <div className="bank-details-box">
                                                <h4>Bank Details</h4>
                                                <div><span>Bank</span><strong>{bankdetails.bank_name}</strong></div>
                                                <div><span>Branch</span><strong>{bankdetails.branch}</strong></div>
                                                <div><span>Account No.</span><strong>{bankdetails.account}</strong></div>
                                                <div><span>IFSC</span><strong>{bankdetails.ifsc}</strong></div>
                                                <div><span>PAN</span><strong>{bankdetails.pan}</strong></div>
                                            </div>

                                            <div className="invoice-summary-box">
                                                <div><span>Subtotal</span><strong>₹ {totalAmount || 0}</strong></div>
                                                <div><span>Discount</span><strong>₹ 0.00</strong></div>
                                                <div className="invoice-grand-total"><span>Total</span><strong>₹ {totalAmount || 0}</strong></div>
                                                <p>Rupees {amountToWord || 'Zero'} Only</p>
                                            </div>
                                        </div>

                                        <div className="invoice-stamp-row">
                                            <img src={consultancyStamp} alt="Authorized Stamp" />
                                        </div>

                                        <div className="invoice-footer">
                                            <strong>Payment should be made in favor of Anandam Solution And Services</strong>
                                            <span>For business enquiries please contact us at Manewada Road, Nagpur-440024</span>
                                            <span>Thank you for your business!</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={generatePDF}>
                                        <i className="bi bi-download me-2"></i>Download PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Received Payment Modal */}
                    <div className="modal fade" id="receivedModal" tabIndex="-1" role="dialog" aria-labelledby="receivedModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content modern-modal">
                                <div className="modal-header">
                                    <div>
                                        <h5 className="modal-title" id="receivedModalLabel">Received Payment</h5>
                                        <small>Record a payment against this bill</small>
                                    </div>
                                    <button type="button" className="modal-close-btn" onClick={() => closeModal('receivedModal')} aria-label="Close">
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                                <div className="modal-body payment-form">
                                    <div>
                                        <label>Payment Mode</label>
                                        <select className="form-select" value={paymentMode} onChange={handlePaymentModeChange}>
                                            <option value="">Select payment mode</option>
                                            <option value="Cash">Cash</option>
                                            <option value="Online">Online</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label>Received Date</label>
                                        <input type="date" className="form-control" value={receivedAmountDate} onChange={(e) => set_receivedAmountDate(e.target.value)} />
                                    </div>
                                    <div>
                                        <label>Amount Received</label>
                                        <input type="number" className="form-control" value={receivedAmount} onChange={(e) => set_receivedAmount(e.target.value)} placeholder="0.00" />
                                    </div>
                                    <div>
                                        <label>Discount</label>
                                        <input type="number" className="form-control" value={discountOnReceivedAmount} onChange={(e) => set_discountOnReceivedAmount(e.target.value)} placeholder="0.00" />
                                    </div>
                                    <div>
                                        <label>GST Amount</label>
                                        <input type="number" className="form-control" value={gstOnReceived} onChange={(e) => set_gstOnReceived(e.target.value)} placeholder="0.00" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => closeModal('receivedModal')}>Cancel</button>
                                    <button type="button" className="btn btn-primary" onClick={savePaymentReceived}>
                                        <i className="bi bi-check2-circle me-2"></i>Save Payment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bill type selection */}
                {showTypeModal && (
                    <>
                        <div className="modal fade show d-block bill-type-selection-modal" tabIndex="-1" role="dialog" aria-modal="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <div>
                                            <span className="billing-eyebrow">GET STARTED</span>
                                            <h4>Select Bill Type</h4>
                                            <small>Choose the category for this invoice</small>
                                        </div>
                                    </div>
                                    <div className="modal-body">
                                        <button type="button" className={`bill-type-option ${billType === 'consultant' ? 'selected' : ''}`} onClick={() => setBillType('consultant')}>
                                            <span className="type-option-icon"><i className="bi bi-person-workspace"></i></span>
                                            <span><strong>Consultancy</strong><small>Professional consultancy billing</small></span>
                                            <i className="bi bi-chevron-right"></i>
                                        </button>
                                        <button type="button" className={`bill-type-option ${billType === 'services' ? 'selected' : ''}`} onClick={() => setBillType('services')}>
                                            <span className="type-option-icon"><i className="bi bi-gear"></i></span>
                                            <span><strong>Services</strong><small>Service and compliance billing</small></span>
                                            <i className="bi bi-chevron-right"></i>
                                        </button>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary w-100" disabled={!billType} onClick={() => setShowTypeModal(false)}>
                                            Continue <i className="bi bi-arrow-right ms-2"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-backdrop fade show"></div>
                    </>
                )}
            </section>
        </div>
    );

};

export default ecr;


// =======================Old code =================
// import { createBill, getBill, getEmployer, paymentReceived, updateBill } from '../../api/services';
// import { useState, useEffect } from "react"
// import { getEstId } from "../Auth/authToken";
// import moment from 'moment';
// import Swal from 'sweetalert2';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import consultancyStamp from "../../../standalone_assets/images/consultancyStamp.png"

// import "./bill.css"
// import { useParams } from 'react-router-dom';
// import { toWords } from 'number-to-words';


// const ecr = () => {

//     const [bankdetails, setBankDetails] = useState({});
//     const [amountToWord, setAmountToWord] = useState('');
//     const [est_name, setEstName] = useState('');
//     const [est_id, setEstId] = useState('');
//     const [esic_est_id, setESICEstId] = useState('');
//     const [er_name, setErName] = useState('');
//     const [est_doc, setDOC] = useState('');
//     const [est_address, setAddress] = useState('');
//     const [bill_number, setBillNumber] = useState('');
//     const [bill_number_map, setBillNumberMap] = useState('');
//     const [rate, set_rate] = useState('');
//     const [estEmail, setEmail] = useState('')
//     const [estMobile, setMobile] = useState('')
//     const [estDesignation, setDesignation] = useState('')
//     const [estCity, setCity] = useState('')
//     const [date, setDate] = useState('');
//     const [fromDate, setFromDate] = useState('');
//     const [toDate, setToDate] = useState('');

//     const [checkedPf, setCheckedPf] = useState(false);
//     const [checkedEsic, setCheckedEsic] = useState(false);
//     const [checkedCoverage, setCheckedCoverage] = useState(false);
//     const [checkedOther, setCheckedOther] = useState(false);
//     const [pfAmount, setpfAmount] = useState(0);
//     const [esicAmount, setEsicAmount] = useState(0);
//     const [otherAmount, setOtherAmount] = useState(0);
//     const [totalAmount, setTotalAmount] = useState(0);
//     const [coverageAmount, setCoverageAmount] = useState(0);
//     const [finalBillArray, setFinalBillArray] = useState([]);
//     const [otherReason, setOtherReason] = useState('');
//     const [modalTotal, setModalTotal] = useState(0)

//     const [IsUpdate, setIsUpdate] = useState(false);
//     const [showTypeModal, setShowTypeModal] = useState(false);
//     const [billType, setBillType] = useState("");


//     const [receivedAmountDate, set_receivedAmountDate] = useState('')
//     const [receivedAmount, set_receivedAmount] = useState('')
//     const [discountOnReceivedAmount, set_discountOnReceivedAmount] = useState('')
//     const [gstOnReceived, set_gstOnReceived] = useState('')
//     const [paymentMode, set_paymentMode] = useState('')

//     const { id } = useParams();


//     useEffect(() => {
//         if (id) {
//             biller(id)
//         } else if (getEstId()) {
//             setShowTypeModal(true)
//             fetchEmployer(getEstId())

//         }


//     }, [id]);

//     const biller = async (bill_number) => {

//         if (bill_number) {
//             let billno = bill_number
//             resetPage()
//             setBillNumberMap(billno)
//             await getBillById(billno)
//         } else {
//             await fetchEmployer()
//         }
//     }

//     const selectBankdetails = async () => {
//         if (billType == "consultant") {
//             let Bank_details = {
//                 "account": "264102000000449",
//                 "pan": "AARPV4479R",
//                 "office": "Anandam Consultantncy",
//                 "bank_name": "Indian Overseas Bank",
//                 "branch": "Hudkeshwar(Nagpur)",
//                 "ifsc": "IOBA0002641"
//             }
//             setBankDetails(Bank_details)

//         } else {
//             let Bank_details = {
//                 "office": "Anandam Solution & Services",
//                 "account": "264102000000169",
//                 "pan": "AETPV0937Q",
//                 "bank_name": "Indian Overseas Bank",
//                 "branch": "Hudkeshwar(Nagpur)",
//                 "ifsc": "IOBA0002641"
//             }
//             setBankDetails(Bank_details)
//         }
//     }
//     const fetchEmployer = async (est_id) => {
//         resetModel();
//         resetPage();

//         const params = {
//             "est_epf_id": est_id
//         }
//         try {
//             // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
//             const response = await getEmployer(params);

//             if (response.status === true) {
//                 setEstId(response.data.est_epf_id);
//                 setESICEstId(response.data.est_esic_id)
//                 setEstName(response.data.est_name)
//                 setErName(response.data.er_name)
//                 //   setEmail(response.data.er_email_id)
//                 //   setMobile(response.data.er_mobile_number)
//                 setAddress(response.data.est_address)
//                 setDOC(response.data.est_doc)
//                 set_rate(response.data.rate)
//                 setEmail(response.data.er_email_id)
//                 setMobile(response.data.er_mobile_number)
//                 setDesignation(response.data.est_designation)
//                 setCity(response.data.est_city)

//             } else {
//                 Swal.fire({
//                     title: response.message,
//                     icon: 'error',
//                     confirmButtonText: 'Okay'
//                 });
//             }




//         } catch (error) {
//             console.error('Error fetching data:', error);
//             // setError('Error fetching data. Please try again.');

//         }
//     };
//     const getBillById = async (bill_number) => {

//         try {
//             // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
//             const response = await getBill(bill_number);

//             if (response.status === true) {
//                 setBillType(response.data.bill_type);
//                 setEstId(response.data.est_epf_id);
//                 setESICEstId(response.data.est_esic_id)
//                 setEstName(response.data.est_name)
//                 setErName(response.data.er_name)
//                 setEmail(response.data.er_email_id)
//                 setMobile(response.data.er_mobile_number)
//                 setDesignation(response.data.est_designation)
//                 setCity(response.data.est_city)
//                 setAddress(response.data.est_address)
//                 setDate(response.data.date)
//                 setDOC(response.data.est_doc)
//                 set_rate(response.data.rate)
//                 setFinalBillArray(response.data.billData)
//                 setTotalAmount(response.data.amount)
//                 setBillNumberMap(response.data.bill_number_map)
//                 setBillNumber(response.data.id)
//                 setIsUpdate(true)
//                 // toWords(21000) returns "twenty-one thousand"
//                 const words = toWords(response.data.amount);

//                 // Capitalize first letter of each word
//                 const capitalizedWords = words
//                     .split(' ')
//                     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//                     .join(' ');
//                 setAmountToWord(capitalizedWords)


//             } else {
//                 Swal.fire({
//                     title: response.message,
//                     icon: 'error',
//                     confirmButtonText: 'Okay'
//                 });
//             }


//         } catch (error) {
//             console.error('Error fetching data:', error);
//             // setError('Error fetching data. Please try again.');

//         }
//     };
//     const calculation = async () => {
//         try {
//             if (!fromDate || !toDate) {
//                 alert("Please select both From and To dates.");
//                 return;
//             }

//             // 1. Parse Moment objects once
//             const date1 = moment(fromDate, 'YYYY-MM');
//             const date2 = moment(toDate, 'YYYY-MM');

//             // Calculate total months (inclusive)
//             const differenceInMonths = date2.diff(date1, 'months') + 1;

//             // 2. Prepare common date metadata
//             const formattedFrom = date1.format('MM-YYYY');
//             const formattedTo = date2.format('MM-YYYY');
//             const periodText = `For Period ${formattedFrom} To ${formattedTo}`;

//             const dateMeta = {
//                 fromMonth: date1.month() + 1,
//                 toMonth: date2.month() + 1,
//                 fromYear: date1.year(),
//                 toYear: date2.year(),
//                 billNumber: bill_number,
//             };

//             let newItems = [];

//             // 3. Push items conditionally
//             if (checkedPf) {
//                 newItems.push({
//                     ...dateMeta,
//                     perticular: `EPF Challan ${periodText}`,
//                     rate: rate,
//                     amount: rate * differenceInMonths,
//                 });
//             }

//             if (checkedEsic) {
//                 newItems.push({
//                     ...dateMeta,
//                     perticular: `ESIC Challan ${periodText}`,
//                     rate: rate,
//                     amount: rate * differenceInMonths,
//                 });
//             }

//             if (checkedCoverage && coverageAmount > 0) {
//                 newItems.push({
//                     ...dateMeta,
//                     perticular: "EPF Registration Charge",
//                     rate: coverageAmount,
//                     amount: coverageAmount,
//                 });
//             }

//             if (checkedOther && otherAmount > 0) {
//                 newItems.push({
//                     ...dateMeta,
//                     perticular: otherReason,
//                     rate: otherAmount,
//                     amount: otherAmount,
//                 });
//             }

//             // 4. Update state safely
//             setFinalBillArray((prevArray) => {
//                 const updatedArray = [...prevArray, ...newItems];
//                 const newTotalAmount = updatedArray.reduce(
//                     (total, item) => total + (Number(item.amount) || 0),
//                     0
//                 );
//                 setTotalAmount(newTotalAmount);
//                 const words = toWords(newTotalAmount);

//                 // Capitalize first letter of each word
//                 const capitalizedWords = words
//                     .split(' ')
//                     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//                     .join(' ');
//                 setAmountToWord(capitalizedWords)

//                 return updatedArray;
//             });

//             // 5. Cleanup UI
//             resetModel();
//             closeModal('exampleModal');

//         } catch (error) {
//             console.error('Error during bill calculation:', error);
//         }
//     };

//     const handleChange = (event) => {
//         const { id, checked } = event.target;

//         // Parse date range
//         const date1 = moment(fromDate, 'YYYY-MM');
//         const date2 = moment(toDate, 'YYYY-MM');
//         const differenceInMonths = (date1.isValid() && date2.isValid())
//             ? date2.diff(date1, 'months') + 1
//             : 1;

//         const calculatedAmount = rate * differenceInMonths;
//         const periodText = `For Period ${date1.format('MM-YYYY')} To ${date2.format('MM-YYYY')}`;

//         // Common date payload for objects
//         const datePayload = {
//             fromMonth: date1.month() + 1,
//             toMonth: date2.month() + 1,
//             fromYear: date1.year(),
//             toYear: date2.year(),
//             billNumber: bill_number,
//             fromDate,
//             toDate
//         };

//         switch (id) {
//             case "flexSwitchCheckPf": {
//                 setCheckedPf(checked);
//                 if (checked) {
//                     setpfAmount(calculatedAmount);
//                     setModalTotal(prev => prev + calculatedAmount);

//                     const item = {
//                         ...datePayload,
//                         perticular: `EPF Challan ${periodText}`,
//                         rate,
//                         amount: calculatedAmount,
//                     };
//                     // setFinalBillArray(prev => [...prev, item]);
//                 } else {
//                     setpfAmount(0);
//                     setModalTotal(prev => prev - calculatedAmount);
//                 }
//                 break;
//             }

//             case "flexSwitchCheckEsic": {
//                 setCheckedEsic(checked);
//                 if (checked) {
//                     setEsicAmount(calculatedAmount);
//                     setModalTotal(prev => prev + calculatedAmount);

//                     const item = {
//                         ...datePayload,
//                         perticular: `ESIC Challan ${periodText}`,
//                         rate,
//                         amount: calculatedAmount,
//                     };
//                     // setFinalBillArray(prev => [...prev, item]);
//                 } else {
//                     setEsicAmount(0);
//                     setModalTotal(prev => prev - calculatedAmount);
//                 }
//                 break;
//             }

//             case "flexSwitchCheckCoverage": {
//                 setCheckedCoverage(checked);
//                 if (!checked) {
//                     // Subtract old coverage amount from running total when unchecked
//                     setModalTotal(prev => prev - (coverageAmount || 0));
//                 }
//                 setCoverageAmount(0);
//                 break;
//             }

//             case "flexSwitchCheckOther": {
//                 setCheckedOther(checked);
//                 if (!checked) {
//                     // Subtract old other amount from running total when unchecked
//                     setModalTotal(prev => prev - (otherAmount || 0));
//                 }
//                 setOtherAmount(0);
//                 break;
//             }

//             default:
//                 break;
//         }
//     };
//     const calculate = async () => {
//         setModalTotal(modalTotal + coverageAmount);
//     }

//     const remove = async (index) => {


//         // Get the amount of the item at the specified index
//         const itemToRemove = finalBillArray[index];

//         setTotalAmount(totalAmount - itemToRemove);
//         const newArray = finalBillArray.filter((_, idx) => idx !== index);
//         // Update the state with the new array
//         setFinalBillArray([]);
//         setFinalBillArray(prevArray => {
//             const updatedArray = [...prevArray, ...newArray];
//             const newTotalAmount = updatedArray.reduce((total, bill) => parseInt(total) + parseInt(bill.amount), 0);
//             setTotalAmount(newTotalAmount);
//             return updatedArray;
//         });
//     }

//     const addBill = async () => {
//         let params = {
//             "bill_type": billType,
//             "est_epf_id": est_id,
//             "est_esic_id": esic_est_id,
//             "rate": rate,
//             "amount": totalAmount,
//             "billData": finalBillArray,
//             toMonth: moment(toDate, "YYYY-MM").month() + 1,
//             fromMonth: moment(fromDate, "YYYY-MM").month() + 1,
//             toYear: moment(toDate, "YYYY-MM").year(),
//             fromYear: moment(fromDate, "YYYY-MM").year()
//         }
//         try {
//             // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
//             const data = await createBill(params);
//             if (data.status === true) {
//                 Swal.fire({
//                     position: 'top-right',
//                     icon: 'success',
//                     toast: true,
//                     title: data.message,
//                     showConfirmButton: false,
//                     showCloseButton: true,
//                     timer: 1500,
//                 });
//                 setFinalBillArray([])
//                 setTotalAmount('')


//             } else {
//                 Swal.fire({
//                     position: 'top',
//                     icon: 'error',
//                     toast: true,
//                     title: data.message,
//                     showConfirmButton: true,
//                     showCloseButton: true,
//                     timer: 1500,
//                 });
//             }

//         } catch (error) {
//             console.error('Error fetching data:', error);
//             // setError('Error fetching data. Please try again.');
//         }
//     };

//     const update = async () => {
//         let params = {
//             "bill_type": billType,
//             "est_epf_id": est_id,
//             "est_esic_id": "",
//             "rate": rate,
//             "amount": totalAmount,
//             "billData": finalBillArray
//         }

//         try {
//             // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
//             const data = await updateBill(bill_number, params);
//             if (data.status === true) {
//                 Swal.fire({
//                     position: 'top-right',
//                     icon: 'success',
//                     toast: true,
//                     title: data.message,
//                     showConfirmButton: false,
//                     showCloseButton: true,
//                     timer: 1500,
//                 });
//             } else {
//                 Swal.fire({
//                     position: 'top',
//                     icon: 'error',
//                     toast: true,
//                     title: data.message,
//                     showConfirmButton: true,
//                     showCloseButton: true,
//                     timer: 1500,
//                 });
//             }

//         } catch (error) {
//             console.error('Error fetching data:', error);
//             // setError('Error fetching data. Please try again.');
//         }
//     };


//     const savePaymentReceived = async () => {
//         let params = {
//             "bill_id": bill_number,
//             "paymentMode": paymentMode,
//             "date": receivedAmountDate,
//             "perticular": "",
//             "amount": receivedAmount,
//             "gst": gstOnReceived,
//             "discount": discountOnReceivedAmount
//         }
//         try {
//             // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
//             const data = await paymentReceived(params);
//             if (data.status === true) {
//                 Swal.fire({
//                     position: 'top-right',
//                     icon: 'success',
//                     toast: true,
//                     title: data.message,
//                     showConfirmButton: false,
//                     showCloseButton: true,
//                     timer: 1500,
//                 });
//             } else {
//                 Swal.fire({
//                     position: 'top',
//                     icon: 'error',
//                     toast: true,
//                     title: data.message,
//                     showConfirmButton: true,
//                     showCloseButton: true,
//                     timer: 1500,
//                 });
//             }

//         } catch (error) {
//             console.error('Error fetching data:', error);
//             // setError('Error fetching data. Please try again.');
//         }
//     };
//     const closeModal = (modalOp) => {
//         var modal = document.getElementById(modalOp);
//         var bootstrapModal = bootstrap.Modal.getInstance(modal);
//         bootstrapModal.hide();
//         resetModel()
//     };

//     const openModal = (modalOp) => {
//         var modal = document.getElementById(modalOp);
//         var bootstrapModal = new bootstrap.Modal(modal);
//         bootstrapModal.show();
//     };
//     const resetModel = () => {

//         set_paymentMode('Cash')
//         set_receivedAmountDate('')
//         set_receivedAmount('')
//         set_discountOnReceivedAmount('')
//         set_gstOnReceived('')
//         setCheckedPf(false)
//         setCheckedEsic(false)
//         setCheckedCoverage(false)
//         setCheckedOther(false)
//         setpfAmount('')
//         setEsicAmount('')
//         setOtherAmount('')
//         setCoverageAmount('')
//         setOtherReason('')


//     };

//     const resetPage = () => {

//         setEstName('');
//         setEstId('');
//         setESICEstId('')
//         setErName('');
//         setDOC('');
//         setAddress('');
//         setBillNumber('');
//         set_rate('');
//         setFromDate('');
//         setToDate('');
//         setFinalBillArray([]);

//     };
//     // const generatePDF = () => {
//     //     // Capture the HTML content as a canvas
//     //     html2canvas(document.querySelector("#pdf-content")).then(canvas => {
//     //         const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' for page size
//     //         const imgData = canvas.toDataURL("image/png");

//     //         // Add the image to the PDF
//     //         pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
//     //         pdf.save("invoice.pdf");
//     //     });
//     // };

//     const generatePDF = () => {
//         const input = document.getElementById("pdf-content");

//         html2canvas(input, {
//             scale: 2,
//             useCORS: true,
//             backgroundColor: "#fff",
//             windowWidth: input.scrollWidth,
//             windowHeight: input.scrollHeight
//         }).then(canvas => {

//             const imgData = canvas.toDataURL("image/png");

//             const pdf = new jsPDF("p", "mm", "a4");

//             const pageWidth = pdf.internal.pageSize.getWidth();
//             const pageHeight = pdf.internal.pageSize.getHeight();

//             const imgWidth = pageWidth;
//             const imgHeight = canvas.height * imgWidth / canvas.width;

//             pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

//             pdf.save("invoice.pdf");
//         });
//     };
//     const handlePaymentModeChange = (e) => {
//         set_paymentMode(e.target.value);
//     };

//     return (

//         <div className="main-container" style={{ "marginTop": "50px", "fontSize": "15px", "color": "black" }}>
//             <div className='main-title'>
//                 <h3>CREATE BILL</h3>
//             </div>
//             <section className="section">
//                 <div className="row">
//                     <div className="">
//                         <div className="card-body">
//                             <h5 className="card-title text-center"><strong>Generate Bill</strong></h5>
//                             <form>
//                                 <div className="row">
//                                     <div className="col-12 col-md-6 col-lg-3 mb-3">
//                                         <label htmlFor="inputText" >Est Id</label>
//                                         <input type="text" className="form-control rounded-4" onChange={(e) => setEstId(e.target.value)} value={est_id} />
//                                     </div>
//                                     <div className="col-12 col-md-6 col-lg-3 mb-3">
//                                         <label htmlFor="inputText" >Bill Number</label>
//                                         <input type="text" className="form-control rounded-4" onChange={(e) => setBillNumberMap(e.target.value)} value={bill_number_map} />
//                                     </div>
//                                     <div className="col-12 col-md-6 col-lg-3 mb-3">
//                                         <button type="button" className="btn btn-outline-primary rounded-4 w-100" style={{ "margin-top": "20px" }} onClick={() => biller(est_id ? est_id : bill_number_map)}>Get Details</button>
//                                     </div>
//                                     <div className="col-12 col-md-6 col-lg-3 mb-3">
//                                         <button type="button" className="btn btn-outline-primary rounded-4 w-100" style={{ "margin-top": "20px" }} onClick={resetPage}>Reset</button>
//                                     </div>
//                                 </div>
//                             </form>

//                             <div className="row">
//                                 <div className="col-12 col-md-6 col-lg-3 mb-3">
//                                     <label htmlFor="inputText" >Company Name</label>
//                                     <input type="text" className="form-control rounded-4" required onChange={(e) => setEstName(e.target.value)} value={est_name} />
//                                 </div>
//                                 <div className="col-12 col-md-6 col-lg-3 mb-3">
//                                     <label htmlFor="inputText" >Employer Name</label>
//                                     <input type="text" className="form-control rounded-4" required onChange={(e) => setErName(e.target.value)} value={er_name} />
//                                 </div>
//                                 <div className="col-12 col-md-6 col-lg-3 mb-3">
//                                     <label htmlFor="inputText" >Date Of Coverage</label>
//                                     <input type="text" className="form-control rounded-4" required onChange={(e) => setDOC(e.target.value)} value={est_doc} />
//                                 </div>
//                                 <div className="col-12 col-md-6 col-lg-3 mb-3">
//                                     <label htmlFor="inputText" >Address</label>
//                                     <input type="text" className="form-control rounded-4" required onChange={(e) => setAddress(e.target.value)} value={est_address} />
//                                 </div>
//                                 <div className="col-12 col-md-6 col-lg-3 mb-3">
//                                     <label htmlFor="inputText" >From</label>
//                                     <input type="month" className="form-control rounded-4" required onChange={(e) => setFromDate(e.target.value)} value={fromDate} />
//                                 </div>
//                                 <div className="col-12 col-md-6 col-lg-3 mb-3">
//                                     <label htmlFor="inputText" >To</label>
//                                     <input type="month" className="form-control rounded-4" required onChange={(e) => setToDate(e.target.value)} value={toDate} />
//                                 </div>
//                                 <div className="col-12 col-md-6 col-lg-3 mb-3">
//                                     <button type="button" className="btn btn-outline-primary btn-block rounded-4 w-50" style={{ "margin": "22px 5px 10px 10px" }} onClick={() => openModal('exampleModal')}>Next</button>
//                                 </div>
//                                 <div className="col-12 col-md-6 col-lg-3 mb-3">
//                                     <label className="form-label fw-bold d-block mb-2">Bill Type</label>

//                                     <div className="btn-group w-100" role="group">
//                                         <input
//                                             type="radio"
//                                             className="btn-check"
//                                             name="billType"
//                                             id="services"
//                                             value="services"
//                                             checked={billType === "services"}
//                                             onChange={(e) => setBillType(e.target.value)}
//                                             autoComplete="off"
//                                             disabled
//                                         />
//                                         <label
//                                             className="btn btn-outline-primary rounded-start-4"
//                                             htmlFor="services"
//                                         >
//                                             Services
//                                         </label>

//                                         <input
//                                             type="radio"
//                                             className="btn-check"
//                                             name="billType"
//                                             id="consultant"
//                                             value="consultant"
//                                             checked={billType === "consultant"}
//                                             onChange={(e) => setBillType(e.target.value)}
//                                             autoComplete="off"
//                                             disabled
//                                         />
//                                         <label
//                                             className="btn btn-outline-primary rounded-end-4"
//                                             htmlFor="consultant"
//                                         >
//                                             Consultant
//                                         </label>
//                                     </div>
//                                 </div>
//                                 <div className="col-12 col-md-6 col-lg-3 mb-3">
//                                     {!IsUpdate ? (
//                                         <button type="button" className="btn btn-outline-primary btn-block rounded-4 w-45" style={{ "margin": "5px" }} onClick={addBill}>Save</button>
//                                     ) : (
//                                         <button type="button" className="btn btn-outline-primary btn-block rounded-4 w-45" style={{ "margin": "5px" }} onClick={update}>Update</button>
//                                     )}
//                                     <button type="button" className="btn btn-outline-primary btn-block rounded-4 w-45" style={{ "margin": "5px" }} data-toggle="modal" data-target=".bd-example-modal-xl" onClick={selectBankdetails}>Make PDF</button>
//                                 </div>
//                                 <div className="col-12 col-md-6 col-lg-3 mb-3">
//                                     <button type="button" className="btn btn-outline-primary btn-block rounded-4 w-45" style={{ "margin": "5px" }} data-toggle="modal" data-target="#exampleModal">Email PDF</button>
//                                     <button type="button" className="btn btn-outline-primary btn-block rounded-4 w-45" style={{ "margin": "5px" }} data-toggle="modal" data-target="#exampleModal">Print PDF</button>
//                                 </div>
//                                 <div className="col-12 col-md-6 col-lg-3 mb-3">
//                                     <button type="button" className="btn btn-outline-primary btn-block rounded-4 w-50" style={{ "margin": "5px" }} data-toggle="modal" data-target="receivedModal" onClick={() => openModal("receivedModal")} disabled={!IsUpdate}>Received</button>
//                                 </div>
//                             </div>

//                             {/* Model */}
//                             <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                                 <div className="modal-dialog" role="document">
//                                     <div className="modal-content">
//                                         <div className="modal-header">
//                                             <h5 className="modal-title" id="exampleModalLabel">Bill Parameter</h5>
//                                             <div className="col-sm-1">
//                                                 <label htmlFor="inputPassword">Rate</label>

//                                             </div>
//                                             <div className="col-sm-4">
//                                                 <input type="text" className="form-control" onChange={(e) => set_rate(e.target.value)} value={rate} />
//                                             </div>
//                                             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                                                 <span aria-hidden="true">&times;</span>
//                                             </button>
//                                         </div>
//                                         <div className="modal-body">
//                                             <div className='row'>
//                                                 <div className='col-sm'>
//                                                     <div className="form-check form-switch">
//                                                         <input className="form-check-input" type="checkbox" id="flexSwitchCheckPf" checked={checkedPf} onChange={handleChange} />
//                                                         <label className="form-check-label">PF Challan</label>
//                                                     </div>
//                                                 </div><div className='col-md'>
//                                                     <div className="form-check form-switch">
//                                                         {/* <input className="form-control rounded-4" type="text" id="flexSwitchCheckDefault" /> */}
//                                                         <input style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', textAlign: 'right' }} className="form-control rounded-4 float-right" type="text" id="flexSwitchCheckDefault" disabled value={pfAmount} />
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className='row'>
//                                                 <div className='col-sm'>
//                                                     <div className="form-check form-switch">
//                                                         <input className="form-check-input" type="checkbox" id="flexSwitchCheckEsic" checked={checkedEsic} onChange={handleChange} />
//                                                         <label className="form-check-label">ESIC Challan</label>
//                                                     </div>
//                                                 </div><div className='col-md'>
//                                                     <div className="form-check form-switch">
//                                                         {/* <input className="form-control rounded-4" type="text" id="flexSwitchCheckDefault" /> */}
//                                                         {/* <label className="form-check-label float-right">{esicAmount}</label> */}
//                                                         <input style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', textAlign: 'right' }} className="form-control rounded-4 float-right" type="text" id="flexSwitchCheckDefault" disabled value={esicAmount} />
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className='row'>
//                                                 <div className='col-sm'>
//                                                     <div className="form-check form-switch">
//                                                         <input className="form-check-input" type="checkbox" id="flexSwitchCheckCoverage" checked={checkedCoverage} onChange={handleChange} />
//                                                         <label className="form-check-label">Coverage Amount</label>
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-sm-4'>
//                                                     {checkedCoverage ? (
//                                                         <div className="form-check form-switch">
//                                                             <input style={{ outline: 'none', backgroundColor: 'transparent', textAlign: 'right' }} className="form-control rounded-4 float-right" type="number" id="flexSwitchCheckDefault" disabled={!checkedCoverage} onChange={(e) => setCoverageAmount(e.target.value)} value={coverageAmount} />
//                                                         </div>

//                                                     ) : (
//                                                         <div className="form-check form-switch">
//                                                             <input style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', textAlign: 'right' }} className="form-control rounded-4 float-right" type="text" id="flexSwitchCheckDefault" disabled={!checkedCoverage} onChange={(e) => { setCoverageAmount(e.target.value); calculate(); }} value={coverageAmount} />
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                             <div className='row mt-2'>
//                                                 <div className='col-sm-2'>
//                                                     <div className="form-check form-switch">
//                                                         <input className="form-check-input" type="checkbox" id="flexSwitchCheckOther" checked={checkedOther} onChange={handleChange} />
//                                                         <label className="form-check-label">Others</label>
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-sm-6'>
//                                                     {checkedOther && (
//                                                         <div className="form-check form-switch">
//                                                             <input style={{ outline: 'none', backgroundColor: 'transparent', textAlign: 'right' }} className="form-control rounded-4 float-right" type="text" id="flexSwitchCheckDefault" disabled={!checkedOther} onChange={(e) => setOtherReason(e.target.value)} />
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                                 <div className='col-sm-4'>
//                                                     {checkedOther ? (
//                                                         <div className="form-check form-switch">
//                                                             <input style={{ outline: 'none', backgroundColor: 'transparent', textAlign: 'right' }} className="form-control rounded-4" type="number" id="flexSwitchCheckDefault" disabled={!checkedOther} onChange={(e) => { setOtherAmount(e.target.value); }} value={otherAmount} />
//                                                         </div>
//                                                     ) : (
//                                                         <div className="form-check form-switch">
//                                                             <input style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', textAlign: 'right' }} className="form-control rounded-4" type="number" id="flexSwitchCheckDefault" disabled={!checkedOther} onChange={(e) => { setOtherAmount(e.target.value); }} value={otherAmount} />
//                                                         </div>
//                                                     )}

//                                                 </div>
//                                             </div>
//                                             <hr />
//                                             {/* <h5><p className="float-right">Total : {modalTotal}</p></h5> */}
//                                         </div>
//                                         <div className="modal-footer">
//                                             <button type="button" className="btn btn-secondary" onClick={() => closeModal('exampleModal')}>Close</button>
//                                             <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={calculation}>Add</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>


//                             <table className="table table-striped">
//                                 <thead>
//                                     <tr>
//                                         <th scope="col">#</th>
//                                         <th scope="col">Particular</th>
//                                         <th scope="col">Rate</th>
//                                         <th scope="col">Amount</th>
//                                         <th scope="col">Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {finalBillArray.map((employee, index) => (
//                                         <tr key={index}>
//                                             <th scope="row">{index+1}</th>
//                                             <th scope="row">{employee.perticular}</th>
//                                             <td>{employee.rate}</td>
//                                             <td>{employee.amount}</td>
//                                             <td>
//                                                 <div className="d-flex align-items-center">
//                                                     <button className="btn btn-light" onClick={() => remove(index)}>
//                                                         <i className="bi bi-trash text-danger"></i>
//                                                     </button>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                                 <tfoot>
//                                     <tr>
//                                         <th id="total" colSpan="3">Total : </th>
//                                         <td><strong>{totalAmount}</strong></td>
//                                         <td><strong>Rs : {amountToWord} Only</strong></td>
//                                     </tr>
//                                 </tfoot>
//                             </table>
//                             {/* <div className="row">
//                                 <div className="col-sm-2">
//                                     <button type="button" className="btn btn-outline-primary btn-block" style={{ "margin": "2px 5px 10px 10px" }} data-toggle="modal" data-target="#exampleModal">Save</button>
//                                 </div>
//                                 <div className="col-sm-2">
//                                     <button type="button" className="btn btn-outline-primary btn-block" style={{ "margin": "2px 5px 10px 10px" }} data-toggle="modal" data-target="#exampleModal">Make PDF</button>
//                                 </div>
//                                 <div className="col-sm-2">
//                                     <button type="button" className="btn btn-outline-primary btn-block" style={{ "margin": "2px 5px 10px 10px" }} data-toggle="modal" data-target="#exampleModal">Email PDF</button>
//                                 </div>
//                                 <div className="col-sm-2">
//                                     <button type="button" className="btn btn-outline-primary btn-block" style={{ "margin": "2px 5px 10px 10px" }} data-toggle="modal" data-target="#exampleModal">Print PDF</button>
//                                 </div>
//                                 <div className="col-sm-2">
//                                     <button type="button" className="btn btn-outline-primary btn-block" style={{ "margin": "2px 5px 10px 10px" }} data-toggle="modal" data-target="#exampleModal">Received</button>
//                                 </div>
//                             </div> */}

//                             <div className="modal fade bd-example-modal-xl" tabIndex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
//                                 <div className="modal-dialog modal-xl">
//                                     <div className="modal-content">
//                                         <div className="modal-header">
//                                             <h5 className="modal-title" id="exampleModalLabel">Bill View</h5>
//                                             <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                                                 <span aria-hidden="true">&times;</span>
//                                             </button>
//                                         </div>
//                                         <div className="modal-body">
//                                             <div id="pdf-content" className="invoice-template">

//                                                 {/* Header */}
//                                                 <div className="invoice-header d-flex justify-content-between">

//                                                     <div className="invoice-logo">
//                                                         <h1>INVOICE</h1>
//                                                     </div>

//                                                     <div className="text-right">
//                                                         {/* <a href="/auth/dashboard" className="logo d-flex align-items-center">
//                                                      <img className="d-none d-lg-block main_logo ml-4" style={{ width: '100%', "max-height": "250px" }} src={logo} alt="" />
//                                                    </a> */}
//                                                         <h1 className="anandamTitle"><b>{billType == "services" ? "Anandam Solution and Services" : "Anandam Consultancy"}</b></h1>

//                                                         <div><h5>101, Anant Apartment</h5></div>
//                                                         <div><h5>Near Rakshak Bandhu</h5></div>
//                                                         <div><h5>Manewada Road, Nagpur-440024</h5></div>
//                                                         <div><h5>0712-2748370</h5></div>
//                                                         <div><h5>anand.esipf@gmail.com</h5></div>
//                                                     </div>

//                                                 </div>

//                                                 {/* FIRST ROW: Pushed completely to the right side */}
//                                                 <div className="row mt-3 justify-content-end">
//                                                     <div className="col-md-6 text-right">
//                                                         <table className="table table-borderless table-sm">
//                                                             <tbody>
//                                                                 <tr>
//                                                                     <th className="text-left">Invoice No.</th>
//                                                                     <td>{bill_number_map}</td>
//                                                                 </tr>
//                                                                 <tr>
//                                                                     <th className="text-left">Date of Issue</th>
//                                                                     <td>{date ? moment(date).format("DD-MM-YYYY") : "N/A"}</td>
//                                                                 </tr>
//                                                                 <tr>
//                                                                     <th className="text-left">Employer ID</th>
//                                                                     <td>{est_id}</td>
//                                                                 </tr>
//                                                             </tbody>
//                                                         </table>
//                                                     </div>
//                                                 </div>

//                                                 {/* SECOND ROW: Starts cleanly below the first row on the left side */}
//                                                 <div className="row mt-2">
//                                                     <div className="col-md-6 toSection text-left">
//                                                         <h5><b>To</b></h5>
//                                                         <h4><b>{est_name}</b></h4>
//                                                         <h5>{estDesignation}</h5>
//                                                         <h5>{est_address}</h5>
//                                                         <h5>{estCity}</h5>
//                                                         <h5>{estMobile}</h5>
//                                                         <h5>{estEmail}</h5>
//                                                     </div>
//                                                 </div>
//                                                 {/* Item Table */}

//                                                 <table className="table table-bordered mt-3">

//                                                     <thead>

//                                                         <tr>

//                                                             <th width="8%">Item</th>

//                                                             <th>Description</th>

//                                                             <th width="15%">Rate</th>

//                                                             <th width="18%">Amount</th>

//                                                         </tr>

//                                                     </thead>

//                                                     <tbody>

//                                                         {finalBillArray.map((employee, index) => (

//                                                             <tr key={index}>

//                                                                 <td>{index + 1}</td>

//                                                                 <td>{employee.perticular}</td>

//                                                                 <td>₹ {rate}</td>

//                                                                 <td>₹ {employee.amount}</td>

//                                                             </tr>

//                                                         ))}

//                                                         {/* Blank rows */}

//                                                         {[...Array(Math.max(0, 1 - finalBillArray.length))].map((_, i) => (

//                                                             <tr key={i}>

//                                                                 <td>&nbsp;</td>


//                                                             </tr>

//                                                         ))}

//                                                     </tbody>

//                                                 </table>

//                                                 <br />
//                                                 {/* Bottom */}

//                                                 <div className="row mt-4">

//                                                     <div className="col-md-6">

//                                                         <h2>Bank Details</h2>

//                                                         <table className="table table-borderless table-sm">

//                                                             <tbody>

//                                                                 <tr>

//                                                                     <th>Bank</th>

//                                                                     <td>{bankdetails.bank_name}</td>

//                                                                 </tr>

//                                                                 <tr>

//                                                                     <th>Branch</th>

//                                                                     <td>{bankdetails.branch}</td>

//                                                                 </tr>

//                                                                 <tr>

//                                                                     <th>Account No.</th>

//                                                                     <td>{bankdetails.account}</td>

//                                                                 </tr>

//                                                                 <tr>

//                                                                     <th>IFSC</th>

//                                                                     <td>{bankdetails.ifsc}</td>

//                                                                 </tr>

//                                                                 <tr>

//                                                                     <th>PAN</th>

//                                                                     <td>{bankdetails.pan}</td>

//                                                                 </tr>

//                                                             </tbody>

//                                                         </table>
//                                                     </div>

//                                                     <div className="col-md-6">
//                                                         <br></br>
//                                                         <table className="table table-borderless">

//                                                             <tbody>

//                                                                 <tr>

//                                                                     <th>Subtotal</th>

//                                                                     <td className="text-right">
//                                                                         ₹ {totalAmount}
//                                                                     </td>

//                                                                 </tr>

//                                                                 <tr>

//                                                                     <th>Discount</th>

//                                                                     <td className="text-right">
//                                                                         ₹ 0.00
//                                                                     </td>

//                                                                 </tr>

//                                                                 <tr className="invoice-total">

//                                                                     <th>Total</th>

//                                                                     <th className="text-right">
//                                                                         ₹ {totalAmount}
//                                                                     </th>

//                                                                 </tr>
//                                                                 <tr className="invoice-total">
//                                                                     <th></th>
//                                                                     <th className="text-right">Rs. {amountToWord} Only</th>


//                                                                 </tr>

//                                                             </tbody>

//                                                         </table>

//                                                     </div>

//                                                 </div>
//                                                 <br /><br /><br />
//                                                 <div className="row justify-content-end my-3">
//                                                     <div className="col-auto text-right">
//                                                         <img
//                                                             className="main_logo mr-4"
//                                                             style={{ width: '320px', maxHeight: '320px', objectFit: 'contain' }}
//                                                             src={consultancyStamp}
//                                                             alt="Stamp"
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 <br /><br /><br />
//                                                 <div className="invoice-footer">


//                                                     <p><h5>Payment Should make in favor of Anandam Solution And Services</h5></p>
//                                                     <p><h5>For any Busniess enquiry please contact us Manewada Road, Nagpur-440024</h5></p>
//                                                     <p><h5>Thank you for your business!</h5></p>


//                                                 </div>

//                                             </div>
//                                         </div>
//                                         <div className="modal-footer">
//                                             <button className='btn btn-outline-primary btn-block' onClick={generatePDF}>Download PDF</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="modal fade" id="receivedModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                                 <div className="modal-dialog" role="document">
//                                     <div className="modal-content">
//                                         <div className="modal-header">
//                                             <h5 className="modal-title" id="exampleModalLabel">Received Amount</h5>
//                                             <button type="button" className="close" onClick={() => closeModal("receivedModal")} aria-label="Close">
//                                                 <span aria-hidden="true">&times;</span>
//                                             </button>
//                                         </div>
//                                         <div className="modal-body">
//                                             <div className="col-sm mb-2">
//                                                 <label>Payment Mode</label>
//                                                 <select
//                                                     className="form-select rounded-4"
//                                                     aria-label="Default select example" value={paymentMode} onChange={handlePaymentModeChange}
//                                                 >
//                                                     <option value="Cash">Cash</option>
//                                                     <option value="Online">Online</option>
//                                                 </select>

//                                             </div>
//                                             <div className="col-sm">
//                                                 <label htmlFor="inputText" >Received Date</label>
//                                                 <input type="date" className="form-control rounded-4" required onChange={(e) => set_receivedAmountDate(e.target.value)} value={receivedAmountDate} />
//                                             </div>
//                                             <div className="col-sm">
//                                                 <label htmlFor="inputText" >Amount Received</label>
//                                                 <input type="text" className="form-control rounded-4" required onChange={(e) => set_receivedAmount(e.target.value)} value={receivedAmount} />
//                                             </div>
//                                             <div className="col-sm">
//                                                 <label htmlFor="inputText" >Discount</label>
//                                                 <input type="text" className="form-control rounded-4" required onChange={(e) => set_discountOnReceivedAmount(e.target.value)} value={discountOnReceivedAmount} />
//                                             </div>
//                                             <div className="col-sm">
//                                                 <label htmlFor="inputText" >GST Amount</label>
//                                                 <input type="text" className="form-control rounded-4" required onChange={(e) => set_gstOnReceived(e.target.value)} value={gstOnReceived} />
//                                             </div>

//                                         </div>
//                                         <div className="modal-footer">
//                                             <button type="button" className="btn btn-secondary" onClick={() => closeModal("receivedModal")}>Close</button>
//                                             <button type="button" className="btn btn-primary" onClick={savePaymentReceived}>Save changes</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>


//                         </div>
//                     </div>
//                 </div>
//                 {showTypeModal && (
//                     <>
//                         <div className="modal fade show d-block">
//                             <div className="modal-dialog modal-dialog-centered">
//                                 <div className="modal-content">

//                                     <div className="modal-header">
//                                         <h4>Select Bill Type</h4>
//                                     </div>

//                                     <div className="modal-body">

//                                         <div
//                                             className={`card p-3 mb-3 ${billType === "consultancy" ? "border border-primary" : ""}`}
//                                             style={{ cursor: "pointer" }}
//                                             onClick={() => setBillType("consultant")}
//                                         >
//                                             <h5>🏢 Consultancy</h5>
//                                         </div>

//                                         <div
//                                             className={`card p-3 ${billType === "services" ? "border border-primary" : ""}`}
//                                             style={{ cursor: "pointer" }}
//                                             onClick={() => setBillType("services")}
//                                         >
//                                             <h5>🛠 Services</h5>
//                                         </div>

//                                     </div>

//                                     <div className="modal-footer">

//                                         <button
//                                             className="btn btn-primary"
//                                             disabled={!billType}
//                                             onClick={() => setShowTypeModal(false)}
//                                         >
//                                             Continue
//                                         </button>

//                                     </div>

//                                 </div>
//                             </div>
//                         </div>

//                         <div className="modal-backdrop fade show"></div>
//                     </>
//                 )}

//             </section>

//         </div>
//     );
// };

// export default ecr;



