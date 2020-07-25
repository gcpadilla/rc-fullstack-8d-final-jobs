const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "reactjobs2020@gmail.com" || process.env.EMAIL,
        pass: "rivercampeon2018" || process.env.PASSEMAIL,
    }
});

const sendEmail = (email, subject, html ) => {
    const mailOptions = {
        from: "<reactjobs2020@gmail.com>",
        to: email,
        subject:subject,
        html: html
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;