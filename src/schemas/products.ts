import mongoose, { Schema } from "mongoose";
import { Measure, Section } from "../models/enums";

// Cria o schema de Produto no banco Mongo
const productSchema = new Schema({
    status:{
        createdAt: {type: Date, default: Date.now },
        updatedAt: {type: Date, default: null },
        deletedAt: {type: Date, default: null },
    },
    name: String,
    code: String,
    section: {type: String, enum: Section},
    weight: Number,
    measure: {type: String, enum: Measure},
    imageUrl: {type: String, default: ""}
})

// Cria a model de Produto para consulta no banco Mongo
export const product = mongoose.model('products', productSchema);