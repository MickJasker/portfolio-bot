<template>
  <button class="v-button" :class="{primary: primary, flat: flat}">
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
  font-size: 2.4rem;
  border: none;
  padding: 1.5rem 3rem;
  border-radius: 0.5rem;
  transition: 0.2s ease-out;
  transition-property: padding, background;

  &:hover,
  &:focus {
    background: lighten($blue, 3);
    cursor: pointer;
    outline: none;
    padding: 1.5rem 3.5rem;
  }

  &:active {
    background: lighten($blue, 7);
  }
}
</style>
