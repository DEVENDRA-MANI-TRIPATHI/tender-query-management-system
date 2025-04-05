import React from 'react';

const PdfPreview = ({ pdfURL }) => {
  if (!pdfURL) return (
    <div className="h-full flex items-center justify-center text-gray-400">
      No PDF selected for preview. Please upload a document in PDF format so I can assist you.
    </div>
  );

  return (
    <div className="h-full rounded-lg overflow-hidden border border-gray-700 bg-gray-900 shadow-inner">
      <h2 className="text-gray-200 text-lg font-semibold mb-2 px-2 pt-2">
        PDF Preview
      </h2>
      <iframe
        src={pdfURL}
        className="w-full h-[calc(100%-2.5rem)] rounded-b-lg"
        title="PDF Preview"
        frameBorder="0"
      />
    </div>
  );
};

export default PdfPreview;
