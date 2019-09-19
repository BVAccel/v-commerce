import '../../../public-path';
import Vue from 'vue';

const isThemeCustomizer = () => window.location.href.indexOf('design_theme_id') > -1;

const initVueApp = () => {
  new Vue({
    delimiters: ['${', '}'],
    el: '#app',
    components: {
      'theme-template': () => import(`../components/templates/${window.Shopify.template}.vue`),
    },
    created() {
      console.log('[Vue] Mounted');
    },
  });
};

if (!isThemeCustomizer()) {
  initVueApp();
}

document.addEventListener('DOMContentLoaded', () => {
  if (isThemeCustomizer()) {
    initVueApp();
  }
});

window.addEventListener('load', () => {});
