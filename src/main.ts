import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import components from '@/components/global';
import './firebase';
import './registerServiceWorker';

Vue.config.productionTip = false;

Object.keys(components).forEach((key) => {
  // @ts-ignore
  Vue.component(key, components[key]);
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
