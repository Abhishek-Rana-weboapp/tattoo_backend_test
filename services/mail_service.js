const nodemailer = require('nodemailer');
const senderEmail = process.env.SENDER_EMAIL;
const senderEmailPass = process.env.SENDER_EMAIL_PASSWORD;

const send_mail=(req,link)=>{
const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user:senderEmail, 
    pass:senderEmailPass, 
  },
});

const mailOptions = {
  from: senderEmail, 
  to: req.body.username, 
  subject: ' forgot password ',
  text: `click the link to forget the password  link=${link}`,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
    return 0
  } else {
    console.log('Email sent:', info.response);
    return 1
  }
});
}
module.exports=send_mail;