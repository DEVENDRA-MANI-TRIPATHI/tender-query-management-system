import { useEffect, useRef, useState } from "react";
import ReactMarkdown from 'react-markdown';


const ChatBox = ({ onSend,disabled }) => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setisTyping] = useState(false);
  const bottomRef = useRef(null)
  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])

  const handleSend = async () => {
    if (!question.trim()) return;

    setMessages((prev) => [
      ...prev,
      { type: "question", text: question },
      { type: "loading" }
    ]);
    setQuestion("");

    const answer = await onSend(question);
    if (answer) {
      setisTyping(true)
      setMessages((prev) => [...prev.slice(0,-1), { type: "answer", text: "" }]);
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
    <div className="w-full mt-4 flex flex-col h-[500px] max-h-[70vh] border border-gray-700 rounded-lg overflow-hidden shadow-sm">
      <div className="flex-grow rounded-lg overflow-y-auto p-4 space-y-4 bg-gray-800 flex flex-col thin-scrollbar">
        {messages.map((msg, idx) => {
          if (msg.type === "loading") {
            return (
              <div
                key={idx}
                className="p-3 rounded-lg inline-block max-w-[75%] mr-auto bg-blue-600/20 text-left"
              >
                <div className="flex space-x-1">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            );
          }
          return (
            <div
              key={idx}
              className={`p-3 rounded-lg inline-block max-w-[75%] break-words ${msg.type === "question"
                ? "ml-auto bg-blue-700 text-right"
                : "mr-auto bg-gray-700 text-left"
                }`}
            >
              <ReactMarkdown
                components={{
                  p: ({ children }) => (
                    <p className="text-base text-gray-200 leading-relaxed font-medium whitespace-pre-wrap">
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-white">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-gray-300">{children}</em>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-5 text-gray-200">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li className="mb-1">{children}</li>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-700 text-blue-300 px-1 py-0.5 rounded text-sm">{children}</code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-gray-800 p-2 rounded overflow-x-auto text-sm text-blue-200">{children}</pre>
                  ),
                  a: ({ href, children }) => (
                    <a href={href} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                }}
              >
                {msg.text}
              </ReactMarkdown>


            </div>);
        })}
        {isTyping && (
          <div className="p-3 rounded-lg inline-block bg-blue-600/30 text-left mr-auto max-w-[75%] animate-pulse">
            <p className="text-sm text-blue-300 italic tracking-wide">Typing...</p>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>
      <div className="p-3 border-t flex gap-2 bg-gray-800 text-gray-500">
        <input
          type="text"
          placeholder="Ask a question about the document..."
          className="flex-grow p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={disabled}
        />
        <button
          onClick={handleSend}
          disabled={disabled}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
