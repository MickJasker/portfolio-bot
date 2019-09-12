import IMessage from './IMessage';

class Message implements IMessage {
  content: string;

  id: string;

  sender: boolean;

  constructor(content: string, sender: boolean) {
    this.content = content;
    this.sender = sender;
    this.id = Message.generateId();
  }

  public static generateId(): string {
    return Math.random()
      .toString(36)
      .substr(2);
  }
}

export default Message;
