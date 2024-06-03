"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailerConfig = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const path = require("path");
exports.mailerConfig = mailer_1.MailerModule.forRoot({
    transport: {
        host: 'smtp.mailtrap.io',
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
        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
        options: {
            strict: true,
        },
    },
});
//# sourceMappingURL=mailer.cong.js.map