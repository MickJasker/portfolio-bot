<template>
  <section class="landing-block">
    <h5 ref="subheading">Hi there,</h5>
    <h1 ref="heading">My name is Mick</h1>
    <chat-wrapper class="chat-wrapper" />
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AbstractTransitionComponent } from 'vue-transition-component';
import LandingBlockTransitionController from './LandingBlockTransitionController';
import ChatWrapper from '@/components/organisms/ChatWrapper';

const TransitionComponent = Vue.extend(AbstractTransitionComponent);

@Component({
  components: {
    ChatWrapper,
  },
})
export default class LandingBlock extends TransitionComponent {
  private transitionController: LandingBlockTransitionController | undefined;

  handleAllComponentsReady() {
    // @ts-ignore
    this.transitionController = new LandingBlockTransitionController(this);
    // @ts-ignore
    this.isReady();
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_var.scss';
.landing-block {
  z-index: 1;
  width: fit-content;
  text-align: center;
  position: relative;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: center;

  h5 {
    font-size: 2.4rem;
    opacity: 0.7;
    line-height: 1em;
    margin-bottom: 1.6rem;
  }

  h1 {
    font-size: 4.8rem;
    color: $red;
    filter: drop-shadow(0 0 0.5rem rgba($red, 0.5));
    font-weight: 800;
    line-height: 1.1em;
    margin-bottom: 2rem;
  }

  .chat-wrapper {
    position: absolute;
    bottom: 10vh;
    width: 100%;
  }
}
</style>
