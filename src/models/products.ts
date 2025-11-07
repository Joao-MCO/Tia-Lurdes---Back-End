import mongoose from "mongoose";
import { IObject } from "./base";
import { Measure, Section } from "./enums";

//Cria um rascunho de todos os elementos próprios de Produto
export type IProductRaw = {
    name: string,
    code: string,
    section: Section,
    weight: number,
    measure: Measure,
    imageUrl?: string
}

// Combina a base do Mongo com os demais elementos de Produto
export type IProduct = IObject & IProductRaw;