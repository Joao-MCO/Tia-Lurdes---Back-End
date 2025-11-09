import express from "express";
import { productRouter } from "./products";
import { contactRouter } from "./contact";

export const router = express.Router();

//Definição da rota: /products
router.use("/products", productRouter);
router.use("/contact", contactRouter);