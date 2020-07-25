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
        //text: `Estas ${msg}, cominicate al telefono 12345 o dirigete a Av. Siempreviva 742`,
        html: html
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;