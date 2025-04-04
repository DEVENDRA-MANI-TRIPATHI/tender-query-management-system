import { useEffect, useRef, useState } from "react";

const ChatBox = ({ onSend }) => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setisTyping] = useState(false);
  const bottomRef = useRef(null)
  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])

  const handleSend = async () => {
    if (!question.trim()) return;

    setMessages((prev) => [...prev, { type: "question", text: question }]);
    setQuestion("");

    const answer = await onSend(question);
    if (answer) {
      setisTyping(true)
      setMessages((prev) => [...prev, { type: "answer", text: "" }]);
      let displayText = "";
      const typingSpeed = 20;

      for (let i = 0; i < answer.length; i++) {
        displayText += answer[i];
        await new Promise((resolve) => setTimeout(resolve, typingSpeed));
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { type: "answer", text: displayText },
        ]);
      
      }
      setisTyping(false);
    }
  };

  return (
    <div className="w-full mt-4 flex flex-col h-[500px] border rounded-lg shadow-sm">
      <div className="flex-grow rounded-lg overflow-y-auto p-4 space-y-4 bg-gray-800 flex flex-col">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg inline-block max-w-[75%] break-words ${
              msg.type === "question"
                ? "ml-auto bg-gray-700 text-right"
                : "mr-auto bg-gray-700 text-left"
            }`}
          >
            <p className="text-sm text-gray-300 whitespace-pre-wrap">{msg.text}</p>
          </div>
        ))}
        {isTyping && (
          <div className="p-3 rounded-lg inline-block bg-gray-700 text-left mr-auto max-w-[75%] animate-pulse">
            <p className="text-sm text-gray-300">Typing...</p>
          </div>)}
        <div ref={bottomRef}/>
      </div>
      <div className="p-3 border-t flex gap-2 bg-gray-800 text-gray-500">
        <input
          type="text"
          placeholder="Ask a question about the document..."
          className="flex-grow p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
