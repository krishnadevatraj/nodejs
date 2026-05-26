import { emailArgumentsInterface } from '../interface/email.interface';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // App Password
    },
});

export const sendEmail = async ({
    to,
    subject,
    html,
}: emailArgumentsInterface) => {
    try {
        transporter.sendMail({
            from: `"My App" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });
    } catch (e) {
        console.error('Email sending failed:', e);
    }
};
