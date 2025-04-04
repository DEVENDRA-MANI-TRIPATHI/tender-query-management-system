import { answerFromDocument } from "../utils/gemini.js"


const getanswerFromDocument = async (req, res) => {
    const { documentText, question } = req.body;
    console.log(req.body);
    const answer = await answerFromDocument(documentText, question);
    console.log(answer);
    res.json({ answer });
}

export {
    getanswerFromDocument
}