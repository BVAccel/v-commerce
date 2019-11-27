// Template
<template>
    <picture>
      <source v-for="source in sources" :media="source.media" :srcset="source.image | imgUrl({size: source.size, scale: source.scale, srcset: true})" />
      <img :src="image" :srcset="image" />
    </picture>
</template>

// Javascript
<script>
export default {
  name: 'ResponsiveImage',
  props: {
    image: String,
    sources: Array,
  },
  methods: {},
  created() {},
};
</script>

// SCSS
<style lang="scss" scoped>
// 
</style>
