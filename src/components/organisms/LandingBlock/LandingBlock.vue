<template>
  <section class="landing-block">
    <h5 ref="subheading">
      Hi there,
    </h5>
    <h1 ref="heading">
      My name is Mick
    </h1>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AbstractTransitionComponent } from 'vue-transition-component';
import LandingBlockTransitionController from './LandingBlockTransitionController';

const TransitionComponent = Vue.extend(AbstractTransitionComponent);

@Component
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
  padding: 2rem;

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
}
</style>
