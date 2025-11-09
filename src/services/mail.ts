import nodemailer from "nodemailer";

class EmailService {
    private transporter!: nodemailer.Transporter;
    private static instance: EmailService;

    private constructor() {
        this.initializeTransporter();
    }

    private initializeTransporter() {
        if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error("Email configuration missing. Please check your .env file.");
            return;
        }

        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                ciphers: 'SSLv3',
                rejectUnauthorized: false
            }
        });
    }

    public static getInstance(): EmailService {
        if (!EmailService.instance) {
            EmailService.instance = new EmailService();
        }
        return EmailService.instance;
    }

    public async verifyConnection(): Promise<boolean> {
        if (!this.transporter) {
            console.error("Email transporter not initialized");
            return false;
        }

        try {
            await this.transporter.verify();
            console.log("SMTP Connection verified successfully");
            return true;
        } catch (error) {
            console.error("SMTP Connection Error:", error);
            return false;
        }
    }

    public async sendMail(options: nodemailer.SendMailOptions): Promise<any> {
        if (!this.transporter) {
            console.error("Transporter not initialized. Creating new one...");
            this.initializeTransporter();
        }

        try {
            console.log("Attempting to verify connection...");
            console.log("Using configuration:", {
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                user: process.env.EMAIL_USER,
                auth: true
            });

            const verified = await this.verifyConnection();
            if (!verified) {
                throw new Error("Failed to verify SMTP connection");
            }

            console.log("Connection verified, attempting to send email...");
            const info = await this.transporter.sendMail(options);
            console.log("Email sent successfully:", info.messageId);
            return info;
        } catch (error) {
            console.error("Detailed error information:", error);
            if (error instanceof Error) {
                console.error("Error name:", error.name);
                console.error("Error message:", error.message);
                console.error("Error stack:", error.stack);
            }
            throw error;
        }
    }
}

export const emailService = EmailService.getInstance();