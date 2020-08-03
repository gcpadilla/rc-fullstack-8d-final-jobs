const nodemailer = require('nodemailer');
const {google} = require ("googleapis"); 
const OAuth2 = google.auth.OAuth2;

const oauth2Client =  new  OAuth2 ( 
    process.env.CLIENTE_ID, // ClientID 
    process.env.CLIENTE_SECRET, // Client Secret 
    process.env.URL_REDIRECT// URL de redireccionamiento 
);

oauth2Client . setCredentials ({ 
    refresh_token: process.env.REFRESH_TOKEN 
}); 
const accessToken = oauth2Client.getAccessToken ()


const transporter = nodemailer.createTransport({
    service: 'gmail',
    // auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.PASSEMAIL,
    // }
    auth :  { 
        type :  "OAuth2", 
        user :  process.env.EMAIL, 
        clientId : process.env.CLIENTE_ID, 
        clientSecret :  process.env.CLIENTE_SECRET, 
        refreshToken :  process.env.REFRESH_TOKEN, 
        accessToken: accessToken 
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