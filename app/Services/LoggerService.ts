import Logger from "@ioc:Adonis/Core/Logger";

class LoggerService {
  public static getInstance() {
    return new LoggerService();
  }

  public async info(message: any, ...values: any[]) {
    Logger.info(message, values);
  }

  public async error(message: any, ...values: any[]) {
    Logger.error(message, values);
  }
}

export const loggerService = LoggerService.getInstance();
