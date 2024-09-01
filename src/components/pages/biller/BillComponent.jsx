// BillComponent.js
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import "./bill.css"

const BillComponent = () => {
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

    return (
        <div>
            <div className='container'>
                <div className="main-container">
                    <div className='main-title'>
                        <h3>Billing</h3>
                    </div>
                    <section className="section text-black">
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
                                                <td>143</td>
                                            </tr>
                                            <tr>
                                                <th>Invoice Date</th>
                                                <td>10-Aug-24</td>
                                            </tr>
                                            <tr>
                                                <th>Employer ID</th>
                                                <td>NGNAG69970</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm'>
                                    <h5 className='text-head'>To</h5>
                                    <p><strong>Shree Manpower Service</strong></p>
                                    <p><strong>Partner</strong></p>
                                    <p><strong>Narendra Nagar</strong></p>
                                    <p><strong>ShrNagpur</strong></p>
                                    <p><strong>8793143976</strong></p>
                                    <p><strong>manishkirnapure9@gmail.com</strong></p>
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
                                        <tr>
                                            <td>1</td>
                                            <td>Preparation of Monthly PF Challan From Jul 2024 To Jul 2024</td>
                                            <td>Rs. 1,000.00</td>
                                            <td>Rs. 1,000.00</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Preparation of Monthly ESIC Challan From Jul 2024 To Jul 2024</td>
                                            <td>Rs. 500.00</td>
                                            <td>Rs. 500.00</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3">Total</td>
                                            <td>Rs. 1,500.00</td>
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
                    </section>
                    <button className='btn btn-outline-primary btn-block' onClick={generatePDF}>Download PDF</button>
                </div>
            </div>
        </div>
    );
};

export default BillComponent;
