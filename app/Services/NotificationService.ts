import { MailDataRequired } from "@sendgrid/mail";
import User from "App/Models/User";
import View from "@ioc:Adonis/Core/View";
import { loggerService } from "./LoggerService";
import { mailService } from "./MailService";
import Env from "@ioc:Adonis/Core/Env";

class NotificationService {
  public static getInstance() {
    return new NotificationService();
  }

  public async sendWelcomeEmail(user: User) {
    const transformedUser = user.serialize();
    const html = View.renderSync("welcome_html.edge", {
      userName: transformedUser.fullName,
      verificationLink: `${Env.get("BASE_URL")}/verify/${transformedUser.id}`,
    });

    const messageBody = {
      to: {
        name: user.user_name,
        email: user.email!,
      },
      subject: "Welcome to Developer Chat App!",
      html,
    } as MailDataRequired;

    loggerService.info(`Sending Email with message body as ${JSON.stringify(messageBody)}`);

    await mailService.sendMail(messageBody);
  }
}

export const notificationService = NotificationService.getInstance();
