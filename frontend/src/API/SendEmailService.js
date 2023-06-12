import { $host } from '.';

export default class SendEmailService {
  static async sendEmail(email) {
    const response = await $host.post(`/api/sendmail`, email);
    return response.data;
  }
}
