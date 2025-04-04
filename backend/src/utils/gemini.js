import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const answerFromDocument = async (documentText, question) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a helpful assistant. Based solely on the content of the provided document,
      answer the user's question as accurately as possible.

      If the answer is not explicitly stated in the document, respond with:
      "The information is not available in the document."

      ### Document:
      ${documentText}

      ### Question:
      ${question}

      Provide a clear and concise answer below:
    `;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();
    responseText = responseText.replace(/```[\s\S]*?```/g, "").trim();

    return { answer: responseText };
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    return { error: "Error answering your question." };
  }
};
