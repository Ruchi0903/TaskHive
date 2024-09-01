import { transporter } from "../config/email.config.js";

export const sendEmail = async (to, subject, htmlContent) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: htmlContent,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        
    } catch (error) {
        console.log("Error sending mail: ", error.message);
    }
}