module.exports = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: true,
    port: 587,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    }
  };