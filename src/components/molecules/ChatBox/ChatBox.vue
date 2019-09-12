<template>
  <div
    class="chat-box"
    :class="{sender: sender}"
  >
    <h5>
      <slot />
    </h5>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { AbstractTransitionComponent } from 'vue-transition-component';
import ChatBoxTransitionController from './ChatBoxTransitionController';

const TransitionComponent = Vue.extend(AbstractTransitionComponent);

@Component
export default class ChatBox extends TransitionComponent {
  private transitionController: ChatBoxTransitionController | undefined;

  handleAllComponentsReady() {
    // @ts-ignore
    this.transitionController = new ChatBoxTransitionController(this);
    // @ts-ignore
    this.isReady();
  }

  mounted() {
    // @ts-ignore
    this.transitionIn();
  }

  @Prop(Boolean) readonly sender?: boolean;
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_var.scss';
.chat-box {
  padding: 1.5rem 3rem;
  background: $yellow;
  width: fit-content;
  font-size: 1.8rem;
  box-shadow: 0 0 1rem rgba($yellow, 0.5);
  border-radius: 1rem 1rem 1rem 0;
  margin-bottom: 5rem;
  color: #503c00;
  max-width: 80%;
  text-align: left;
  text-shadow: 0 0 0.5rem rgba(#503c00, 0.5);
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -1.5rem;
    left: 0;
    background: $yellow;
    clip-path: polygon(0 0, 0% 100%, 100% 0);
    box-shadow: 0 0 1rem rgba($yellow, 0.5);
    width: 1.5rem;
    height: 1.5rem;
  }

  &.sender {
    border-radius: 1rem 1rem 0 1rem;
    text-align: right;
    align-self: flex-end;
    text-shadow: 0 0 0.5rem rgba($white, 0.4);
    background: $blue;
    box-shadow: 0 0 1rem rgba($blue, 0.5);
    color: $white;

    &:after {
      background: $blue;
      clip-path: polygon(0 0, 100% 100%, 100% 0);
      box-shadow: 0 0 1rem rgba($blue, 0.5);
      right: 0;
      left: initial;
    }
  }
}
</style>
