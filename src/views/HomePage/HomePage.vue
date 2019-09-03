<template>
  <section class="home-page">
    <div class="content">
      <h1 ref="heading">Landing</h1>
      <v-button @click.native="navigateToPlace('amsterdam')" ref="cta" primary>See my places</v-button>
    </div>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AbstractPageTransitionComponent } from 'vue-transition-component';
import HomePageTransitionController from './HomePageTransitionController';

const TransitionPage = Vue.extend(AbstractPageTransitionComponent);

@Component
export default class HomePage extends TransitionPage {
  private transitionController: HomePageTransitionController | undefined;

  handleAllComponentsReady() {
    // @ts-ignore
    this.transitionController = new HomePageTransitionController(this);
    // @ts-ignore
    this.isReady();
  }

  navigateToPlace(place: string): void {
    this.$router.push({
      name: 'place',
      params: {
        place,
      },
    });
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
  background-image: url('~@/assets/images/planet-earth.jpg');
  background-size: cover;
  background-position: center;

  .content {
    width: fit-content;
    text-align: center;

    h1 {
      font-size: 7.2rem;
      color: $white;
      font-weight: 800;
      margin-bottom: 2rem;
    }
  }
}
</style>
