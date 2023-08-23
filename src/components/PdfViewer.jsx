import React, { useState, useEffect } from 'react';
import './PdfViewer.css';

const PdfViewer = ({ pdfUrl, isOpen, onClose }) => {
  const [isPdfOpen, setIsPdfOpen] = useState(isOpen);
console.log(pdfUrl)
  useEffect(() => {
    setIsPdfOpen(isOpen);
  }, [isOpen]);

  const handleClosePdf = () => {
    setIsPdfOpen(false);
  };

  return (
    <div className={`${isPdfOpen ? 'pdf-viewer' : ''}`}>
      {isPdfOpen && (
        <div>
          <button className="u-btn pdf-close-btn" onClick={onClose}>
            Close PDF
          </button>
          <embed src={pdfUrl} width="100%" height="700" type="application/pdf" />
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
