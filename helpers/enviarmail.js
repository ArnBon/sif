const nodemailer = require('nodemailer');

/*const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});*/

// Genera una cuenta de prueba en https://ethereal.email/
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'sigrid.corkery90@ethereal.email', // Copia el usuario generado
      pass: 'MbPRRfe4MdKJZjvnCT'       // Copia la contraseña generada
    }
  });

const enviarCorreo = async ({to, subject, html}) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html
    };
    return transporter.sendMail(mailOptions);
}




module.exports = { enviarCorreo }