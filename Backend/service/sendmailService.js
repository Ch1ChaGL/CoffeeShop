const nodemailer = require('nodemailer');
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  // Настройки для вашей почтовой службы (SMTP)
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: 'markov.danil.04@mail.ru',
    pass: EMAIL_PASSWORD,
  },
});

class SendmailService {
  async sendEmail(name, email, message) {
    // Определите информацию о письме
    const mailOptions = {
      from: 'markov.danil.04@mail.ru',
      to: 'markov.danil.04@mail.ru',
      subject: 'Новое сообщение с обратной связи',
      text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`,
    };

    // Отправка письма
    const info = await transporter.sendMail(mailOptions);
    console.log('Письмо отправлено: ' + info.response);
  }
}

module.exports = new SendmailService();
