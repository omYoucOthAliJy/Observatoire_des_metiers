import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

export const mailerConfig = MailerModule.forRoot({
  transport: {
    host: 'smtp.mailtrap.io', // Replace with your SMTP server
    port: 2525,
    auth: {
      user: 'your-mailtrap-username',
      pass: 'your-mailtrap-password',
    },
  },
  defaults: {
    from: '"No Reply" <noreply@example.com>',
  },
  template: {
    dir: path.join(__dirname, '../templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
});
