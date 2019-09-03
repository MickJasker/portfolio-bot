<template>
  <div class="{{name_sc}}">
    <h2>{{name_pc}}</h2>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import { AbstractTransitionComponent } from "vue-transition-component";
import {{name_pc}}TransitionController from './{{name_pc}}TransitionController';

const TransitionComponent = Vue.extend(AbstractTransitionComponent);

@Component
export default class {{name_pc}} extends TransitionComponent {
  private transitionController: {{name_pc}}TransitionController | undefined;

  handleAllComponentsReady() {

    // @ts-ignore
    this.transitionController = new {{name_pc}}TransitionController(this);
    // @ts-ignore
    this.isReady();
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_var.scss';
.{{name_sc}} {}
</style>
