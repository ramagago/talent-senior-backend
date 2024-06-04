import { Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './mailer.interface';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('/send-email')
  async sendMail() {
    const dto: SendEmailDto = {
      from: {
        name: 'lucy',
        address: 'helloramagago@gmail.com',
      },
      recipients: [{ name: 'pedro', address: 'helloramagago@gmail.com' }],
      subject: 'Lucky Number',
      html: '<p> <strong>Hi John!!</strong> You won $1,000,000 !!!</p>',
    };
    return await this.mailerService.sendEmail(dto);
  }
}
