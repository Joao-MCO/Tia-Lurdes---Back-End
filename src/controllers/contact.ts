import { NextFunction,Request, Response } from "express";
import { newSession } from "../services/mongo";
import { emailService } from "../services/mail";

export const contactController = {
    async sendMessage(req:Request, res:Response, next:NextFunction) {
        try{
            console.log("REQUISIÇÃO DE CONTATO: ", req.body);
            const {name, email, document, phone, type, message, docType} = req.body;
            const messageBody = `Nome: ${name}
                Email: ${email}
                Pessoa Física/Jurídica: ${docType}
                Documento: ${document}
                Telefone: ${phone}
                Tipo de Contato: ${type}
                Mensagem: ${message || "N/A"}`;
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_DESTINY,
                subject: `Novo contato - Nome: ${name}`,
                text: messageBody,
            };
            
            await emailService.sendMail(mailOptions);
            return res.status(200).json({message: "Mensagem enviada com sucesso!"});

        }catch(error: any){
            console.error("ERRO AO ENVIAR EMAIL DE CONTATO: ", error);
            // Send a more specific error message to the client
            const errorMessage = error.code === 'ECONNECTION' 
                ? "Não foi possível conectar ao servidor de email"
                : "Erro ao enviar email de contato";
            return res.status(500).json({ 
                error: errorMessage,
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
}