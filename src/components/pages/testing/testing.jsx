import React, { useState } from 'react';
import { Document, Packer, Paragraph } from 'docx';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/build/pdf';

// Set the workerSrc property to the correct version
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.js`;

const Download = () => {
    const [pdfFile, setPdfFile] = useState(null);

    const handlePdfFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setPdfFile(selectedFile);
        } else {
            alert('Please upload a valid PDF document (.pdf).');
        }
    };

    const handleConvertToWord = async () => {
        if (!pdfFile) {
            alert('Please upload a PDF document first.');
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = async (e) => {
            const typedarray = new Uint8Array(e.target.result);
            const pdfDoc = await getDocument(typedarray).promise;
            const textContent = [];

            for (let i = 1; i <= pdfDoc.numPages; i++) {
                const page = await pdfDoc.getPage(i);
                const text = await page.getTextContent();
                const textItems = text.items.map(item => item.str);
                textContent.push(textItems.join(' '));
            }

            // Create a new Word document
            const doc = new Document({
                sections: [
                    {
                        properties: {},
                        children: textContent.map(text => new Paragraph(text)),
                    },
                ],
            });

            // Generate and download the Word document
            Packer.toBlob(doc).then((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'converted.docx');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            });
        };

        fileReader.readAsArrayBuffer(pdfFile);
    };

    return (
        <div className="main-container">
            <div className='main-title'>
                <h3>PDF to Word Converter</h3>
            </div>
            <section className="section">
                <div className="row">
                    <h1>Upload PDF</h1>
                    <div className="col-sm-4">
                        <input className="form-control" type="file" accept=".pdf" onChange={handlePdfFileChange} />
                    </div>
                    <div className="col-sm-4">
                        <button type="button" className="btn btn-primary" onClick={handleConvertToWord} disabled={!pdfFile}>
                            Convert to Word
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Download;
