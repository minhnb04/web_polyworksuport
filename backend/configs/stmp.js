const mailConfig = require('../commons/email/mailConfig');
const nodeMailer = require('nodemailer');

exports.getEmailInfo = () => {
  return mailConfig;
}

exports.sendEmail = (to, subject, text) => {
  const transporter = nodeMailer.createTransport(mailConfig);
  const options = {
    from: process.env.EMAIL_USERNAME, // địa chỉ admin email bạn dùng để gửi
    to: to, // địa chỉ gửi đến
    subject: subject, // Tiêu đề của mail
    html: text // Phần nội dung mail mình sẽ dùng html thay vì thuần văn bản thông thường.
  }
  // hàm transporter.sendMail() này sẽ trả về cho chúng ta một Promise
  transporter.sendMail(options);
  return options;
}


  