import { useState } from 'react'
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import pdfWorker from "pdfjs-dist/legacy/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const PdfUploader = ({ onTextExtracted }) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setFileName(file.name);
      extractTextFromPDF(file, onTextExtracted);
    } else {
      setFileName("");
      onTextExtracted("");
    }
  };

  const extractTextFromPDF = async (file, onTextExtracted) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async function () {
        try {
          const typedArray = new Uint8Array(reader.result);
          const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
          let extractedText = "";

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item) => item.str.trim()).join(" ");
            extractedText += pageText + "\n\n";
          }

          console.log("Extracted Text:", extractedText);
          onTextExtracted(extractedText);
          resolve(extractedText);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-800 border border-gray-700 rounded-lg">
      <label className="cursor-pointer text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium shadow-md">
        Upload PDF
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      {fileName && (
        <span className="text-sm text-gray-300 truncate max-w-xs">{fileName}</span>
      )}
    </div>
  );
};

export default PdfUploader;
