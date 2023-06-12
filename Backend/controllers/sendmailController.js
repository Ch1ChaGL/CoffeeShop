const ApiErorr = require('../error/ApiError');
const sendemailService = require('../service/sendmailService');
class SendmailController {
  async sendMail(req, res, next) {
    const { Name, Email, Message } = req.body;

    try {
      // Отправка сообщения на почту
      await sendemailService.sendEmail(Name, Email, Message);
      res.status(200).json({ message: 'Сообщение успешно отправлено' });
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
      res.status(500).json({ message: 'Ошибка при отправке сообщения' });
    }
  }
}

module.exports = new SendmailController();
