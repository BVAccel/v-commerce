// Template
<template>
  <header>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/products/blacktop">Product</a></li>
        <li><a href="/collections/sunglasses">Collection</a></li>
        <li><a href="/cart">Cart</a></li>
        <li><a href="/blogs/news">Blog</a></li>
        <li><a href="/blogs/news/protect-parties-in-the-hollywood-hills">Article</a></li>
        <li><a href="/pages/contact-us">Page</a></li>
        <li><a href="/search">Search</a></li>
        <li><a href="/404">404</a></li>
      </ul>
    </nav>
  </header>
</template>

// Javascript
<script>
export default {
  name: 'GlobalNav',
  props: {},
  methods: {},
  created() {
    console.log('Global Nav Created!');
  },
};
</script>

// SCSS
<style lang="scss" scoped>
header {
  background-color: $color-black;
}

ul {
  list-style: none;
  display: flex;
  padding: 10px;
  margin: 0;
}

li {
  display: block;
  padding: 16px;
}

a {
  color: $color-white;
}
</style>
