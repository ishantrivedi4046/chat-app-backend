import Message from "App/Models/Message";

class MessageService {
  public static getInstance() {
    return new MessageService();
  }
  public async findMessagesByColumn(column: string, searchValue: string): Promise<Message[]> {
    return await Message.query().where(column, searchValue);
  }
}

export const messageService = MessageService.getInstance();
