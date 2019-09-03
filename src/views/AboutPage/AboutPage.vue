<template>
  <div class="about-page">
    <h2>AboutPage</h2>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AbstractPageTransitionComponent } from 'vue-transition-component';
import AboutPageTransitionController from './AboutPageTransitionController';

const TransitionPage = Vue.extend(AbstractPageTransitionComponent);

@Component
export default class AboutPage extends TransitionPage {
  private transitionController: AboutPageTransitionController | undefined;

  handleAllComponentsReady() {
    // @ts-ignore
    this.transitionController = new AboutPageTransitionController(this);
    // @ts-ignore
    this.isReady();
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/_var.scss';
.about-page {}
</style>
