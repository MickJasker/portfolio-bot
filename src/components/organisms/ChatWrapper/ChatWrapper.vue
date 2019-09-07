<template>
  <section class="chat-wrapper">
    <div class="messages">
      <chat-box>How can I help you?</chat-box>
      <chat-box sender>
        Can you tell me more about Human Centered Design
      </chat-box>
      <chat-box>Yeah sure. Got some great articles for you:</chat-box>
    </div>
    <form @submit.prevent="sendMessage">
      <v-text-field />
    </form>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AbstractTransitionComponent } from 'vue-transition-component';
import ChatBox from '@/components/molecules/ChatBox';
import ChatWrapperTransitionController from './ChatWrapperTransitionController';

const TransitionComponent = Vue.extend(AbstractTransitionComponent);

@Component({
  components: {
    ChatBox,
  },
})
export default class ChatWrapper extends TransitionComponent {
  private transitionController: ChatWrapperTransitionController | undefined;

  handleAllComponentsReady() {
    // @ts-ignore
    this.transitionController = new ChatWrapperTransitionController(this);
    // @ts-ignore
    this.isReady();
  }

  sendMessage() {
    console.log('sendMessage');
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_var.scss';
.chat-wrapper {
  position: absolute;
  bottom: 6rem;
  padding: 2rem;
  width: 100%;

  .messages {
    display: flex;
    flex-flow: column;
  }
}
</style>
