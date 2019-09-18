import '../../../public-path';
import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {});

window.addEventListener('load', () => {});

new Vue({
  delimiters: ['${', '}'],
  el: '#app',
  data: {},
  components: {
    'theme-template': () => import(`../components/templates/${window.Shopify.template}.vue`),
  },
  methods: {},
  created() {
    console.log('[Vue] Mounted');
  },
});
