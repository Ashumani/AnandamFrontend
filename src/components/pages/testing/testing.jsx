import React, { useState } from 'react';
import { Document, Packer, Paragraph } from 'docx';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/build/pdf';

// Set the workerSrc property to the correct version
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.js`;

const Download = () => {
    const [showModal, setShowModal] = useState(true);

    const handleModalClose = () => {
        console.log('Modal closed!');
      };
  const handleCloseModal = () => {
    setShowModal(false);
    handleModalClose();
  };

  return (
    <div
      className={`modal fade ${showModal ? 'show' : ''}`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="myModalLabel">
              Modal
            </h4>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={handleCloseModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body"><h1>Hello</h1></div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
