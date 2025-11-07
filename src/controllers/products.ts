import { NextFunction, Request, Response } from "express";
import { product } from "../schemas/products";
import { IProduct } from "../models/products";
import { newSession } from "../services/mongo";

export const productsController = {
    async list(req:Request, res:Response, next:NextFunction) {
        const db = await newSession();
        try{
            const products = await product.find();
            const response = {
                size: products.length,
                items: products
            };
            return res.status(200).json(response);
        } catch(error){
            console.error("ERRO AO LISTAR PRODUTOS: ", error);
            return next(error);
        } finally {
            await db?.disconnect();
        }
    },
    
    async index(req:Request, res:Response, next:NextFunction) {
        const db = await newSession();
        const code = req.params.code;
        try{
            const products = await product.find({code: code});
            const response = {
                size: products.length,
                items: products
            };
            return res.status(200).json(response);
        }catch(error){
            console.error(`ERRO AO LISTAR PRODUTO ${code}: `, error);
            return next(error);
        }finally {
            await db?.disconnect();
        }
    },
    
    async create(req:Request, res:Response, next:NextFunction) {
        const db = await newSession();
        try{
            const {name, code, imageUrl, section, measure, weight} = req.body;
            const productBase:IProduct = {
                name,
                code,
                imageUrl,
                section,
                measure,
                weight
            };
            const response = await product.create(productBase);
            return res.status(201).json(response);
        }catch(error){
            console.error("ERRO AO CRIAR PRODUTO: ", error)
            return next(error);
        }finally {
            await db?.disconnect();
        }
    },

    async update(req:Request, res:Response, next:NextFunction) {
        const db = await newSession();
        const id = req.headers.id;
        try{
            const updateBody: Partial<IProduct> = {};
            for (const key of Object.keys(req.body) as Array<keyof IProduct>) {
                const value = (req.body as any)[key];
                if (value !== '') {
                    updateBody[key] = value;
                }
            }
            await product.findByIdAndUpdate(id, {$set: updateBody}, {new: true});
            const response =  await product.findById(id);
            return res.status(200).json(response);
        }catch(error){
            console.error(`ERRO AO EDITAR PRODUTO ${id}: `, error)
            return next(error);
        }finally {
            await db?.disconnect();
        }
    },

    async delete(req:Request, res:Response, next:NextFunction) {
        const db = await newSession();
        const id = req.headers.id;
        try{
            await product.findByIdAndUpdate(id, {$set: {status: {deletedAt: new Date()}}}, {new: true});
            return res.status(200).send("Produto deletado com sucesso!");
        }catch(error){
            console.error(`ERRO AO DELETAR PRODUTO ${id}: `, error)
            return next(error);
        }finally {
            await db?.disconnect();
        }
    },

    async activate(req:Request, res:Response, next:NextFunction) {
        const db = await newSession();
        const id = req.headers.id;
        try{
            await product.findByIdAndUpdate(id, {$set: {status: {deletedAt: null}}}, {new: true});
            return res.status(200).send("Produto ativado com sucesso!");
        }catch(error){
            console.error(`ERRO AO ATIVAR PRODUTO ${id}: `, error)
            return next(error);
        }finally {
            await db?.disconnect();
        }
    }
}
