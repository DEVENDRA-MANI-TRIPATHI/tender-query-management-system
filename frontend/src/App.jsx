import { useState } from "react";
import PdfUploader from "./components/PdfUploader";
import ChatBox from "./components/Chatbox";
import PdfPreview from "./components/PdfPreview"

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [pdfText, setPdfText] = useState("");
  const [pdfURL, setPdfURL] = useState(null);

  const handleTextExtracted = (text, file) => {
    setPdfText(text);
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setPdfURL(blobUrl);
    } else {
      setPdfURL(null);
    }
  };

  const handleSendQuestion = async (question) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/document/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, documentText: pdfText }),
      });

      const data = await response.json();
      return data.answer.answer;
    } catch (err) {
      console.error("API error:", err);
      return "Error fetching answer from the server.";
    }
  };

  return (
    <div className="px-4 py-6 sm:px-8 bg-gray-900 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center drop-shadow-md mb-6">Document Query management System</h1>
      <div className="flex flex-col md:flex-row gap-6 w-full">
        <div className="flex-1 flex flex-col gap-6 bg-gray-800/50 backdrop-blur-md p-6 rounded-xl border border-gray-700 shadow-lg">
          <PdfUploader onTextExtracted={handleTextExtracted} />
          <ChatBox onSend={handleSendQuestion} disabled={!pdfURL}/>
        </div>
        <div className="hidden md:block w-full md:w-1/2">
          <PdfPreview pdfURL={pdfURL} />
        </div>
      </div>
    </div>
  );
};

export default App;
