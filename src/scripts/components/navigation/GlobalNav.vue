// Template
<template>
  <header>
    <nav>
      <ul v-if="linkList">
        <li v-for="(link,index) in linkList.links" :key="index">
          <a :href="link.url" >{{link.title}}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

// Javascript
<script>
import NavigationBase from 'scripts/components/navigation/NavigationBase.vue'

export default {
  name: 'GlobalNav',
  extends: NavigationBase,
  data () {
      return {
        linkList: [],
      }
  },
  computed: {},
  props: {
    handle: String
  },
  methods: {},
  created() {
    // Note: getLinkListByHandle is from base component - see NavigationBase.vue
    this.linkList = this.getLinkListByHandle(this.handle);
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
