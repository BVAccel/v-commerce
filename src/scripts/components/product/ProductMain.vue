// Template
<template>
  <section class="product-main">
    <responsive-image v-if="product.images.length" v-for="image in product.images"
      :key="image"
      :image="image"
      :sources="[
        { media: '(min-width:768px)', image: image, size: '1400x', scale: 2 },
        { media: '(min-width:480px)', image: image, size: '768x', scale: 2 },
        { media: '(min-width:0px)', image: image, size: '480x', scale: 2 }
      ]"
    />
  </section>
</template>

// Javascript
<script>
import ResponsiveImage from 'scripts/components/image/ResponsiveImage.vue';

export default {
  name: 'ProductMain',
  props: {
    product: Object,
  },
  components: {
    ResponsiveImage,
  },
  methods: {},
  created() {},
};
</script>

// SCSS
<style lang="scss" scoped>
// 
</style>
