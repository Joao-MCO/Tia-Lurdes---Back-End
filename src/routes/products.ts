import express from "express";
import { productsController } from "../controllers/products";


export const productRouter = express.Router();

//Lista todos os produtos
productRouter.get("/", productsController.list);

//Lista o produto de código :code
productRouter.get("/:code", productsController.index);

//Cria um produto novo
productRouter.post("/", productsController.create);

//Edita um produto
productRouter.put("/", productsController.update);

//Deleta um produto
productRouter.delete("/", productsController.delete);

//Ativa um produto
productRouter.put("/activate", productsController.activate);