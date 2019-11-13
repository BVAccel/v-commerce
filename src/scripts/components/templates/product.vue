// template
<template>
  <div>
    <h2>PRODUCT</h2>
    <slot name="product-reviews"></slot>
  </div>
</template>

// SCSS
<style lang="scss" scoped>
//
</style>

// JavaScript
<script>
export default {
  name: 'product',
  props: {},
  data: function() {
    return {};
  },
  components: {},
  methods: {},
  created: function() {
    console.log('[Vue] Template: Product');
  },
};
</script>
