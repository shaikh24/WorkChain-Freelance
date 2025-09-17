const nodemailer = require('nodemailer');

function createTransport() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return transporter;
}

async function sendMail({ to, subject, html, text }) {
  const transporter = createTransport();
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to, subject, html, text
  });
  return info;
}

module.exports = { sendMail };
