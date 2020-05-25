const nodemailer = require('nodemailer');
module.exports = async (email, subject, text, html) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });

    var mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        text: text,
        html: html
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return error
        } else {
            return info.response;

        }
    });
}
