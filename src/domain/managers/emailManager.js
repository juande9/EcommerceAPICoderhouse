import nodemailer from "nodemailer";
import { compileEmailTemplate } from "../../presentation/templates/emailTemplates.js";
import smtpFactory from "../../presentation/factories/smtpFactory.js"

class emailManager {
    
    constructor() {
        this.smtp_config = smtpFactory.create(process.env.SMTP_TYPE)
    }

    async send(template, data) {
        const transporter = nodemailer.createTransport(this.smtp_config)

        const hmtl = compileEmailTemplate(template, data)

        const mailOptions = {
            from: `${process.env.SMTP_SENDER_NAME} <${process.env.SMTP_SENDER_EMAIL}>`,
            to: `${data.email}`,
            subject: 'Cambio de contraseña',
            html: hmtl
        };

        console.log(mailOptions)
        await transporter.sendMail(mailOptions)
    }
}

export default emailManager