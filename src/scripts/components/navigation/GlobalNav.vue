// Template
<template>
  <header>
    <nav>
      <ul>
        <!-- <li><a href="/">Home</a></li>
        <li><a href="/products/blacktop">Product</a></li>
        <li><a href="/collections/sunglasses">Collection</a></li>
        <li><a href="/cart">Cart</a></li>
        <li><a href="/blogs/news">Blog</a></li>
        <li><a href="/blogs/news/protect-parties-in-the-hollywood-hills">Article</a></li>
        <li><a href="/pages/contact-us">Page</a></li>
        <li><a href="/search">Search</a></li>
        <li><a href="/404">404</a></li> -->
        <li v-for="(link,index) in linkList.links" :key="index">
          <a :href="link.url" >{{link.title}}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

// Javascript
<script>
import { mapState } from 'vuex';


export default {
  name: 'GlobalNav',
  data () {
      return {
        linkList: [],
      }
  },
  computed: {
     ...mapState({
        linkLists: state => state.dto.linkLists
      }),
  },
  props: {},
  methods: {},
  created() {
    const menuHandle = 'header-menu';
    // Get 'Header Menu' from Vuex
    this.linkLists.forEach(element => {
      if(element.name == menuHandle){
        this.linkList = element;
      }

    });
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
