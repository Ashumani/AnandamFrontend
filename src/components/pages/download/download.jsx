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

                <div className="row">
                    <h1>Word to PDF Converter</h1>
                    <div className="col-sm-4">
                        <input className="form-control" type="file" accept=".docx" onChange={handleFileChange} />
                    </div>
                    <div className="col-sm-4">
                        <button type="button" className="btn btn-primary" onClick={handleConvertClick} disabled={!file}>
                            Convert to PDF
                        </button>
                    </div>
                </div>
                
            </section>
        </div>
    );
};

export default Download;
