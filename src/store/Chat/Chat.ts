import axios, { AxiosResponse } from 'axios';
import { QueryInput } from 'dialogflow';
import IChat from './IChat';
import Message from '../Message';
import IMessage from '../Message/IMessage';

interface IDialogFlowMessage {
  queryInput: QueryInput;
  sessionId: string;
}

class Chat implements IChat {
  messages: Message[] = [];

  sessionId: string;

  public createChat() {
    const message = new Message('How can I help you?', false);

    this.messages = [message];
  }

  constructor() {
    this.sessionId = this.generateId();
  }

  private generateId(): string {
    return Math.random()
      .toString(36)
      .substr(2);
  }

  private sendToDialogFlow(message: IDialogFlowMessage): Promise<AxiosResponse> {
    return axios.post('http://localhost:5000/porfolio-bot-ipwpmm/us-central1/app/message', message);
  }

  public sendMessage(content: string, sender = true): void {
    if (content) {
      const message: IMessage = {
        content,
        sender,
        id: Message.generateId(),
      };
      this.messages.push(message);
      this.sendToDialogFlow({
        queryInput: {
          text: {
            text: content,
            languageCode: 'EN',
          },
        },
        sessionId: this.sessionId,
      })
        .then((response) => {
          this.messages.push({
            sender: false,
            content: response.data.fulfillmentText,
            id: Message.generateId(),
          });
        })
        .catch((error: Error) => {
          console.error(error);
        });
    } else {
      console.error('message cannot be empty');
    }
  }
}

export default Chat;
