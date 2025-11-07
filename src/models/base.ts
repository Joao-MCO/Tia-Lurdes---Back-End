import mongoose from "mongoose";

// Cria a base do objeto do MongoDB
export type IObject = {
    _id?: mongoose.Types.ObjectId,
    status?:{
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date
    }
}