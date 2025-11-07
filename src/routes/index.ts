import express from "express";
import { productRouter } from "./products";

export const router = express.Router();

//Definição da rota: /products
router.use("/products", productRouter);