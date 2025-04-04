import { useState } from "react";
import PdfUploader from "./components/PdfUploader";
import ChatBox from "./components/Chatbox";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [pdfText, setPdfText] = useState("");

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
    <div className="p-4 bg-gray-900 min-h-screen flex flex-col items-center pt-1">
      <h1 className="text-2xl text-center font-semibold text-blue-400 ">Document Query management System</h1>
      <div className="w-full max-w-3xl flex flex-col items-center gap-6 pt-3">
        <PdfUploader onTextExtracted={setPdfText} />
        <ChatBox onSend={handleSendQuestion} />
      </div> 
    </div>
  );
};

export default App;
