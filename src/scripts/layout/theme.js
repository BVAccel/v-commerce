import '../../../public-path';
import Vue from 'vue';
import Vue2TouchEvents from 'vue2-touch-events';
import VeeValidate from 'vee-validate';
import VueLazyLoad from 'vue-lazyload';
import VueMq from 'vue-mq';
import { mapState } from 'vuex';

import store from 'scripts/store';
import { ucfirst, upcase, unhandleize } from 'scripts/filters/string.js';
import { money, moneyWithoutDecimals } from 'scripts/filters/money.js';

import imageConfig from 'scripts/lib/config.images.js';

const cssVars = require('styles/variables.scss');

Vue.config.productionTip = false;

Vue.use(Vue2TouchEvents);
Vue.use(VeeValidate);

Vue.use(VueLazyLoad, {
  preload: 1.3,
  loading: imageConfig.loading,
  attempt: 1,
});

Vue.use(VueMq, {
  breakpoints: {
    mobile: parseInt(cssVars.breakTablet, 10),
    tablet: parseInt(cssVars.breakDesktop, 10),
    desktop: parseInt(cssVars.breakHd, 10),
    hd: Infinity,
  },
});

Vue.filter('ucfirst', ucfirst);
Vue.filter('upcase', upcase);
Vue.filter('unhandleize', unhandleize);
Vue.filter('money', money);
Vue.filter('moneyWithoutDecimals', moneyWithoutDecimals);

const isThemeCustomizer = window.location.href.indexOf('design_theme_id') > -1;
const isHomePage = window.location.pathname === '/';

const dom = {
  vueComponents: '[data-v-component]',
};

import globalComponents from 'scripts/components/global';
let components = {
  ...globalComponents,
  'theme-template': () => import(/* webpackChunkName: '[request]' */ `scripts/components/templates/${window.Shopify.template}.vue`),
};

const initVueApp = (components) => {
  new Vue({
    delimiters: ['${', '}'],
    components,
    computed: {
      ...mapState({
        checkout: (state) => state.cart.checkout,
      }),
    },
    created() {
      console.log('[Vue] Mounted');
      console.log('[Vue] Active Components:', components);
    },
  }).$mount('#app');
};

if (!isThemeCustomizer && !isHomePage) {
  initVueApp(components);
}

const gatherDynamicHomepageSections = () => {
  const vueComponents = document.querySelectorAll(dom.vueComponents);
  if (vueComponents.length) {
    return Array.from(vueComponents).reduce((comps, element) => {
      const vueComponentTag = element.getAttribute('data-v-component') || element.tagName.toLowerCase();
      if (!comps.hasOwnProperty(vueComponentTag)) {
        comps[vueComponentTag] = () => import(/* webpackChunkName: 'index-[request]' */ `scripts/components/dynamic/${vueComponentTag}.vue`);
      }
      return comps;
    }, {});
  }
  return components;
};

document.addEventListener('DOMContentLoaded', () => {
  if (isHomePage) {
    const dynamicComponents = gatherDynamicHomepageSections();
    components = { ...components, ...dynamicComponents };
    initVueApp(components);
  } else if (isThemeCustomizer) {
    initVueApp(components);
  }
});

window.addEventListener('load', () => {});
