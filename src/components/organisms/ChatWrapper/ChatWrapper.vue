<template>
  <section class="chat-wrapper">
    <div class="messages">
      <chat-box
        v-for="message in chat.messages"
        :key="`message-${message.id}`"
        :sender="message.sender"
      >{{ message.content }}</chat-box>
    </div>
    <form @submit.prevent="sendMessage">
      <v-text-field ref="input" :input-data.sync="messageInput" />
    </form>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AbstractTransitionComponent } from 'vue-transition-component';
import ITextField from '@/components/atoms/VTextField';
import ChatBox from '@/components/molecules/ChatBox';
import ChatWrapperTransitionController from './ChatWrapperTransitionController';
import Chat from '@/store/Chat';

const TransitionComponent = Vue.extend(AbstractTransitionComponent);

@Component({
  components: {
    ChatBox,
  },
})
export default class ChatWrapper extends TransitionComponent {
  private transitionController: ChatWrapperTransitionController | undefined;

  chat: Chat;

  messageInput: string = '';

  constructor() {
    super();

    this.chat = new Chat();
  }

  handleAllComponentsReady() {
    // @ts-ignore
    this.transitionController = new ChatWrapperTransitionController(this);
    // @ts-ignore
    this.isReady();
  }

  mounted() {
    setTimeout(() => {
      this.chat.createChat();
    }, 2000);
  }

  sendMessage() {
    this.chat.sendMessage(this.messageInput);

    this.messageInput = '';
    const textField = <ITextField>this.$refs.input;
    textField.clearField();
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_var.scss';
.chat-wrapper {
  bottom: 6rem;
  padding: 2rem;
  width: 100%;

  .messages {
    display: flex;
    flex-flow: column;
  }
}
</style>
