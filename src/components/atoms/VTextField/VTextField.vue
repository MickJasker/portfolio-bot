<template>
  <div class="v-text-field">
    <input type="text" placeholder="Start typing..." />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AbstractTransitionComponent } from 'vue-transition-component';
import VTextFieldTransitionController from './VTextFieldTransitionController';

const TransitionComponent = Vue.extend(AbstractTransitionComponent);

@Component
export default class VTextField extends TransitionComponent {
  private transitionController: VTextFieldTransitionController | undefined;

  handleAllComponentsReady() {
    // @ts-ignore
    this.transitionController = new VTextFieldTransitionController(this);
    // @ts-ignore
    this.isReady();
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_var.scss';
.v-text-field {
  padding: 1rem 2rem;
  background: $white;
  box-shadow: 0 1rem 2rem rgba(black, 0.1), 0 0 2rem rgba(black, 0.1);
  border-radius: 0.5rem;

  input {
    width: 100%;
    font-size: 2rem;
    border: none;
    background: none;

    &:focus {
      outline: none;
    }
  }
}
</style>
