import '../../../public-path';
import Vue from 'vue';

const isThemeCustomizer = window.location.href.indexOf('design_theme_id') > -1;
const isHomePage = window.location.pathname === '/';

const dom = {
  vueComponents: '[data-v-component]',
};

let components = {
  'theme-template': () => import(/* webpackChunkName: '[request]' */ `scripts/components/templates/${window.Shopify.template}.vue`),
};

const initVueApp = () => {
  new Vue({
    delimiters: ['${', '}'],
    el: '#app',
    components,
    created() {
      console.log('[Vue] Mounted');
      console.log('[Vue] Active Components:', components);
    },
  });
};

if (!isThemeCustomizer && !isHomePage) {
  initVueApp(components);
}

const getherDynamicHomepageSections = () => {
  const vueComponents = document.querySelectorAll(dom.vueComponents);
  if (vueComponents.length) {
    return Array.from(vueComponents).reduce((comps, element) => {
      const vueComponentTag = element.tagName.toLowerCase();
      comps[vueComponentTag] = () => import(`scripts/components/${vueComponentTag}.vue`);
      return comps;
    }, {});
  }
  return components;
};

document.addEventListener('DOMContentLoaded', () => {
  if (isHomePage) {
    components = getherDynamicHomepageSections();
    initVueApp(components);
  } else if (isThemeCustomizer) {
    initVueApp(components);
  }
});

window.addEventListener('load', () => {});
