import { Router } from "express";
import {getanswerFromDocument } from "../controller/query.controller.js";


const router = Router();


router.route("/analyze").post(getanswerFromDocument)

export default router;