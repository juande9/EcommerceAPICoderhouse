import dotenv from "dotenv";
dotenv.config();

class SmtpGmail {
    constructor() {
        this.smtpConfig = {
            host: "smtp.gmail.com",
            port: 587,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_KEY,
            }
        };
    }
}

export default SmtpGmail;