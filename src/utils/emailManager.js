import nodemailer from "nodemailer";

class emailManager {

    constructor() {
        this.transport = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_KEY,
            }
        });
    }

    async sendMail(params) {

        const mail = {
            from: process.env.SMTP_EMAIL,
            to: params.to,
            subject: `Ticket de compra ${params.code}`,
            html: `<div><h1>Prueba</h1></div>`,
            attachments: [],
        }

        return await this.transport.sendMail(mail)
    }
}

export default emailManager