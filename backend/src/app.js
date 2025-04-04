import express from "express"
import cors from "cors";


const app = express();

app.use(cors());
app.use(express.json());

import documentRouter from "./routes/document.routes.js"


app.use("/api/v1/document", documentRouter);

export default app;