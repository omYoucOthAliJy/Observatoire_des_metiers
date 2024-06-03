import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';

export const mailerConfig = MailerModule.forRoot({
  transport: {
    host: process.env.MAILER_HOST, 
    port: process.env.MAILER_PORT,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASSWORD,
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
