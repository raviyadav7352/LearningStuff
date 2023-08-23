import React from 'react';
import PdfUploadForm from './PdfUploadForm';
import PdfList from './PdfList';
import DynamicSVG from './DynamicSVG';

const PdfManager = () => {
  return (
    <div>
        <div className="grid grid-col3 grid-md-col2 grid-sm-col1 gap30 sm-gap15">
            <PdfUploadForm></PdfUploadForm>
            <PdfList></PdfList>
        </div>
    </div>
  );
};

export default PdfManager;
