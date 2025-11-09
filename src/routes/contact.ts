import express from "express";
import { contactController } from "../controllers/contact";

export const contactRouter = express.Router();

//Dispara o email de contato
contactRouter.post("/", contactController.sendMessage);