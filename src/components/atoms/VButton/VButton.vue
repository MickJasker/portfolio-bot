<template>
  <button
    class="v-button"
    :class="{primary: primary, flat: flat}"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { AbstractTransitionComponent } from 'vue-transition-component';
import VButtonTransitionController from './VButtonTransitionController';

const TransitionComponent = Vue.extend(AbstractTransitionComponent);

@Component
export default class VButton extends TransitionComponent {
  private transitionController: VButtonTransitionController | undefined;

  @Prop(Boolean) readonly primary?: boolean;

  @Prop(Boolean) readonly flat?: boolean;

  handleAllComponentsReady() {
    // @ts-ignore
    this.transitionController = new VButtonTransitionController(this);
    // @ts-ignore
    this.isReady();
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_var.scss';
.v-button {
  background: $blue;
  color: $white;
  font-size: 2rem;
  border: none;
  padding: 0 3rem;
  box-shadow: 0 0 1rem rgba($blue, 0.5);
  border-radius: 0.5rem;
  transition: 0.2s ease-out;
  transition-property: padding, background;

  * {
    filter: drop-shadow(0 0 0.5rem rgba($white, 0.75));
  }

  &:hover,
  &:focus {
    background: lighten($blue, 3);
    cursor: pointer;
    outline: none;
  }

  &:active {
    background: lighten($blue, 7);
  }
}
</style>
