import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { createTestAccount, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import manifest from '../manifest';

const options: SMTPTransport.Options = {
    host: "smtp.sendgrid.net",
    port: 25,
    secure: false,
    auth: { ...manifest.auth.sendgrid }
}


class SendMailService {
    private client: Transporter
    constructor() {
        this.createTransportMail()
    }

    createTransportMail(){
        const transporter = nodemailer.createTransport(options);
        this.client = transporter;
    }

    async accountTest() {
        createTestAccount().then(account => {

            const transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: account.user, // generated ethereal user
                    pass: account.pass, // generated ethereal password
                },
            });
            this.client = transporter;
        })
    }

    async execute(to: string, subject: string, variables: object, path: string) {

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const templateFileContent = fs.readFileSync(path).toString("utf-8");
        const mailTemplateParse = handlebars.compile(templateFileContent);

        const html = mailTemplateParse(variables)

        await this.client.sendMail({
            to,
            subject,
            html,
            from: manifest.email
        })
        // console.log("Message sent: %s", message.messageId);
        // console.log("Preview URL: %s", getTestMessageUrl(message));


    }
}

export default new SendMailService();