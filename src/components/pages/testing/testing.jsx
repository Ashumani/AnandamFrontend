import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const testing = () => {
  const [pdfData, setPdfData] = useState({
    title: 'Sample PDF',
    text: 'This is a sample PDF generated using React.',
  });

  const generatePdf = async () => {
    try {
      // Create a new jsPDF instance
      const pdf = new jsPDF();

      // Add the title to the PDF
      pdf.setFontSize(24);
      pdf.text(pdfData.title, 10, 10);

      // Add the text to the PDF
      pdf.setFontSize(14);
      pdf.text(pdfData.text, 10, 20);

      // Save the PDF
      pdf.save('sample.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div>
      <h1>{pdfData.title}</h1>
      <p>{pdfData.text}</p>
      <button onClick={generatePdf}>Generate PDF</button>
    </div>
  );
};

export default testing;