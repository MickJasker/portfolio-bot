<template>
  <div class="background-wave">
    <div ref="wave1" class="wave wave-1"></div>
    <div ref="wave2" class="wave wave-2"></div>
    <div ref="wave3" class="wave wave-3"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { AbstractTransitionComponent } from 'vue-transition-component';
import BackgroundWaveTransitionController from './BackgroundWaveTransitionController';
import WavesManager from '@/animation/waves/WavesManager';

const TransitionComponent = Vue.extend(AbstractTransitionComponent);

@Component
export default class BackgroundWave extends TransitionComponent {
  private transitionController: BackgroundWaveTransitionController | undefined;

  private waves: HTMLElement[] = [];

  handleAllComponentsReady() {
    // @ts-ignore
    this.transitionController = new BackgroundWaveTransitionController(this);
    // @ts-ignore
    this.isReady();
  }

  mounted() {
    this.waves = this.getWaveElements(<HTMLElement>this.$el);

    this.waves.forEach((wave, index) => {
      this.setupWave(wave, index);
    });
  }

  private getWaveElements(el: HTMLElement): HTMLElement[] {
    const nodeList = el.querySelectorAll('.wave');
    return Array.prototype.slice.call(nodeList);
  }

  private setupWave(el: HTMLElement, index: number) {
    let wavesManager;
    if (index === 0) {
      wavesManager = new WavesManager(el, '#F1F1F6', {
        yOffset: 75,
        yDerivative: 0,
        frequency: -0.5,
        amplifier: 50,
        spatialFrequency: 1500,
      });
    } else if (index === 1) {
      wavesManager = new WavesManager(el, '#EBEBEE', {
        yOffset: 75,
        yDerivative: 0,
        frequency: -0.4,
        amplifier: 50,
        spatialFrequency: 1250,
      });
    } else {
      wavesManager = new WavesManager(el, '#E6E6EA', {
        yOffset: 75,
        yDerivative: 0,
        frequency: -0.6,
        amplifier: 50,
        spatialFrequency: 1750,
      });
    }

    wavesManager.init([
      {
        //@ts-ignore
        top: 50,
        //@ts-ignore
        bottom: 0,
        background: '#f00',
      },
    ]);
    wavesManager.start();
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_var.scss';
.background-wave {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;

  .wave {
    width: 100%;
    height: 55vh;

    &-1 {
    }
    &-2 {
      background: #f1f1f6;
    }
    &-3 {
      background: #ebebee;
    }
  }
}
</style>
