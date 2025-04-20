const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // For development - use a test account
    const testAccount = await nodemailer.createTestAccount();

    // Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
        port: process.env.EMAIL_PORT || 587,
        auth: {
            user: process.env.EMAIL_USERNAME || testAccount.user,
            pass: process.env.EMAIL_PASSWORD || testAccount.pass
        }
    });

    // Define email options
    const mailOptions = {
        from: process.env.EMAIL_FROM || 'noreply@microservice-demo.com',
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    // Send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;