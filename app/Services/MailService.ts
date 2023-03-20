import mailer, { MailDataRequired } from "@sendgrid/mail";
import { sendgridApiKey, sendgridUserEmail } from "Config/app";
import { get } from "lodash";
import { loggerService } from "./LoggerService";

mailer.setApiKey(sendgridApiKey);

class MailService {
  public static getInstance() {
    return new MailService();
  }

  public async sendMail(message: MailDataRequired) {
    try {
      return await mailer.send({
        ...message,
        from: {
          email: sendgridUserEmail,
        },
      });
    } catch (e) {
      loggerService.error(
        `Mail from ${sendgridUserEmail} is not sent to ${get(message?.to, ["email"], "user")}!`
      );
    }
  }
}

export const mailService = MailService.getInstance();
