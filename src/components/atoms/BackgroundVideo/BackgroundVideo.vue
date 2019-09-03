<template>
  <video class="background-video" autoplay muted loop></video>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { AbstractTransitionComponent } from 'vue-transition-component';
import BackgroundVideoTransitionController from './BackgroundVideoTransitionController';

const TransitionComponent = Vue.extend(AbstractTransitionComponent);

@Component
export default class BackgroundVideo extends TransitionComponent {
  private transitionController: BackgroundVideoTransitionController | undefined;

  handleAllComponentsReady() {
    // @ts-ignore
    this.transitionController = new BackgroundVideoTransitionController(this);
    // @ts-ignore
    this.isReady();
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_var.scss';
.background-video {
  position: fixed;
  top: 0;
  object-fit: cover;
  height: 100vh;
  opacity: 0.75;
  width: 100%;
}
</style>
