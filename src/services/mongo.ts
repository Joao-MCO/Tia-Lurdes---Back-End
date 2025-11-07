import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

// Inicia uma sessão com o banco do Mongo
export async function newSession() {
    try{
        const url = process.env.MONGO_URL || "";
        const collection = process.env.COLLECTION_NAME || "";
        const session = await mongoose.connect(`${url}/${collection}`);
        return session;
    } catch(error){
        console.error("ERRO AO CONECTAR AO BANCO: ", error);
    }
}