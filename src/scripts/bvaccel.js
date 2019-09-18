// import Vue from 'vue';
// import Vue2TouchEvents from 'vue2-touch-events';
// import VeeValidate from 'vee-validate';
// import VueLazyLoad from 'vue-lazyload';
// import VueMq from 'vue-mq';
// import { mapState } from 'vuex';

// import components from './components';
// import store from './store';
// import { ucfirst, upcase, unhandleize } from './filters/string.js';
// import { money, moneyWithoutDecimals } from './filters/money.js';

// import imageConfig from 'scripts/lib/config.images.js';

// const cssVars = require('../styles/variables.scss');

// Vue.config.productionTip = false;

// Vue.use(Vue2TouchEvents);
// Vue.use(VeeValidate);

// Vue.use(VueLazyLoad, {
//   preload: 1.3,
//   loading: imageConfig.loading,
//   attempt: 1,
// });

// Vue.use(VueMq, {
//   breakpoints: {
//     mobile: parseInt(cssVars.breakTablet, 10),
//     tablet: parseInt(cssVars.breakDesktop, 10),
//     desktop: parseInt(cssVars.breakHd, 10),
//     hd: Infinity,
//   },
// });

// Vue.filter('ucfirst', ucfirst);
// Vue.filter('upcase', upcase);
// Vue.filter('unhandleize', unhandleize);
// Vue.filter('money', money);
// Vue.filter('moneyWithoutDecimals', moneyWithoutDecimals);

// // const template = () => import(`../components/theme/${Shopify.template}.vue`);
// // import ThemeTemplate from "./components/theme/theme.vue";

// // new Vue({
// //   store,
// //   components,
// //   // components: {
// //   //   ThemeTemplate
// //   // },
// //   comments: true,
// //   computed: {
// //     ...mapState({
// //       checkout: state => state.cart.checkout
// //     }),
// //     featuredProductSlidesToShow() {
// //       if (this.$mq === "mobile") return 1.8;
// //       if (this.$mq === "tablet") return 3;
// //       return 4;
// //     }
// //   },
// //   created() {
// //     this.$store.dispatch("cart/init");
// //     this.$store.dispatch("products/init");
// //   }
// // }).$mount("#app");
