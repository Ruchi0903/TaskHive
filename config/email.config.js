import nodemailer from 'nodemailer';

// Configure nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    // secure: process.env.SMTP_PORT == 465, // true for port 465, false for port 587
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendEmail = async (recipientEmail, subject, htmlContent) => {
    try {
        console.log('Preparing to send email to:', recipientEmail);  // Log recipient
        console.log('Email subject:', subject);  // Log subject
        console.log('Email content:', htmlContent);  // Log content

        let info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: recipientEmail,
            subject,
            html: htmlContent,
        });

        console.log('Email sent successfully:', info.messageId);  // Log message ID if sent
    } catch (error) {
        console.error('Failed to send email:', error.message);  // Log error if any
    }
};
