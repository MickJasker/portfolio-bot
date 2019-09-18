<template>
  <div class="v-text-field">
    <input
      v-model="inputData"
      type="text"
      placeholder="Start typing..."
      @keyup="$emit('update:inputData', inputData);"
    >
    <v-button class="button">
      <font-awesome-icon :icon="['fal', 'paper-plane']" />
    </v-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AbstractTransitionComponent } from 'vue-transition-component';
import VTextFieldTransitionController from './VTextFieldTransitionController';
import ITextField from './ITextField';

const TransitionComponent = Vue.extend(AbstractTransitionComponent);

@Component
export default class VTextField extends TransitionComponent implements ITextField {
  private transitionController: VTextFieldTransitionController | undefined;

  inputData = '';

  clearField() {
    this.inputData = '';
  }

  handleAllComponentsReady() {
    // @ts-ignore
    this.transitionController = new VTextFieldTransitionController(this);
    // @ts-ignore
    this.isReady();
    // @ts-ignore
    this.transitionIn();
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_var.scss';
.v-text-field {
  padding: 0.3rem;
  display: flex;
  background: $white;
  box-shadow: 0 1rem 2rem rgba(black, 0.1), 0 0 2rem rgba(black, 0.1);
  border-radius: 0.5rem;
  margin-top: 1rem;

  input {
    padding: 0.7rem 1rem;
    width: 100%;
    font-size: 2rem;
    border: none;
    background: none;

    &:focus {
      outline: none;
    }
  }

  .button {
    padding: 0;
    width: 5.4rem;
  }
}
</style>
