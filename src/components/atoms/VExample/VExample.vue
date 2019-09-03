<template>
  <div class="v-example">
    <h2>VExample</h2>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AbstractTransitionComponent } from 'vue-transition-component';
import VExampleTransitionController from './VExampleTransitionController';

const TransitionComponent = Vue.extend(AbstractTransitionComponent);

@Component
export default class VExample extends TransitionComponent {
  private transitionController: VExampleTransitionController | undefined;

  handleAllComponentsReady() {
    // @ts-ignore
    this.transitionController = new VExampleTransitionController(this);
    // @ts-ignore
    this.isReady();
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_var.scss';
.v-example {}
</style>
