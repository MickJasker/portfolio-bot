<template>
  <section class="home-page">
    <header class="content">
      <h2>Hi there,</h2>
      <h1>My name is Mick</h1>
    </header>
    <background-video :src="require('@/assets/videos/space.mp4')" />
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AbstractPageTransitionComponent } from 'vue-transition-component';
import HomePageTransitionController from './HomePageTransitionController';
import BackgroundVideo from '@/components/atoms/BackgroundVideo';

const TransitionPage = Vue.extend(AbstractPageTransitionComponent);

@Component({
  components: {
    BackgroundVideo,
  },
})
export default class HomePage extends TransitionPage {
  private transitionController: HomePageTransitionController | undefined;

  handleAllComponentsReady() {
    // @ts-ignore
    this.transitionController = new HomePageTransitionController(this);
    // @ts-ignore
    this.isReady();
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_var.scss';

.home-page {
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
  min-height: 100vh;

  header {
    z-index: 1;
    width: fit-content;
    text-align: center;
    filter: drop-shadow(0 0 5rem rgba(black, 0.8));

    h2 {
      color: $white;
      font-size: 4.8rem;
      opacity: 0.7;
      line-height: 4rem;
      font-weight: 300;
      margin-bottom: 1.6rem;
    }

    h1 {
      font-size: 9.6rem;
      color: $white;
      font-weight: 800;
      line-height: 8rem;
      margin-bottom: 2rem;
    }
  }
}
</style>
