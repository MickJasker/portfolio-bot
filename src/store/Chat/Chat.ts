import IChat from './IChat';
import Message from '../Message';
import IMessage from '../Message/IMessage';

class Chat implements IChat {
  messages: Message[] = [];

  public createChat() {
    const message = new Message('How can I help you?', false);

    this.messages = [message];
  }

  private async createNewMessage(message: IMessage): Promise<void> {
    const { content, sender } = message;
    const newMessage = new Message(content, sender);

    return new Promise((resolve, reject) => {
      if (content) {
        try {
          this.messages.push(newMessage);
          resolve();
        } catch (error) {
          reject(error);
        }
      } else {
        const error = new Error('Message content cannot be empty');
        reject(error);
      }
    });
  }

  public async sendMessage(content: string): Promise<void> {
    const message: IMessage = {
      content,
      sender: true,
      id: Message.generateId(),
    };

    return this.createNewMessage(message);
  }
}

export default Chat;
