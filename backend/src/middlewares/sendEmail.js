const nodemailer = require('nodemailer');
const {google} = require ("googleapis"); 
const OAuth2 = google.auth.OAuth2;

const oauth2Client =  new  OAuth2 ( 
    "26346888173-tsejbq31bu1ha2qq18jbpd988ro0go2b.apps.googleusercontent.com", // ClientID 
    "0QJccC_E6xt_GykHCkCNwiRy", // Client Secret 
    "https://developers.google.com/oauthplayground"// URL de redireccionamiento 
);

oauth2Client . setCredentials ({ 
    refresh_token: "1//04XmMMeZt00PJCgYIARAAGAQSNwF-L9IrUbJSIMLn6CPRZMCSykcg6XJzujrdEHDsX3QXiB4PGltU0m6RG0RUF8zurvKh27GXuY0" 
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
        clientId : "26346888173-tsejbq31bu1ha2qq18jbpd988ro0go2b.apps.googleusercontent.com", 
        clientSecret :  "0QJccC_E6xt_GykHCkCNwiRy", 
        refreshToken :  "1//04XmMMeZt00PJCgYIARAAGAQSNwF-L9IrUbJSIMLn6CPRZMCSykcg6XJzujrdEHDsX3QXiB4PGltU0m6RG0RUF8zurvKh27GXuY0", 
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