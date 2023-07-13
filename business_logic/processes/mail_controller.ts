import nodemailer from "nodemailer";
import { email } from "../../database/email";

export const transporter = nodemailer.createTransport({
    host: email.host,
    port: email.port,
    secure: true,
    auth: {
        user: email.user,
        pass: email.pass
    }
});

transporter.verify().then(() => {
    console.log('Email ready');
});

export const sendEmail = async (mail: string, subject: string, html: any) => {
    await transporter.sendMail({
        from: `"CropManager " <${ email.user }>`,
        to: mail,
        subject: subject,
        html: html
    });
}

export const generarToken = (num: number) => {
    return [...Array(num)].map(() => {
        const randomNum = ~~(Math.random() * 36);
        return randomNum.toString(36);
    }).join('').toUpperCase();
}