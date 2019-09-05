import { library } from '@fortawesome/fontawesome-svg-core';
import { faPaperPlane } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue from 'vue';

library.add(faPaperPlane);

Vue.component('font-awesome-icon', FontAwesomeIcon);
