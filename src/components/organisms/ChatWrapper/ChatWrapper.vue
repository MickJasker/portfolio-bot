<template>
  <div class="chat-wrapper">
    <v-text-field />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AbstractTransitionComponent } from 'vue-transition-component';
import ChatWrapperTransitionController from './ChatWrapperTransitionController';

const TransitionComponent = Vue.extend(AbstractTransitionComponent);

@Component
export default class ChatWrapper extends TransitionComponent {
  private transitionController: ChatWrapperTransitionController | undefined;

  handleAllComponentsReady() {
    // @ts-ignore
    this.transitionController = new ChatWrapperTransitionController(this);
    // @ts-ignore
    this.isReady();
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_var.scss';
.chat-wrapper {
}
</style>
