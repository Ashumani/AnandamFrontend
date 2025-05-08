import React, { useState, useRef } from 'react';
import mammoth from 'mammoth';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const Download = () => {
    const [sideItems] = useState([
        { mainItem: "Form 19", icon: "bi bi-journal-text" },
        { mainItem: "Form 13", icon: "bi bi-journal-text" },
        { mainItem: "Form 31", icon: "bi bi-journal-text" },
        { mainItem: "Form 10 D", icon: "bi bi-journal-text" },
        // Add more items as needed...
    ]);

    const [file, setFile] = useState(null);
    const [htmlContent, setHtmlContent] = useState('');
    const htmlRef = useRef();
    const [currentItems] = useState([
        {
            "catagory":"EPF",
            "page":"Registration",
            "subPage":"employer",
            "message":"import functionality",
            "test":"import tested",
            "status":"Done",
            "date":"12-12-2025",

        },
        {
            "catagory":"EPF",
            "page":"Registration",
            "subPage":"employee",
            "message":"import functionality",
            "test":"import tested",
            "status":"Done",
            "date":"12-12-2025",

        }
        
    ])
      

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            setFile(selectedFile);
        } else {
            alert('Please upload a valid Word document (.docx).');
        }
    };

    const handleConvertClick = async () => {
        if (!file) {
            alert('Please upload a Word document first.');
            return;
        }

        const arrayBuffer = await file.arrayBuffer();
        const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
        setHtmlContent(html);
        renderPDF(html);
    };

    const renderPDF = async (html) => {
        const pdf = new jsPDF();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        document.body.appendChild(tempDiv);

        const canvas = await html2canvas(tempDiv);
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 10, 10);
        pdf.save('converted.pdf');

        document.body.removeChild(tempDiv); // Cleanup
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
                                <h5 className="card-title text-center">Download</h5>
                                <div className="row">
                                    {sideItems.map((item, index) => (
                                        <div className="col-sm-2" key={index}>
                                            <button type="button" className="btn btn-outline-primary btn-block" style={{ margin: "2px 5px 10px 10px" }}>
                                                {item.mainItem}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="row">
                    <h1>Word to PDF Converter</h1>
                    <div className="col-sm-4">
                        <input className="form-control" type="file" accept=".docx" onChange={handleFileChange} />
                    </div>
                    <div className="col-sm-4">
                        <button type="button" className="btn btn-primary" onClick={handleConvertClick} disabled={!file}>
                            Convert to PDF
                        </button>
                    </div>
                </div> */}
                {/* <div style={{"color": "black"}}>
                <div className='main-title mt-4'>
                    <h3>To Do and CHecklist</h3>
                </div>
                <div>
                    <h6>Registration</h6>
                    <p>Employer -- import</p>
                    <p>Employee</p>
                </div>
                <div>
                    <h6>Salary</h6>
                    <p>Dynamic Form Creation for Salary Sheet</p>
                </div>
                <div >
                    <h6>Esic</h6>
                    <p>Esic restriction on 21000</p>
                    <ul>
                        <li>Salary below 21000 is exempt</li>
                        <li>Contribution based on salary</li>
                        <li>Employee and employer contribution structure</li>
                    </ul>
                </div>
                <div >
                    <h6>User</h6>
                    <p>User Remov and Update</p>
                    <ul>
                        <li>when USer remove -- all data should be remove</li>
                        <li>Contribution based on salary</li>
                        <li>Employee and employer contribution structure</li>
                    </ul>
                </div>
                </div> */}

                  <div className="table-responsive mt-2">
                            <table className="table table-striped table-sm table-hover text-center">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Catgory</th>
                                  <th>Page</th>
                                  <th>Sub-Page</th>
                                  <th>message</th>
                                  <th>test</th>
                                  <th>Date</th>
                                  <th>status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentItems.map((blog, index) => (
                                  <tr key={blog.id}>
                                    <th >{index + 1}</th>
                                    <td>{blog.catagory}</td>
                                    <td>{blog.page}</td>
                                    <td>{blog.subPage}</td>
                                    <td>{blog.message}</td>
                                    <td>{blog.test}</td>
                                    <td>{blog.date}</td>
                                    <td>{blog.status}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

            </section>


        </div>
    );
};

export default Download;
