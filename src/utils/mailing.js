import nodemailer from "nodemailer"

/* const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_KEY,
    }
});

const mail = {
    from: "juanmavazquez91@gmail.com",
    to: "juanmavazquez91@gmail.com",
    subject: "Mail de prueba",
    hmtl: `
    <div> Prueba </div>`,
    attachment: []
}

export default await transport.sendMail(mail) */

class nodemailerAdapter {

    async init() {
        nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_KEY,
            }
        });
    }

}

export default nodemailerAdapter