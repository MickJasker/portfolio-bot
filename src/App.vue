<template>
  <div id="app">
    <transition @leave="onLeave">
      <router-view />
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { FlowManager, AbstractRegistrableComponent } from 'vue-transition-component';

const RegComp = Vue.extend(AbstractRegistrableComponent);

@Component
export default class App extends RegComp {
  onLeave(element: any, done: any) {
    FlowManager.transitionOut.then(() => FlowManager.done()).then(done);
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_var.scss';
@import '@/assets/scss/_base.scss';

#app {
}
</style>
