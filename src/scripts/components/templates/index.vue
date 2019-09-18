// template
<template>
  <div>
    <h2>Index</h2>
    <slot></slot>
  </div>
</template>

// SCSS
<style lang="scss" scoped></style>

// JavaScript
<script>
export default {
  name: 'index',
  props: {},
  data: function() {
    return {};
  },
  components: {},
  methods: {},
  created: function() {
    console.log('[Vue] Template: Index');
  },
};
</script>
