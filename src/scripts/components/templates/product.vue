// template
<template>
  <div>
    <h2>PRODUCT</h2>
    <product-main :product="$store.state.products.currentProduct" />
    <product-main :product="$store.state.products.currentProduct" />
    <product-main :product="$store.state.products.currentProduct" />
    <hr>
    <hr>
    <hr>
    <hr>
    <product-main-asyc :product="$store.state.products.currentProduct" />
    <product-main-asyc :product="$store.state.products.currentProduct" />
    <product-main-asyc :product="$store.state.products.currentProduct" />
    <!-- <slot name="product-reviews"></slot> -->
  </div>
</template>

// SCSS
<style lang="scss" scoped>
//
</style>

// JavaScript
<script>
import { ProductDispatch } from 'scripts/store/dispatch.js';
import ProductMain from 'scripts/components/product/ProductMain.vue';

export default {
  name: 'product',
  props: {
    handle: {
      type: String,
      required: true,
    }
  },
  data: function() {
    return {
      product: false
    };
  },
  components: {
    ProductMain,
    'product-main-asyc': () => import('scripts/components/product/ProductMain.vue'),
  },
  methods: {},
  created: function() {
    this.$store.dispatch(ProductDispatch.setProduct, {
      handle: this.handle,
    });
  },
};
</script>
